import { pool } from "../db.js";

export const addProduct = async (req, res) => {
  const { name, description, price, quantity_available } = req.body;
  try {
    const [data] = await pool.query(
      "INSERT INTO products (name, description, price, quantity_available) VALUES (?,?,?,?)",
      [name, description, price, quantity_available]
    );
    console.log(data);
    res.send({
      id: data.insertId,
      name,
      description,
      price,
      quantity_available,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `products` ");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE product_id=?", [req.params.id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const [data] = await pool.query("DELETE FROM products WHERE product_id=?", [req.params.id]);
    if (data.affectedRows <= 0)
      return res.status(404).json({
        message: "Product not found",
      });
    res.sendStatus(204);
  } catch (error) {}
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity_available } = req.body;
  const [result] = await pool.query(
    "UPDATE products SET name=IFNULL (?,name), description=IFNULL (?, description), price=IFNULL (?, price), quantity_available=IFNULL (?, quantity_available) WHERE product_id=?",
    [name, description, price, quantity_available, id]
  );
  try {
    if (result.affectedRows == 0)
      return res.status(404).json({
        message: "Product not found",
      });
    const [rows] = await pool.query("SELECT * FROM products WHERE product_id=?", [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};
