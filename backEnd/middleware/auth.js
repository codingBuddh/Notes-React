import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log("token", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
