import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userWalletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
});


const UserWallet = model('UserWallet', userWalletSchema);

export default UserWallet;