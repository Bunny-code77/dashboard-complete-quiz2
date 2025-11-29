import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// 🟣 REGISTER USER
export const registerUser = async (req, res) => {
  console.log("✅ [registerUser] Route hit");
  try {
    const { name, email, password } = req.body;
    console.log("📦 Request Body:", req.body);

    // Check required fields
    if (!name || !email || !password) {
      console.log("❌ Missing fields in request");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    console.log("🔍 Checking existing user:", existingUser ? "Found" : "Not found");

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Password hashed successfully");

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("✅ User created:", user);

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("🚨 Missing JWT_SECRET in .env file!");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    console.log("🎟️ Token generated:", token ? "Yes" : "No");

    return res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("❌ [registerUser] Error details:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


// 🟢 LOGIN USER
export const loginUser = async (req, res) => {
  console.log("🔐 Login request:", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("🚨 Missing JWT_SECRET in .env");
      return res.status(500).json({ message: "Server config error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Login successful:", email);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// 🧠 GET LOGGED-IN USER INFO
export const getMe = async (req, res) => {
  console.log("👤 Fetching user with ID:", req.user?.id);

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ GetMe error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
