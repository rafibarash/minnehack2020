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
 * @route  GET /organization
 * @desc   Get all organizations
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
 * @route  Post /organization
 * @desc   Create an organization
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
 * @route  DELETE /organization
 * @desc   Delete an organization
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
 * @route  GET /organization/:orgID
 * @desc   Get organization by org id
 * @access Public
 */
router.get('/organization/:orgID', async (req, res) => {
  try {
    return res.send('Implement me!');
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return badRequestError(res, 'Organization not found.');
    }
    return internalError(res);
  }
});

export default router;
