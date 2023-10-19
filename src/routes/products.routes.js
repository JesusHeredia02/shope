import express from 'express';
import { addProduct, getProducts, getProduct, deleteProduct, updateProduct } from '../controllers/products.controllers.js';

const routerproductos = express.Router();

// Rutas para los productos
routerproductos.post('/product', addProduct); // Agregar un producto
routerproductos.get('/products', getProducts); // Obtener todos los productos
routerproductos.get('/products/:id', getProduct); // Obtener un producto por su ID
routerproductos.delete('/products/:id', deleteProduct); // Eliminar un producto por su ID
routerproductos.put('/products/:id', updateProduct); // Actualizar un producto por su ID

export default routerproductos;