"use client"; // Mark this component as a Client Component

import { useEffect, useState } from "react"; // Import useEffect and useState for managing component state and side effects
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define the Profile component
export default function Profile() {
  // Create a router instance for navigation
  const router = useRouter();
  
  // Initialize state for user data and error messages
  const [user, setUser] = useState<any>(null); // State to store user data
  const [error, setError] = useState<string | null>(null); // State to store error messages
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/users/me", {
          method: "POST", // Use POST method to send the request
          credentials: "include", // Include cookies in the request
        });

        const data = await res.json(); // Parse the response data

        // Check if the response is not OK (indicates an error)
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch user data"); // Throw an error if not OK
        }

        // Update the user state with the retrieved data
        setUser(data.data);
      } catch (error: any) {
        setError(error.message); // Set the error state to the error message
      } finally {
        setLoading(false); // Set loading state to false after the request is complete
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []); // Empty dependency array to run the effect once on mount

  // Redirect to login page if loading is complete and no user is found
  if (!loading && !user) {
    router.push("/login"); // Navigate to the login page if user is not found
  }

  // Render the component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1> {/* Profile title */}

        {loading ? ( // Show loading message while fetching data
          <p className="text-gray-500 text-center">Loading...</p>
        ) : error ? ( // Show error message if any
          <p className="text-red-500 mb-4">{error}</p>
        ) : ( // Display user information if retrieved successfully
          <div>
            <p className="mb-4"><strong>Username:</strong> {user.username}</p> {/* Display username */}
            <p className="mb-4"><strong>Email:</strong> {user.email}</p> {/* Display email */}
            {/* Add more user details as needed */}
          </div>
        )}
        
        {/* Button to log out */}
        <button
          onClick={() => {
            // Handle logout logic (e.g., remove token, redirect to login)
            alert('Logged out');
            router.push('/login'); // Redirect to the login page
          }}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
