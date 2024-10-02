// // /components/Profile.tsx
// import React from 'react';

// interface ProfileProps {
//   name: string;
//   email: string;
//   registerNumber: string;
//   degree: string;
//   batch: number;
//   college: string;
//   profileImage: string;
//   level: number;
// }

// const Profile: React.FC<ProfileProps> = ({
//   name,
//   email,
//   registerNumber,
//   degree,
//   batch,
//   college,
//   profileImage,
//   level,
// }) => {
//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//         <p className="text-sm text-gray-500">
//           Last Updated on 22/09/2024 | 04:18 PM
//         </p>
//       </div>
//       <div className="relative mt-6">
//         <img
//           src="/images/banner.jpg"
//           alt="Profile Banner"
//           className="w-full h-32 rounded-t-lg object-cover"
//         />
//         <div className="absolute -bottom-12 left-6 w-24 h-24">
//           <img
//             src={profileImage}
//             alt={name}
//             className="w-24 h-24 rounded-full border-4 border-white object-cover"
//           />
//         </div>
//       </div>
//       <div className="mt-16 text-center">
//         <h3 className="text-3xl font-bold text-gray-900">{name}</h3>
//         <p className="text-sm text-gray-600">{email}</p>
//         <div className="flex justify-center mt-4 text-gray-700 space-x-6">
//           <p>
//             <span className="font-semibold">Register Number :</span>{' '}
//             {registerNumber}
//           </p>
//           <p>
//             <span className="font-semibold">Degree :</span> {degree}
//           </p>
//           <p>
//             <span className="font-semibold">Batch :</span> {batch}
//           </p>
//           <p>
//             <span className="font-semibold">College :</span> {college}
//           </p>
//         </div>
//         <div className="mt-6 flex justify-between items-center">
//           <div>
//             <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full">
//               Beginner
//             </span>
//           </div>
//           <div>
//             <span className="font-semibold text-gray-700">Level {level}</span>
//             <span className="text-xs text-gray-500"> of 5</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



// components/Profile.tsx// components/Profile.tsx
import React from 'react';
import { User } from '@/types'; // Adjust the import based on your folder structure

const Profile: React.FC<User> = ({
  name,
  email,
  registerNumber,
  degree,
  batch,
  college,
  profileImage,
  level,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Last Updated on 22/09/2024 | 04:18 PM
        </p>
      </div>
      <div className="relative mt-6">
        <img
          src="/images/banner.jpg"
          alt="Profile Banner"
          className="w-full h-32 rounded-t-lg object-cover"
        />
        <div className="absolute -bottom-12 left-6 w-24 h-24">
          <img
            src={profileImage}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        <div className="flex justify-center mt-4 text-gray-700 space-x-6">
          <p>
            <span className="font-semibold">Register Number :</span>{' '}
            {registerNumber || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Degree :</span> {degree}
          </p>
          <p>
            <span className="font-semibold">Batch :</span> {batch || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">College :</span> {college}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full">
              Beginner
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Level {level}</span>
            <span className="text-xs text-gray-500"> of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
