// TODO: refactor for our app

import express from 'express';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import Profile from '../models/Profile';
import User from '../models/User';
import {
  badRequestError,
  internalError,
  validationError,
} from '../utils/responseHelper';

const router = express.Router();

/**
 * @route  GET /api/profile
 * @desc   Get all existing profiles
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  POST /api/profile
 * @desc   Create or update current user's profile
 * @access Private
 */
router.post(
  '/',
  [
    authMiddleware,
    check('favoriteGenres')
      .not()
      .isEmpty(),
    check('birthday').toDate(),
    check('bio').trim(),
  ],
  async (req, res) => {
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      validationError(res, errors);
    }
    const {
      favoriteGenres,
      sex,
      birthday,
      location,
      website,
      bio,
      education,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    const { id: userID } = req.user;

    // Build profile object
    const profileFields = {};
    profileFields.user = userID;
    profileFields.favoriteGenres = favoriteGenres
      .split(',')
      .map(genre => genre.trim());
    if (sex) profileFields.sex = sex;
    if (birthday) profileFields.birthday = birthday;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (education) profileFields.education = education;

    // Build social object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Get profile from db if existing
      let profile = await Profile.findOne({ user: userID });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: userID },
          { $set: profileFields },
          { new: true }
        );
      } else {
        // Create
        profile = new Profile(profileFields);
        await profile.save();
      }
      return res.json({ profile });
    } catch (err) {
      console.error(err.message);
      return internalError(res);
    }
  }
);

/**
 * @route  DELETE api/profile
 * @desc   Delete profile, user, and reviews
 * @access Private
 */
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const { id: userID } = req.user;
    await Profile.findOneAndRemove({ user: userID });
    await User.findOneAndRemove({ _id: userID });
    // TODO: remove user posts
    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  GET /api/profile/me
 * @desc   Get current user's profile
 * @access Private
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return badRequestError(res, 'There is no profile for this user.');
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  GET /api/profile/user/:user_id
 * @desc   Get profile by user id
 * @access Public
 */
router.get('/user/:user_id', async (req, res) => {
  try {
    // get user's profile
    const profile = await Profile.findOne({
      user: req.params.user_id,
    })
      .populate('user', ['name', 'avatar'])
      .select('-sex -location');
    if (!profile) {
      // no existing profile for user
      return badRequestError(res, 'Profile not found.');
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Profile not found.');
    }
    return internalError(res);
  }
});

export default router;
