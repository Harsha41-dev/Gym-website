// authMiddleware.js

// Checks if user is logged in
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.redirect('/login');
};

// Checks if user has a specific role
export const hasRole = (role) => {
  return (req, res, next) => {
    if (req.session.role === role) {
      return next();
    }
    return res.status(403).send('Access Denied');
  };
};
