import jwt from 'jsonwebtoken';

/** ****************************************************
 * Common Errors
 *******************************************************
 */

// 400 Bad request
export const badRequestError = (res, msg = 'Bad request.') => {
  return res.status(400).send(msg);
};

// 401 Invalid token
export const invalidTokenError = (
  res,
  msg = 'Token is not valid. Authorization denied.'
) => {
  return res.status(401).send(msg);
};

// 500 Internal server error
export const internalError = (res, msg = 'Internal server error.') => {
  return res.status(500).send(msg);
};

// 400 Validation errors in body of request
export const validationError = (res, errors) => {
  return res.status(400).json({ errors: errors.array() }); // Bad request
};

/** ****************************************************
 * Common Responses
 *******************************************************
 */

// Return JWT after validation
export const returnJWT = (res, id) => {
  const payload = {
    user: {
      id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: 360000,
    },
    (err, token) => {
      if (err) throw err;
      return res.json({ token });
    }
  );
};
