import mongoose, { Document, Schema } from 'mongoose';

export interface UserType extends Document {
    email: string;
    password: string;
    name?: string;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true  , unique:true},
    password: { type: String, required: true },
    name: { type: String },
});

export default mongoose.model<UserType>('user', userSchema);
