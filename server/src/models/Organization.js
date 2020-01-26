import mongoose, { Schema } from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  admins: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
});

const Organization = mongoose.model('organization', OrganizationSchema);

export default Organization;
