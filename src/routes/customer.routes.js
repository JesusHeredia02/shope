import { pool } from "../db.js";
import { addCustomer, getCustomer, getCustomers, deleteCustomer, updateCustomer, getCustomerByEmailAndPhone } from "../controllers/customer.controllers.js";
import { Router } from "express";

const customerRouter = Router();

customerRouter.get("/customer", getCustomers); // Obtener todos los clientes
customerRouter.get("/customers/:id", getCustomer);
customerRouter.get("/customer-Login",getCustomerByEmailAndPhone) // Obtener un cliente por su ID
customerRouter.post("/customers", addCustomer); // Agregar un cliente
customerRouter.put("/customers/:id", updateCustomer); // Actualizar un cliente por su ID
customerRouter.delete('/customers/:id', deleteCustomer); // Eliminar un cliente por su ID

export default customerRouter;
