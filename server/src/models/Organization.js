import mongoose, { Schema } from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
});

const Organization = mongoose.model('organization', OrganizationSchema);

export default Organization;
