import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('https://lcv-86w3.onrender.com/api/auth', { withCredentials: true });
                console.log('l response', res.data.isauthenticated)
                setIsAuthenticated(res.data.isauthenticated);

            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, loading };
};
