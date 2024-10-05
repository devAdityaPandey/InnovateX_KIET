"use client"
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/Redux/slices/userSlice';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutUser());
        router.push('/user/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
