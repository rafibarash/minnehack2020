import express from 'express';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import {
  internalError,
  badRequestError,
  validationError,
} from '../utils/responseHelper';
import Reward from '../models/Reward';

const router = express.Router();

/**
 * @route  GET /reward
 * @desc   Get all rewards
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find();
    return res.json({ rewards });
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
  [
    check('barcode', 'Barcode is required.')
      .not()
      .isEmpty(),
    check('sponsor', 'Sponser is required.')
      .not()
      .isEmpty(),
    check('description', 'Description is required.')
      .not()
      .isEmpty(),
    check('cost', 'Cost is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }
    const { barcode, sponsor, sponsorImg, description, cost } = req.body;
    try {
      // See if reward exists
      let reward = await Reward.findOne({ barcode });

      if (reward) {
        // reward already exists
        return badRequestError(res, 'Reward already exists.');
      }

      // Create reward
      reward = new Reward({
        barcode,
        sponsor,
        sponsorImg,
        description,
        cost,
      });

      await reward.save();

      return res.json(reward);
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
// router.delete('/:rewardID', authMiddleware, async (req, res) => {
//   try {
//     await Reward.findOneAndRemove({ _id: req.params.rewardID });
//     return res.json({ msg: 'Reward deleted' });
//   } catch (err) {
//     console.error(err.message);
//     return internalError(res);
//   }
// });

/**
 * @route  GET /reward/:rewardID
 * @desc   Get reward by reward id
 * @access Public
 */
// router.get('/reward/:rewardID', async (req, res) => {
//   try {
//     return res.send('Implement me!');
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return badRequestError(res, 'Reward not found.');
//     }
//     return internalError(res);
//   }
// });

export default router;
