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
        ref: 'Reward',
      },
    },
  ],
  events: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    },
  ],
  organizations: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
      },
    },
  ],
});

const User = mongoose.model('User', UserSchema);

export default User;
