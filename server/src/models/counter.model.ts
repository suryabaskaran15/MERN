import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: {type:'number' ,default:100000000},
});

export default mongoose.model('Counter', counterSchema);