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
    <div className="bg-gray-100 dark:text-white dark:bg-gray-900">
      <div className="">
        <h1 className="text-2xl font-bold">Feed</h1>
        <CreatePost picturePath={picturePath} onCreate={handleCreatePost} />
        <div className="">
          {feed.map(post => (
            <div key={post.id} className="p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-all">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                  <img
                    src={`https://ui-avatars.com/api/?name=${post.author}&background=random`}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">{post.author}</h2>
                  <span className="text-sm text-gray-500">{new Date(post.time).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font">{post.content}</h2>
              </div>
              {post.image && (
                <div className="mb-4">
                  <img src={post.image} alt={post.author} className="w-full h-64 object-cover rounded-lg" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center ${post.isUpvoted ? 'text-red-500' : 'text-gray-500'} mr-4`}
                  >
                    <FiHeart className="mr-1" /> {post.isUpvoted ? 'Upvoted' : 'Upvote'}
                  </button>
                  <div className="flex -space-x-2">
                    {(post.upvotes ?? []).slice(0, 3).map((upvoter, index) => (
                      <img
                        key={index}
                        src={`https://ui-avatars.com/api/?name=${upvoter}&background=random`}
                        alt={upvoter}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        title={upvoter}
                      />
                    ))}
                    {post.upvotes?.length > 3 && (
                      <span className="text-sm text-gray-500 pl-3">+{post.upvotes.length - 3} others</span>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleSave(post.id)}
                    className={`flex items-center ${post.isSaved ? 'text-blue-500' : 'text-gray-500'}`}
                  >
                    <FiBookmark className="mr-1" /> {post.isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
