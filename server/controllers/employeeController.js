import ash from "express-async-handler";
import bcrypt from "bcrypt";
import Employee from "../models/employeeModel.js";
import { addEmployee } from "./hotelController.js";

export const getEmployees = ash(async (req, res) => {
  const employees = await Employee.find().populate("position");

  res.status(200).json(employees);
});

export const createEmployee = ash(async (req, res) => {
  const employee = new Employee(req.body);

  addEmployee(employee._id, employee.hotelId);

  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(employee.password, salt);

  employee.save().then(() => {
    Employee.populate(employee, { path: "position" }).then(
      (populatedEmployee) => {
        res.status(201).json(populatedEmployee);
      }
    );
  });
});

export const updateEmployee = ash(async (req, res) => {
  const {
    name,
    email,
    hotelName,
    hotelId,
    password,
    isAdmin,
    position,
  } = req.body;

  const employee = await Employee.findById(req.params.id);

  if (employee) {
    employee.name = name;
    employee.email = email;
    employee.hotelName = hotelName;
    employee.hotelId = hotelId;
    employee.password = password;
    employee.isAdmin = isAdmin;
    employee.position = position;

    const updatedEmployee = await employee.save();
    const populatedEmployee = await Employee.populate(updatedEmployee, {
      path: "position",
    });

    console.log(populatedEmployee);
    res.json(populatedEmployee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

export const deleteEmployee = ash(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    await employee.remove();
    res.json({ message: "Employee removed" });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

export const clearEmployee = ash(async (employees) => {
  employees.map(async (id) => {
    const employee = await Employee.findById(id);

    if (employee) {
      employee.hotelName = "Не задано";
      employee.hotelId = null;
      await employee.save();
    }
  });
});
