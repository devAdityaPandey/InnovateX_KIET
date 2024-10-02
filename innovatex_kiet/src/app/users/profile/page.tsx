"use client";
// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Profile from '@/components/helper-profile';

// interface Helper {
//     _id: string;
//     name: string;
//     email: string;
//     requestsReceived: any[];
// }

// const ProfilePage = () => {
//     return (
//         <div className="p-4">
//                 <Profile
//                     name="profile"
//                     email="email"
//                     registerNumber="123456" 
//                     degree="B.Sc" 
//                     batch={2024}
//                     college="XYZ University"
//                     profileImage="/images/profile.jpg" 
//                     level={1}
//                 />
//         </div>
//     );
// };

// export default ProfilePage;


// pages/profile.tsx// pages/profile.tsx// src/app/users/profile/page.tsx
"use client"; // Add this line to declare it as a client component

import React, { useEffect, useState } from 'react';
import Profile from '@/components/helper-profile'; // Ensure this path is correct
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for app directory
import { User } from '@/types'; // Ensure this path is correct

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data.data); // Assuming your API returns user data in this structure
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/users/login'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Custom loading state
  }

  if (!userData) {
    return <div>No user data available</div>; // Handle case where user data is not found
  }

  return (
    <Profile
      name={userData.name}
      email={userData.email}
      registerNumber={userData.registerNumber || 'N/A'}
      degree={userData.degree}
      batch={userData.batch || 'N/A'}
      college={userData.college || 'N/A'} // Ensure the correct field from userData
      profileImage={userData.profileImage} // Use the correct field
      level={userData.level} // Assuming level corresponds to contribution points
    />
  );
};

export default ProfilePage;
