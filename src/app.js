import express from "express";
import routerproductos from "./routes/products.routes.js";
import customerRouter from "./routes/customer.routes.js";
import saleRouter from "./routes/sale.routes.js";
import './config.js'
import cors from 'cors'
    
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api',routerproductos)
app.use('/api',customerRouter)
app.use('/api',saleRouter)
export default app;