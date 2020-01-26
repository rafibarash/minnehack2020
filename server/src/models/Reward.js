import mongoose, { Schema } from 'mongoose';

const RewardSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true
  },
  sponsor: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },
});

const Reward = mongoose.model('Reward', RewardSchema);

export default Reward;
