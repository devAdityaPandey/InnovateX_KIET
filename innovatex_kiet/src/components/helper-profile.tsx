// components/HelperProfile.tsx
import React, { useState } from 'react';

interface HelperProfileProps {
    helper: {
        _id: string;
        name: string;
        email: string;
        requestsReceived: any[]; // Include requests received for display
    };
}

const HelperProfile: React.FC<HelperProfileProps> = ({ helper }) => {
    const [requestDescription, setRequestDescription] = useState('');
    const [isRequesting, setIsRequesting] = useState(false);

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsRequesting(true);

        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ helperId: helper._id, description: requestDescription }),
            });

            if (response.ok) {
                alert('Request sent successfully!');
                setRequestDescription('');
            } else {
                throw new Error('Failed to send request');
            }
        } catch (error) {
            console.error(error);
            alert('Error sending request');
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div>
            <h2>{helper.name}'s Profile</h2>
            <p>Email: {helper.email}</p>
            <form onSubmit={handleRequest}>
                <textarea
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    placeholder="Describe your request"
                    required
                />
                <button type="submit" disabled={isRequesting}>
                    {isRequesting ? 'Sending...' : 'Request Help'}
                </button>
            </form>

            <h3>Requests Received</h3>
            <ul>
                {helper.requestsReceived.map((request) => (
                    <li key={request._id}>
                        <p>{request.description} - Status: {request.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HelperProfile;
