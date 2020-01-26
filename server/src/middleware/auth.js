import jwt from 'jsonwebtoken';

import { invalidTokenError } from '../utils/responseHelper';

// Protects auth route with JWT
const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return invalidTokenError(res);
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    // add user to request
    req.user = decoded.user;
    return next();
  } catch (err) {
    return invalidTokenError(res);
  }
};

export default authMiddleware;
