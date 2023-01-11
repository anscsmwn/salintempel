import mongoose from 'mongoose';
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Tag = mongoose.model('tag', tagSchema);

export default Tag;
