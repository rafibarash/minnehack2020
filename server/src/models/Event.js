import mongoose, { Schema } from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hostingOrg:{
      type: Schema.Types.ObjectId,
      ref: 'Organization'
  },
  
  time: {
    startTime: Date,
    endTime: Date
  },
  location: {
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], default: [0, 0]}
  },
  keywords:{
    type: [String]
  }
});

const Event = mongoose.model('event', EventSchema);

export default Event;
