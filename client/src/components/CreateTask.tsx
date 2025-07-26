// import React, { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createTask } from '../api/apiFun';
// interface CreateTaskProps {
//     onClose: () => void;
// }

// const CreateTask: React.FC<CreateTaskProps> = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         status: 'Pending',
//     });

//     const queryClient = useQueryClient();

//     const mutation = useMutation({
//         mutationFn: createTask,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['tasks']);
//             onClose();
//         },
//         onError: (err: any) => {
//             alert(err.message || 'Failed to create task');
//         },
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         mutation.mutate(formData);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
//             >
//                 <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Task Title"
//                     required
//                     className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 />

//                 <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Task Description"
//                     rows={4}
//                     required
//                     className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 ></textarea>

//                 <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 >
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                 </select>

//                 <div className="flex justify-end gap-4">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//                     >
//                         Create
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateTask;