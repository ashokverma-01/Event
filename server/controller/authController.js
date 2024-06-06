import Consumer from '../models/website/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';




export const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = new Consumer({email, password, balance: 0});
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};



export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log('Login attempt for email:', email);
        const user = await Consumer.findOne({email});
        if(!user) {
            console.log('No user found for email:', email);
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for email:', email);
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const token = jwt.sign({userId: user._id},
             '99b09f628443f9fe234e4032fa446c8df9f2f49b8eba3491f6dffa275c4f2374',
              {expiresIn: '1h'});
              console.log('Login successful for email:', email);
        res.json({token, balance: user.balance});
    } catch (error) {
        console.log('Error logging in:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};








