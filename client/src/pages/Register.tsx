import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Register as RegisterUser } from '../api/apiFun';
import type { RegisterForm } from '../api/apiFun';

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;
        const newErrors: typeof errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const mutation = useMutation({
        mutationFn: () => RegisterUser(form),
        onSuccess: () => {
            alert("Registration successful! Please login.");
            navigate('/login');
        },
        onError: (err: any) => {
            alert(err.message || "Registration failed");
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        // Clear error when user types
        setErrors(prev => ({
            ...prev,
            [e.target.name]: ''
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            mutation.mutate();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white gap-4 p-6 rounded shadow w-[90%] max-w-md"
            >
                <h2 className="text-xl font-semibold mb-4">Register</h2>

                <input
                    name="name"
                    placeholder="Username"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={`w-full border p-2 mb-3 rounded ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={`w-full border p-2 mb-3 rounded ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

                <button
                    type="submit"
                    className="w-full bg-gray-700 text-white p-2 rounded"
                >
                    Register
                </button>

                <p className="text-sm mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
