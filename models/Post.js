import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  datePosted: {
    default: new Date(),
    type: Date,
  },
});

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
