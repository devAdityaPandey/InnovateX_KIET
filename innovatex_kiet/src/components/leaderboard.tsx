"use client";

import { FeedItem, LeaderboardData } from '@/types';
import React, { useEffect, useState } from 'react';
import { Pie, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

export const Leaderboard = () => {
    const [feed, setFeed] = useState<FeedItem[]>([]);
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                setError('Failed to load leaderboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
        fetchLeaderboard();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );

    return (
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
    );
};