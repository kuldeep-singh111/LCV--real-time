import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTasks, deleteTask } from '../api/apiFun';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import EditTask from "../components/EditTask";

const TaskPage = () => {
    const queryClient = useQueryClient();
    const [selectedTask, setSelectedTask] = useState<any>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: getAllTasks,
        refetchInterval: 5000
    });

    console.log("tasks data", data);
    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
    });


    if (isLoading || !data) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Something went wrong!</div>;

    return (
        <div className="p-4 mt-20 overflow-x-auto">
            <table className="min-w-full border">

                <thead className="bg-gray-600 border rounded-full text-white ">
                    <tr>
                        <th className="p-2 text-left font-bold" >UserName</th>
                        <th className="p-2 text-left font-bold  whitespace-nowrap">Task Title</th>
                        <th className="p-2 text-left font-bold">Description</th>
                        <th className="p-2 text-left font-bold">Status</th>
                        <th className="p-2 text-left font-bold">Date</th>
                        <th className="p-2 text-left font-bold">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((task) => (
                        <tr key={task._id} className="border-b align-top">
                            <td className="p-2  whitespace-nowrap">{task.userId?.name}</td>
                            <td className="p-2">{task.title}</td>
                            <td className="p-2">{task.description}</td>
                            <td className="p-2  whitespace-nowrap">{task.status}</td>
                            <td className="p-2  whitespace-nowrap">
                                {task.createdAt ? format(new Date(task.createdAt), 'dd MMM yyyy') : 'N/A'}</td>
                            <td className="p-2 relative  whitespace-nowrap">
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectedTask(task)}>
                                        <Pencil className="text-blue-600 w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteMutation.mutate(task._id)}>
                                        <Trash2 className="text-red-600 w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                selectedTask && (
                    <EditTask
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                    />
                )
            }

        </div>
    );
};

export default TaskPage;
