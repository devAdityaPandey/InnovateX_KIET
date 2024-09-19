"use client";
import { useState } from 'react';
import { FeedItem} from '../types';
import { FiHeart, FiBookmark } from 'react-icons/fi';
import CreatePost from '@/components/create-post';

const Dashboard = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);

   const picturePath = 'path/to/user/image.jpg'

  const handleUpvote = (postId: string) => {
    setFeed(feed.map(post => {
      if (post.id === postId) {
        const newUpvotes = post.isUpvoted
          ? post.upvotes.filter(upvoter => upvoter !== 'You')
          : [...(post.upvotes ?? []), 'You'];
        return {
          ...post,
          upvotes: newUpvotes,
          isUpvoted: !post.isUpvoted,
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (newPost: FeedItem) => {
    setFeed([newPost, ...feed]);
  };

  const handleSave = (postId: string) => {
    setFeed(feed.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved,
        };
      }
      return post;
    }));
  };

  return (
   <>
   <p className='text-black dark:text-white'>homepage</p>
   </>
  );
};

export default Dashboard;
