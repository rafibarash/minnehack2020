import mongoose, { Schema } from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  hostingOrg: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
  },
  hostingAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  tags: {
    type: [String],
  },
});

const Event = mongoose.model('event', EventSchema);

export default Event;
