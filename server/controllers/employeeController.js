import ash from "express-async-handler";
import Employee from "../models/employeeModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const authEmployee = ash(async (req, res) => {
  const { email, password } = req.body;

  const existingEmployee = await Employee.findOne({ email });
  const isPasswordMatched = await existingEmployee.matchPassword(password);

  if (existingEmployee && isPasswordMatched) {
    res.json({
      employee: existingEmployee,
      token: generateToken(existingEmployee._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
