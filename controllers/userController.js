const User = require('../models/User');

// ✅ GET ALL USERS (Admin only)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      count: users.length,
      data: users
    });

  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE USER ROLE (Admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    // 🔍 Validation
    if (!role || !['viewer', 'analyst', 'admin'].includes(role)) {
      res.status(400);
      throw new Error("Invalid role. Must be viewer, analyst, or admin");
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({
      message: "User role updated successfully",
      data: user
    });

  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE USER STATUS (Admin only)
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    // 🔍 Validation
    if (!status || !['active', 'inactive'].includes(status)) {
      res.status(400);
      throw new Error("Invalid status. Must be active or inactive");
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({
      message: "User status updated successfully",
      data: user
    });

  } catch (err) {
    next(err);
  }
};