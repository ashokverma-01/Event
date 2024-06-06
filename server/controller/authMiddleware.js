import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if authorization header is provided
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, '99b09f628443f9fe234e4032fa446c8df9f2f49b8eba3491f6dffa275c4f2374'); // Use the same secret key
        
        // Store decoded user data in request object
        req.user = decoded;

        // Proceed to the next middleware function
        next();
    } catch (error) {
        // Handle invalid token
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default verifyToken;
