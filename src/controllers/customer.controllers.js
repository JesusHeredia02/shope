import { pool } from "../db.js";

export const addCustomer = async (req, res) => {
  const { name, address, phone, email } = req.body;
  try {
    const [data] = await pool.query(
      "INSERT INTO customer (name, address, phone, email) VALUES (?,?,?,?)",
      [name, address, phone, email]
    );
    console.log(data);
    res.send({
      id: data.insertId,
      name,
      address,
      phone,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `customer` ");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM customer WHERE customer_id=?", [req.params.id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const [data] = await pool.query("DELETE FROM customer WHERE customer_id=?", [req.params.id]);
    if (data.affectedRows <= 0)
      return res.status(404).json({
        message: "Customer not found",
      });
    res.sendStatus(204);
  } catch (error) {}
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email } = req.body;
  const [result] = await pool.query(
    "UPDATE customer SET name=IFNULL (?,name), address=IFNULL (?, address), phone=IFNULL (?, phone), email=IFNULL (?, email) WHERE customer_id=?",
    [name, address, phone, email, id]
  );
  try {
    if (result.affectedRows == 0)
      return res.status(404).json({
        message: "Customer not found",
      });
    const [rows] = await pool.query("SELECT * FROM customer WHERE customer_id=?", [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please check again.",
    });
  }
};
