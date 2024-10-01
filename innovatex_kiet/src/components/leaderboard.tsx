"use client";

import { FeedItem, LeaderboardData } from '@/types';
import React, { useEffect, useState } from 'react';
import { Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
} from 'chart.js';
import { generateDummyLeaderboardData } from '@/util/dummyData';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

export const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
        labels: [],
        datasets: [],
    });
    const [departmentalData, setDepartmentalData] = useState<LeaderboardData>({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Generate dummy data for leaderboard
        const dummyData: { name: string; points: number; department: string }[] = generateDummyLeaderboardData(5); // Generate 5 users
        // console.log("Dummy Data:", JSON.stringify(dummyData, null, 2)); // Log dummy data

        // Prepare leaderboard data
        const leaderboard = {
            labels: dummyData.map((user) => user.name),
            datasets: [
                {
                    label: 'Points',
                    data: dummyData.map(user => user.points),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
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
        };

        setLeaderboardData(leaderboard);
        console.log("Leaderboard Data:", JSON.stringify(leaderboard, null, 2)); // Log leaderboard data

        // Count contributions per department
        const departmentCounts: { [key: string]: number } = {};
        dummyData.forEach((user) => {
            if (departmentCounts[user.department]) {
                departmentCounts[user.department]++;
            } else {
                departmentCounts[user.department] = 1;
            }
        });

        // Prepare departmental chart data
        const departmentalChartData = {
            labels: Object.keys(departmentCounts),
            datasets: [
                {
                    label: 'Number of Contributions',
                    data: Object.values(departmentCounts),
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        setDepartmentalData(departmentalChartData);
        // console.log("Departmental Data:", JSON.stringify(departmentalChartData, null, 2)); // Log departmental data

        setLoading(false);
    }, []);

    // Loading and Error States
    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );
    return (
        <div className='mt-8'>
            <div className="space-y-3">
                {/* Departmental Chart */}
                <div className="justify-items-center bg-blue-50 p-3 dark:text-white dark:bg-gray-900 rounded-lg ">
                    <h2 className="text-xl p-3 font-bold ">Departmental Chart</h2>
                    <div className="flex justify-center bg-white w-76 h-60 rounded-lg shadow dark:bg-gray-900 dark:border border-white">
                        <Doughnut data={departmentalData} />
                    </div>
                </div>

                {/* Contribution Area Chart */}
                <div className="justify-items-center bg-blue-50 p-3 dark:text-white dark:bg-gray-900 rounded-lg ">
                    <h2 className="text-xl p-3 font-bold">Contribution Area</h2>
                    <div className="flex justify-center bg-white rounded-lg w-76 h-60 shadow dark:bg-gray-900 dark:border border-white">
                        <PolarArea data={leaderboardData} />
                    </div>
                </div>
            </div>
        </div>
    );
};
