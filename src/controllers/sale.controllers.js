import { pool } from "../db.js";

export const addSale = async (req, res) => {
  const { product_id, customer_id, quantity_purchased, sale_date, total_sale_amount } = req.body;
  try {
    const [data] = await pool.query(
      "INSERT INTO sale (product_id, customer_id, quantity_purchased, sale_date, total_sale_amount) VALUES (?,?,?,?,?)",
      [product_id, customer_id, quantity_purchased, sale_date, total_sale_amount]
    );
    console.log(data);
    res.send({
      id: data.insertId,
      product_id,
      customer_id,
      quantity_purchased,
      sale_date,
      total_sale_amount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const getSales = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `sale` ");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const getSale = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM sale WHERE sale_id=?", [req.params.id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const [data] = await pool.query("DELETE FROM sale WHERE sale_id=?", [req.params.id]);
    if (data.affectedRows <= 0)
      return res.status(404).json({
        message: "Sale not found",
      });
    res.sendStatus(204);
  } catch (error) {}
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { product_id, customer_id, quantity_purchased, sale_date, total_sale_amount } = req.body;
  const [result] = await pool.query(
    "UPDATE sale SET product_id=IFNULL (?,product_id), customer_id=IFNULL (?, customer_id), quantity_purchased=IFNULL (?, quantity_purchased), sale_date=IFNULL (?, sale_date), total_sale_amount=IFNULL (?, total_sale_amount) WHERE sale_id=?",
    [product_id, customer_id, quantity_purchased, sale_date, total_sale_amount, id]
  );
  try {
    if (result.affectedRows == 0)
      return res.status(404).json({
        message: "Sale not found",
      });
    const [rows] = await pool.query("SELECT * FROM sale WHERE sale_id=?", [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};
