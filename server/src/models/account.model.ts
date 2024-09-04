import mongoose, { type Document, Schema } from 'mongoose';


/**
 * @openapi
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         account_number:
 *           type: number
 *         balance:
 *           type: number
 *           format: number
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         age:
 *           type: number
 *         gender:
 *           type: string
 *           enum: ['M', 'F']
 *         address:
 *           type: string
 *         employer:
 *           type: string
 *         email:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 */


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
    employer: { type: String, default:null },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
});

export default mongoose.model<AccountType>('Account', accountSchema);
