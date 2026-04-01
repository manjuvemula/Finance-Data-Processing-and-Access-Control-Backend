const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ✅ REGISTER
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 🔍 Validation
    if (!name || name.trim() === "") {
      res.status(400);
      throw new Error("Name is required");
    }

    if (!email || email.trim() === "") {
      res.status(400);
      throw new Error("Email is required");
    }

    if (!password || password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user (🔥 ADMIN for testing)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"   // 🔥 IMPORTANT: gives full access
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};

// ✅ LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    // 🔍 Find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    // 🔐 Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};