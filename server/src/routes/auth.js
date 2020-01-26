import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/auth';
import User from '../models/User';
import {
  internalError,
  badRequestError,
  validationError,
  returnJWT,
} from '../utils/responseHelper';

const router = express.Router();

/**
 * @route  GET /auth
 * @desc   Get user
 * @access Public
 */
router.get('/', authMiddleware, async (req, res) => {
  return res.send('Implement me!');
  // try {
  //   const user = await User.findById(req.user.id).select('-password');
  //   return res.json(user);
  // } catch (err) {
  //   console.error(err.message);
  //   return internalError(res);
  // }
});

/**
 * @route  Post /auth
 * @desc   Login user
 * @access Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }
    return res.send('Implement me!');
    // const { email, password } = req.body;
    // try {
    //   // check if user exists
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     return badRequestError(res, 'User does not exist.');
    //   }

    //   // check if hashed password matches user's password
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     return badRequestError(res, "User's password is not correct.");
    //   }

    //   // return JWT
    //   return returnJWT(res, user.id);
    // } catch (err) {
    //   console.error(err.message);
    //   return internalError(res);
    // }
  }
);

export default router;
