import ash from "express-async-handler";
import EmployeePosition from "../models/employeePositionModel.js";

export const getEmployeePositions = ash(async (req, res) => {
  const employeePositions = await EmployeePosition.find();

  res.status(200).json(employeePositions);
});

export const createEmployeePosition = ash(async (req, res) => {
  const employeePosition = new EmployeePosition(req.body);

  const createdEmployeePosition = await employeePosition.save();

  res.status(201).json(createdEmployeePosition);
});

export const updateEmployeePosition = ash(async (req, res) => {
  const { name, description } = req.body;

  const employeePosition = await EmployeePosition.findById(req.params.id);

  if (employeePosition) {
    employeePosition.name = name;
    employeePosition.description = description;

    const updatedEmployeePosition = await employeePosition.save();
    res.json(updatedEmployeePosition);
  } else {
    res.status(404);
    throw new Error("Employee position not found");
  }
});

export const deleteEmployeePosition = ash(async (req, res) => {
  const employeePosition = await EmployeePosition.findById(req.params.id);

  if (employeePosition) {
    await employeePosition.remove();
    res.json({ message: "Employee position removed" });
  } else {
    res.status(404);
    throw new Error("Employee position not found");
  }
});
