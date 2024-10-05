// pages/api/user/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Replace this with your actual authentication logic
        if (email === 'test@kiet.edu' && password === 'password123') {
            res.status(200).json({
                message: 'Login successful',
                token: 'fake-jwt-token',
                user: { name: 'Test User', email },
                status: 1,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials', status: 0 });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
