import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/auth';
import {
  internalError,
  badRequestError,
  validationError,
  returnJWT,
} from '../utils/responseHelper';
import User from '../models/User';
import Organization from '../models/Organization';
import Event from '../models/Event';
import Reward from '../models/Reward';

const router = express.Router();

/**
 * @route  POST /user
 * @desc   Register user
 * @access Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email')
      .isEmail()
      .normalizeEmail(),
    check(
      'password',
      'Please enter a password with six or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res);
    }
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        // user already exists
        return badRequestError(res, 'User already exists.');
      }

      // Create user
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10); // generate a salt for hashing

      // Encrypt user's password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return json web token
      return returnJWT(res, user.id);
    } catch (err) {
      console.error(err.message);
      return internalError(res);
    }
  }
);

/**
 * @route  DELETE user
 * @desc   Deletes user
 * @access Private
 */
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const { id: userID } = req.user;
    await User.findOneAndRemove({ _id: userID });
    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  GET /user/organization
 * @desc   Get all user's events
 * @access Private
 */
router.get('/organization', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const orgs = [];
    for (let org of user.organizations) {
      orgs.push(await Organization.findById(org._id));
    }
    return res.json({ organizations: orgs });
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  PUT /user/organization
 * @desc   Subscribe to an organization
 * @access Private
 */
router.put(
  '/organization',
  authMiddleware,
  [
    check('orgID', 'Organization ID is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res);
    }
    const { orgID } = req.body;

    try {
      // Get organization and user
      const org = await Organization.findById(orgID);
      const user = await User.findById(req.user.id).select('-password');

      // Add user reference to organization
      org.members.push(user);

      // Add org ref to user
      user.organizations.push(org);

      // Save both objects
      await org.save();
      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return badRequestError(res, 'Organization not found.');
      }
      return internalError(res);
    }
  }
);

/**
 * @route  DELETE /user/organization/:orgID
 * @desc   Unsubscribe from an organization
 * @access Private
 */
router.delete('/organization/:orgID', authMiddleware, async (req, res) => {
  try {
    // Get organization and user
    const org = await Organization.findById(req.params.orgID);
    const user = await User.findById(req.user.id).select('-password');

    // Remove org and user refs from each other
    user.organizations = user.organizations.filter(
      org => org._id.toString() !== req.params.orgID
    );
    org.members = org.members.filter(mem => mem._id.toString() !== req.user.id);

    // Save both objects
    await org.save();
    await user.save();

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Organization not found.');
    }
    return internalError(res);
  }
});

/**
 * @route  GET /user/event
 * @desc   Get all user's events
 * @access Private
 */
router.get('/event', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const events = [];
    for (let event of user.events) {
      events.push(await Event.findById(event._id));
    }
    return res.json({ events });
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  PUT /user/event
 * @desc   Subscribe to an event
 * @access Private
 */
router.put(
  '/event',
  authMiddleware,
  [
    check('eventID', 'Event ID is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res);
    }
    const { eventID } = req.body;

    try {
      // Get event and user
      const event = await Event.findById(eventID);
      const user = await User.findById(req.user.id).select('-password');

      // Add event ref to user
      user.events.push(event);

      // Save user obj
      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return badRequestError(res, 'Event not found.');
      }
      return internalError(res);
    }
  }
);

/**
 * @route  DELETE /user/event/:eventID
 * @desc   Unsubscribe from an event
 * @access Private
 */
router.delete('/event/:eventID', authMiddleware, async (req, res) => {
  try {
    // Get user
    const user = await User.findById(req.user.id).select('-password');

    // Remove event ref from user
    user.organizations = user.organizations.filter(
      e => e._id.toString() !== req.params.eventID
    );

    // Save user obj
    await user.save();

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Organization not found.');
    }
    return internalError(res);
  }
});

/**
 * @route  GET /user/reward
 * @desc   Get all user's rewards
 * @access Private
 */
router.get('/reward', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const rewards = [];
    for (let reward of user.rewards) {
      rewards.push(await Reward.findById(reward._id));
    }
    return res.json({ rewards });
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  POST /user/reward
 * @desc   Buys a reward with points
 * @access Private
 */
router.post(
  '/reward',
  authMiddleware,
  [
    check('rewardID', 'Reward ID is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res);
    }
    const { rewardID } = req.body;
    try {
      // Get reward and user
      const reward = await Reward.findById(rewardID);
      const user = await User.findById(req.user.id).select('-password');

      // Check that user has enough points to buy reward
      if (user.numPoints < reward.cost) {
        return badRequestError(
          res,
          'User does not have enough points to buy this reward.'
        );
      }

      // Update user object
      user.rewards.push(reward);
      user.numPoints -= reward.cost;

      // Save user obj
      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return badRequestError(res, 'Event not found.');
      }
      return internalError(res);
    }
  }
);

/**
 * @route  GET /user/points
 * @desc   Get all user's points
 * @access Private
 */
router.get('/points', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const points = user.numPoints;
    return res.json({ points });
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  POST /user/points/
 * @desc   Add points to user
 * @access Private
 */
router.post(
  '/points',
  authMiddleware,
  [check('pointsAwarded', 'PointsAwarded is required.').exists()],
  async (req, res) => {
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res);
    }
    const { pointsAwarded } = req.body;
    try {
      // Get user
      const user = await User.findById(req.user.id).select('-password');

      // Add points
      user.numPoints += pointsAwarded;

      // Save user
      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return badRequestError(res, 'Organization not found.');
      }
      return internalError(res);
    }
  }
);

/**
 * @route  DELETE /user/reward/:rewardID
 * @desc   Use a reward
 * @access Private
 */
router.delete('/reward/:rewardID', authMiddleware, async (req, res) => {
  try {
    // Get user
    const user = await User.findById(req.user.id).select('-password');

    // Remove reward ref from user
    user.rewards = user.rewards.filter(
      reward => reward._id.toString() !== req.params.rewardID
    );

    // Save user
    await user.save();

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Organization not found.');
    }
    return internalError(res);
  }
});

export default router;
