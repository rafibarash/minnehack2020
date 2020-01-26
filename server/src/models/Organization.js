import mongoose, { Schema } from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
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
  admins: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  events: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    }
  ]
});

const Organization = mongoose.model('organization', OrganizationSchema);

export default Organization;
