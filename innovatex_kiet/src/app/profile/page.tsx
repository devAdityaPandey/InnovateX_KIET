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
                    registerNumber="123456" 
                    degree="B.Sc" 
                    batch={2024}
                    college="XYZ University"
                    profileImage="/images/profile.jpg" 
                    level={1}
                />
        </div>
    );
};

export default ProfilePage;