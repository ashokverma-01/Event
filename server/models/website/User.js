import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const consumerSchema = new mongoose.Schema({
    email: { type: String,
             required: true,
             unique: true
                 },
    password: {type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0 // Set default balance to 0
    }                   
});

//Hash password before saving to database
consumerSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    } catch (error) {
        next(error);
    }
    
});

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;