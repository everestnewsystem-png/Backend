const role = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied. Insufficient role." });
    }

    next();
  };
};

export default role;
