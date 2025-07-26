import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/apiFun';

interface EditTaskProps {
    task: any;
    onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending'
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'Pending'
            });
        }
    }, [task]);

    const mutation = useMutation({
        mutationFn: (updatedData: any) => updateTask(task._id, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            onClose();
        },
        onError: (error: any) => {
            alert(error.message || 'Update failed');
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                <h2 className="text-lg font-bold mb-4">Edit Task</h2>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                    className="w-full p-2 border rounded mb-3"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={4}
                    required
                    className="w-full p-2 border rounded mb-3"
                ></textarea>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
