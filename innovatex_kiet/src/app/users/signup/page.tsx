// // import React from 'react'

// // const signup = () => {
// //   return (
// //     <div>
// //         SIGN UP PAGE
// //     </div>
// //   )
// // }

// // export default signup
// "use client"; // Mark the component as a Client Component

// import { useState } from 'react'; // Import useState hook to manage component state
// import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation for client-side routing

// // Define the Signup component
// export default function Signup() {
//   // Create a router instance for navigation
//   const router = useRouter();

//   // Initialize state for form data, error messages, and loading status
//   const [formData, setFormData] = useState({
//     username: '', // Username input field
//     email: '',    // Email input field
//     password: '', // Password input field
//   });
//   const [error, setError] = useState<string | null>(null); // State for storing error messages
//   const [loading, setLoading] = useState(false); // State for loading status during submission

//   // Handle input field changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target; // Destructure name and value from the event target
//     setFormData({
//       ...formData, // Retain existing form data
//       [name]: value, // Update the specific field with the new value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     setLoading(true); // Set loading state to true
//     setError(null); // Clear any existing error messages

//     try {
//       // Make a POST request to the signup API endpoint
//       const res = await fetch('/api/users/signup', {
//         method: 'POST', // Specify the request method
//         headers: {
//           'Content-Type': 'application/json', // Set the content type to JSON
//         },
//         body: JSON.stringify(formData), // Convert form data to JSON string and send it in the request body
//       });

//       // Parse the response data
//       const data = await res.json();

//       // Check if the response is not OK (indicates an error)
//       if (!res.ok) {
//         throw new Error(data.error || 'Something went wrong'); // Throw an error with the error message from the response or a default message
//       }

//       // Alert success message and redirect to login page upon successful registration
//       alert('User registered successfully');
//       router.push('/login'); // Navigate to the login page
//     } catch (error: any) {
//       setError(error.message); // Set the error state to the error message
//     } finally {
//       setLoading(false); // Set loading state to false after the request is complete
//     }
//   };

//   // Render the component
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {/* Container for the form */}
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">Register</h1> {/* Form title */}

//         {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if any */}

//         {/* Form element */}
//         <form onSubmit={handleSubmit}>
//           {/* Username input field */}
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text" // Input type is text
//               name="username" // Name attribute for identification
//               id="username" // ID for accessibility
//               value={formData.username} // Bind input value to username state
//               onChange={handleInputChange} // Call handleInputChange on input change
//               required // Make this field mandatory
//               className="mt-1 block w-full p-2 border border-gray-300 rounded" // Tailwind CSS classes for styling
//             />
//           </div>

//           {/* Email input field */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email" // Input type is email
//               name="email" // Name attribute for identification
//               id="email" // ID for accessibility
//               value={formData.email} // Bind input value to email state
//               onChange={handleInputChange} // Call handleInputChange on input change
//               required // Make this field mandatory
//               className="mt-1 block w-full p-2 border border-gray-300 rounded" // Tailwind CSS classes for styling
//             />
//           </div>

//           {/* Password input field */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password" // Input type is password
//               name="password" // Name attribute for identification
//               id="password" // ID for accessibility
//               value={formData.password} // Bind input value to password state
//               onChange={handleInputChange} // Call handleInputChange on input change
//               required // Make this field mandatory
//               className="mt-1 block w-full p-2 border border-gray-300 rounded" // Tailwind CSS classes for styling
//             />
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit" // Button type is submit
//             disabled={loading} // Disable button when loading
//             className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Tailwind CSS classes for styling
//           >
//             {loading ? 'Registering...' : 'Register'} {/* Display loading message or register text */}
//           </button>
//         </form>

//         {/* Link to login page */}
//         <p className="mt-4 text-center">
//           Already have an account? <a href="/login" className="text-blue-500">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client"; // Mark the component as a Client Component

import { useState } from "react"; // Import the useState hook
import { useRouter } from "next/navigation"; // Import router for navigation

export default function Signup() {
  const router = useRouter();

  // States for form data, errors, loading, token verification
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // Whether the user is verifying email
  const [userId, setUserId] = useState(""); // Store userId for verification
  const [token, setToken] = useState(""); // Store the verification token

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for user registration
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send signup data to the API
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // If user already exists, redirect to login page
      if (data.error === "User already exists") {
        alert("User already exists. Redirecting to login...");
        router.push("/login");
      }

      // If user is registered but needs email verification
      if (data.success && !data.savedUser.isVerified) {
        alert("User registered successfully! Please verify your email.");
        setUserId(data.savedUser._id); // Store userId for future use
        setIsVerifying(true); // Prompt for email verification
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle email verification after token input
  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send the token to the API to verify email
      const res = await fetch("http://localhost:3000/api/users/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Email Verified Successfully!");
        router.push("/login"); // Redirect to login after successful verification
      } else {
        throw new Error(data.error || "Invalid Token");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // If user is in the verification stage, show the token input
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleVerifyEmail}>
            <div className="mb-4">
              <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                Enter Verification Token
              </label>
              <input
                type="text"
                name="token"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter the token sent to your email"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If not verifying, show the signup form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}
