import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});

const UserStore = mongoose.model<IUser>('UserStore', UserSchema);
export { UserStore };