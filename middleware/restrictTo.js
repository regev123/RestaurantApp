const User = require('../models/User');

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: 'You do not have permission to perform this action' });
    }

    next();
  };
};
