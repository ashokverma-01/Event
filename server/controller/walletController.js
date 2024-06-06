import Consumer from '../models/website/User.js';

// Get user wallet balance
export const getWalletBalance = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming req.user contains authenticated user data
        const user = await Consumer.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ balance: user.balance });
    } catch (error) {
        console.log('Error fetching wallet balance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user wallet balance
// export const updateWalletBalance = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { amount } = req.body;

//         if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
//             return res.status(400).json({ message: 'Invalid amount' });
//         }

//         const user = await Consumer.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.balance += amount;
//         await user.save();
//         res.json({ balance: user.balance });
//     } catch (error) {
//         console.log('Error updating wallet balance:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


export const updateWalletBalance = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { amount } = req.body;

        if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const user = await Consumer.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the amount to the user's balance
        user.balance = amount;
        await user.save();

        res.json({ balance: user.balance });
    } catch (error) {
        console.log('Error updating wallet balance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
