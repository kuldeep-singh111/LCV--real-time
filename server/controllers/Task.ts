import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { AuthenticatedRequest } from '../middleware/auth';

// Create a new task
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    console.log("fdfdfdfsd", req.body)
    try {
        const userId = req.user?._id;
        console.log("userid is", userId)
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.json({ message: "all fileds are required!" })
        }


        const newTask = new Task({ title, description, status, userId });
        await newTask.save();
        res.status(201).json({ message: "Task added successfully", newTask });
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// Get all tasks...
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find()
            .populate('userId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
    try {
        console.log("ghdj", req.params.id)
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};