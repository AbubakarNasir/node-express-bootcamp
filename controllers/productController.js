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

export async function createProduct(req, res, next) {
    const { name, price } = req.body;

    if (!name || typeof name !== "string" || !name.trim() ||
        price === undefined || price === null || price === "") {
        return res.status(400).send("All fields are required");
    }

    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).send("Invalid price");
    }

    try {
        const result = await pool.query(
            "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
            [name, price]
        );
        const newProduct = result.rows[0];
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(req, res, next) {
    const productId = Number(req.params.id);
    const { name, price } = req.body;

    if (!Number.isInteger(productId) || productId < 1) {
        return res.status(400).send("Invalid product ID");
    }

    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).send("Invalid product name");
    }

    if (
        price === undefined ||
        price === null ||
        price === "" ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {
        return res.status(400).send("Invalid price");
    }

    try {
        const result = await pool.query(
            "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
            [name, price, productId]
        );
        const updatedProduct = result.rows[0];

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req, res, next) {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId < 1) {
        return res.status(400).send("Invalid product ID");
    }

    try {
        const result = await pool.query(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            [productId]
        );
        const deletedProduct = result.rows[0];

        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }

        res.status(204).send("Product deleted successfully");
    } catch (error) {
        next(error);
    }
}