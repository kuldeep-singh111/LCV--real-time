import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoginUser } from '../api/apiFun';
import type { LoginForm } from '../api/apiFun';


const Login = () => {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => LoginUser(form),
        onSuccess: () => {
            navigate('/tasks');
        },
        onError: (error: any) => {
            alert(error.message || 'Login failed');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                }}
                className="bg-white p-6 rounded shadow w-[90%] max-w-md"
            >
                <h2 className="text-xl font-semibold mb-4">Login</h2>

                <input
                    name="email"
                    type='email'
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 mb-3 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-gray-700 text-white p-2 rounded"
                >
                    Login
                </button>

                <p className="text-sm mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
