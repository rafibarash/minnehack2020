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
 * @route  GET /event
 * @desc   Get all events
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
 * @route  Post /event
 * @desc   Create an event
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
 * @route  DELETE /event
 * @desc   Delete an event
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
 * @route  GET /event/:eventID
 * @desc   Get event by event id
 * @access Public
 */
router.get('/event/:eventID', async (req, res) => {
  try {
    return res.send('Implement me!');
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Event not found.');
    }
    return internalError(res);
  }
});

export default router;
