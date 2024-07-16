import { Request, Response } from "express";
import employee from "../models/employeeModel";

export class EmployeeController {
  async getEmployees(req: Request, res: Response) {
    try {
      let order = req.query.order || "asc";
      let search = req.query.search || "";
      const Employees = await employee
        .find({ name: new RegExp(String(search), 'i') })
        .sort({
          name: order === "asc" ? 1 : -1,
        });
      return res.status(200).json(Employees);
    } catch (error) {
      console.error(error);
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, position, department, admission_date } = req.body;
      const Employee = await employee.findById(id);

      if (!Employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      if (!name || !email || !position || !department || !admission_date) {
        return res.status(400).json({ message: "Please provide all Fields" });
      }
      let update = { name, email, position, department, admission_date };

      const updatedEmployee = await employee.findByIdAndUpdate(id, update, {
        returnOriginal: false,
      });

      return res.status(200).json(updatedEmployee);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const { name, email, position, department, admission_date } = req.body;
      if (!name || !email || !position || !department || !admission_date) {
        return res.status(400).json({ message: "Please provide all Fields" });
      }

      const newEmployee = await employee.create({
        name,
        email,
        position,
        department,
        admission_date,
      });

      const Employee = await newEmployee.save();

      return res.status(201).json(Employee);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Employee = await employee.findById(id);
      if (!Employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.status(200).json(Employee);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Employee = await employee.findById(id);
      if (!Employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      await employee.findByIdAndDelete(id);
      return res.status(200).json({ message: "Employee deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
