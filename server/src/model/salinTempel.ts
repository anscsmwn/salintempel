import mongoose from 'mongoose';
const { Schema } = mongoose;

const salinTempelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    likesBy: {
      type: Array,
      of: String,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: 'Anonymous',
    },
  },
  {
    timestamps: true,
  },
);

const SalinTempel = mongoose.model('SalinTempel', salinTempelSchema);

export default SalinTempel;
