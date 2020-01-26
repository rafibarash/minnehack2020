import express from 'express';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import {
  internalError,
  badRequestError,
  validationError,
} from '../utils/responseHelper';
import { ResumeToken } from 'mongodb';
import Organization from '../models/Organization';
import User from '../models/User';

const router = express.Router();

/**
 * @route  GET /organization
 * @desc   Get all organizations
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    Organization.find({}, function(err, organizations) {
      return res.json(organizations);
    })
    
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});

router.get('/:id', async(req, res) => {
  try{
    Organization.findById(req.params.id , (err, organization)=> {
      return res.json(organization);
    })
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
})

/**
 * @route  Post /organization
 * @desc   Create an organization
 * @access Public
 */
router.post(
  '/',
  authMiddleware,
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Phone number required.').not(),
    check('name', 'Name required.').not()
  ],
  async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return validationError(res, errors);
     }
     const { email, name, phone } = req.body;
    try {
      let org = await Organization.findOne({ phone });

      if (org) {
        // organization already exists
        return badRequestError(res, 'Organization already exsits.')
      }
      let user = await User.findById(req.user.id).select('-password');
      const admin = user.id;



      org = new Organization ({
        name,
        email,
        admin,
        phone
      });
      await org.save();
      return res.json(org);
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

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    
    Organization.findById(req.params.id , (err, organization)=> {
      if (organization.admin == req.user.id){
        Organization.findOneAndRemove({_id: req.params.id});
        return res.json({msg: 'Organization deleted.'});
      } else {
        return res.json({msg: 'Could not delete organization. You are not authorized.'});
      }
    });
      
  } catch (err) {
    console.error(err.message);
    return internalError(res);
  }
});



export default router;
