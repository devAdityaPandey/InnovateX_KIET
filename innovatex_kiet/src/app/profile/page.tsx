"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Profile from '@/components/helper-profile';

interface Helper {
    _id: string;
    name: string;
    email: string;
    requestsReceived: any[];
}

const ProfilePage = () => {
    return (
        <div className="p-4">
                <Profile
                    name="profile"
                    email="email"
                    registerNumber="123456" // Replace with actual data
                    degree="B.Sc" // Replace with actual data
                    batch={2024} // Replace with actual data
                    college="XYZ University" // Replace with actual data
                    profileImage="/images/profile.jpg" // Replace with actual data
                    level={1} // Replace with actual data
                />
        </div>
    );
};

export default ProfilePage;