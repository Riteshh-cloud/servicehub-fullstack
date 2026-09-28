import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { publicUser, signToken } from "../utils/token.js";

export async function register(req, res) {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: "Email is already registered" });

  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hash,
    phone
  });

  res.status(201).json({ user: publicUser(user), token: signToken(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");

  if (!user || !(await bcrypt.compare(password || "", user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({ user: publicUser(user), token: signToken(user) });
}

export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}
