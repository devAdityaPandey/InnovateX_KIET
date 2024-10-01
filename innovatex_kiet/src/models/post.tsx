import mongoose, { Schema } from "mongoose";

interface IPost extends Document {
  author: mongoose.Schema.Types.ObjectId;
  content: string;
  title: string,
  likes: number;
  images: HTMLCollectionOf<HTMLImageElement>;
  upvotes: mongoose.Schema.Types.ObjectId[];  // List of users who upvoted
  createdAt: Date;
  updatedAt: Date;
  department: string;
}

const postSchema: Schema<IPost> = new Schema({

  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    // required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],  // User IDs who upvoted
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  images: {
    type: [String],
  }
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
export default Post;
