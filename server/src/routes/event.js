import express from 'express';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import {
  internalError,
  badRequestError,
  validationError,
} from '../utils/responseHelper';
import Organization from '../models/Organization';
import Event from '../models/Event';
import User from '../models/User';

const router = express.Router();

/**
 * @route  GET /event
 * @desc   Get all events
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    Event.find({}, function(err, events) {
      return res.json(events);
    })
    
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

router.get('/:id', async(req, res) => {
  try{
    Event.findById(req.params.id , (err, event)=> {
      return res.json(event);
    })
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
})

/**
 * @route  Post /event
 * @desc   Create an event
 * @access Public
 */
router.post(
  '/',
  authMiddleware,
  async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return validationError(res, errors);
     }
     const { name, hostingOrg, startTime,  endTime, tags } = req.body;
    try {
      let user = await User.findById(req.user.id).select('-password');
      const hostingAdmin = user.id;
      let orgAdmin = await Organization.findById(hostingOrg).select('admin');
      const location = {
        type: 'Point', 
        coordinates: [32, 42]
      };
      console.log(name, hostingOrg, startTime, endTime, tags, location);
      console.log(orgAdmin.admin);
      console.log(hostingAdmin);
      const event = new Event ({
        name,
        hostingOrg,
        hostingAdmin,
        startTime,
        endTime,
        location,
        tags
      });
      if (hostingAdmin != orgAdmin.admin){
        return badRequestError(res, 'You are not an admin of this organization.');
      } else {
        console.log(event);
        await event.save();
        return res.json(event);
      }

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

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    
    Event.findById(req.params.id , (err, event)=> {
      if (event.hostingAdmin == req.user.id){
        Event.findOneAndRemove({_id: req.params.id});
        return res.json({msg: 'Event deleted.'});
      } else {
        return res.json({msg: 'Could not delete event. You are not authorized.'});
      }
    });
      
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

export default router;
