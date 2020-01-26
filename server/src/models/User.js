import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  numPoints: {
    type: Number,
    default: 0,
  },
  rewards: [
    {
      reward: {
        type: Schema.Types.ObjectId,
        ref: 'reward',
      },
    },
  ],
  events: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: 'event',
      },
    },
  ],
  organizations: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: 'organization',
      },
    },
  ],
});

const User = mongoose.model('user', UserSchema);

export default User;
