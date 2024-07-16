import { Request, Router } from "express";
import { EmployeeController } from "../controllers/employeeController";

const employeeRoute = Router();

const employeeController = new EmployeeController();

employeeRoute.get("/employees", employeeController?.getEmployees);
employeeRoute.post("/employees", employeeController?.createEmployee);
employeeRoute.get("/employees/:id", employeeController?.getEmployee);
employeeRoute.put("/employees/:id", employeeController?.updateEmployee);
employeeRoute.delete("/employees/:id", employeeController?.deleteEmployee);

export default employeeRoute;
