import pool from "../db.js";

export async function getAllProducts(req, res, next) {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

export async function getProductById(req, res, next) {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId < 1) {
        return res.status(400).send("Invalid product ID");
    }

    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
        const product = result.rows[0];

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
}