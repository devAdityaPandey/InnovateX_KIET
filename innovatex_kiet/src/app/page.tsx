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
   <>
   <p>homepage</p>
   </>
  );
};

export default Dashboard;
