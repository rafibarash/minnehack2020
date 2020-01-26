import express from 'express';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import {
  internalError,
  badRequestError,
  validationError,
} from '../utils/responseHelper';

const router = express.Router();

/**
 * @route  GET /reward
 * @desc   Get all rewards
 * @access Public
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    return res.send('Implement me!');
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  Post /reward
 * @desc   Create a reward
 * @access Public
 */
router.post(
  '/',
  // TODO: Add checks?
  // [
  //   check('email', 'Please include a valid email.').isEmail(),
  //   check('password', 'Please is required.').exists(),
  // ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return validationError(res, errors);
    // }
    // const { email, password } = req.body;
    try {
      return res.send('Implement me!');
    } catch (err) {
      console.error(err.message);
      return internalError(res);
    }
  }
);

/**
 * @route  DELETE /reward
 * @desc   Delete a reward
 * @access Private
 */
router.delete('/', authMiddleware, async (req, res) => {
  try {
    return res.send('Implement me!');
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

/**
 * @route  GET /reward/:rewardID
 * @desc   Get reward by reward id
 * @access Public
 */
router.get('/reward/:rewardID', async (req, res) => {
  try {
    return res.send('Implement me!');
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Reward not found.');
    }
    return internalError(res);
  }
});

export default router;
