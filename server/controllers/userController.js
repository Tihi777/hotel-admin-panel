import jwt from "jsonwebtoken";
import ash from "express-async-handler";
import Employee from "../models/employeeModel.js";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const authEmployee = ash(async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (user && isPasswordMatched) {
    res.json({
      _id: user._id,
      name: user.name,
      position: user.position,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ error: "Неверный логин или пароль" });
    throw new Error("Invalid email or password");
  }
});
