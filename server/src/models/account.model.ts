import mongoose, { type Document, Schema } from 'mongoose';

export interface AccountType extends Document {
    account_number: number;
    balance: number;
    firstname: string;
    lastname: string;
    age: number;
    gender: 'M' | 'F';
    address: string;
    employer: string;
    email: string;
    city: string;
    state: string;
}

const accountSchema: Schema = new Schema({
    account_number: { type: Number, required: true, unique: true },
    balance: { type: Number, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    address: { type: String, required: true },
    employer: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
});

export default mongoose.model<AccountType>('Account', accountSchema);
