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
    likes: {
      type: Array,
      of: String,
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
