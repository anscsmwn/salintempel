import mongoose from 'mongoose';
const { Schema } = mongoose;

const salinTempelSchema = new Schema({
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
  like: { type: Number, default: 0 },
  author: {
    type: String,
    default: 'anonymous',
  },
});

const SalinTempel = mongoose.model('SalinTempel', salinTempelSchema);

export default SalinTempel;
