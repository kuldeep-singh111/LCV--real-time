import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUser } from "./User";


export interface ITask extends Document {
    title: string;
    description: string;
    status: 'pending' | 'in progress' | 'completed';
    userId: Types.ObjectId | IUser;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserStore',
        required: true,
    }
}, {
    timestamps: true,
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export { Task };