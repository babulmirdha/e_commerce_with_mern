// middleware/authorizeRole.js

module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.roles || !Array.isArray(user.roles)) {
      return res.status(403).json({ status: "error", message: "Access denied: no roles assigned." });
    }

    const hasRole = user.roles.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ status: "error", message: "Access denied: insufficient permissions." });
    }

    next();
  };
};