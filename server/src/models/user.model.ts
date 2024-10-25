import mongoose, { Document, Schema } from 'mongoose';

export interface UserType extends Document {
    email: string;
    password: string;
    name?: string;
}

const userSchema: Schema = new Schema({
    userName: { type: String, required: true , unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String,  },
    avatar: { type: String }, // for Google profile picture
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<UserType>('user', userSchema);
