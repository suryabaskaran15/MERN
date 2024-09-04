import counterModel from "../models/counter.model";

export const getNextAccountNumber = async ():Promise<number> => {
    const counter = await counterModel.findByIdAndUpdate(
        'account_number',
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return counter.sequence_value;
};
