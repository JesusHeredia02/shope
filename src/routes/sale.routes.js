import { pool } from "../db.js";
import { addSale, getSale, getSales, deleteSale, updateSale } from "../controllers/sale.controllers.js";
import { Router } from "express";

const saleRouter = Router();

saleRouter.get("/sale", getSales); // Obtener todas las ventas
saleRouter.get("/sales/:id", getSale); // Obtener una venta por su ID
saleRouter.post("/sales", addSale); // Agregar una venta
saleRouter.put("/sales/:id", updateSale); // Actualizar una venta por su ID
saleRouter.delete('/sales/:id', deleteSale); // Eliminar una venta por su ID

export default saleRouter;
