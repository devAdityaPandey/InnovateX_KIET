"use client";
import { useEffect, useState } from 'react';
import { Pie, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { FeedItem as FeedItemType, LeaderboardData } from '../types';
import { FiHeart, FiBookmark } from 'react-icons/fi';
import CreatePost from '@/components/create-post';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [feed, setFeed] = useState<FeedItemType[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/feed');
        const data = await res.json();
        setFeed(data.data);
      } catch (error) {
        console.error('Failed to fetch feed data', error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        const leaderboard = data.data.map((user: { name: string }) => user.name);
        const points = data.data.map((user: { points: number }) => user.points);

        setLeaderboardData({
          labels: leaderboard,
          datasets: [
            {
              label: 'Points',
              data: points,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch leaderboard data', error);
      }
    };

    fetchFeed();
    fetchLeaderboard();
  }, []);

  const handleUpvote = (postId: string) => {
    setFeed(feed.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: post.isUpvoted ? post.upvotes.slice(0, -1) : [...post.upvotes, 'You'],
          isUpvoted: !post.isUpvoted,
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (newPost: FeedItemType) => {
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
    <div className="flex bg-gray-100 dark:text-white dark:bg-gray-900">
      <div className="w-1/4 p-6">
        <CreatePost onCreate={handleCreatePost} />
      </div>
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Feed</h1>
        <div className="space-y-6">
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
                    {post.upvotes.slice(0, 3).map((upvoter, index) => (
                      <img
                        key={index}
                        src={`https://ui-avatars.com/api/?name=${upvoter}&background=random`}
                        alt={upvoter}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        title={upvoter}
                      />
                    ))}
                    {post.upvotes.length > 3 && (
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

      <div className="sticky top-0 w-1/4 bg-gray-100 p-6 dark:text-white dark:bg-gray-900">
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 dark:text-white dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">Contribution Area</h2>
            <div className="bg-white rounded-lg shadow p-6 dark:text-white dark:bg-gray-900 dark:border border-white">
              <PolarArea data={leaderboardData} />
            </div>
          </div>

          <div className="bg-blue-50 p-6 dark:text-white dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">Departmental Chart</h2>
            <div className="bg-white rounded-lg shadow p-6 dark:text-white dark:bg-gray-900 dark:border border-white">
              <Pie data={leaderboardData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
