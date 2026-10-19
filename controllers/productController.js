import products from "../data/product.js";

export function getAllProducts(req, res) {
    res.json(products);
}

export function getProductById(req, res) {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId < 1) {
        return res.status(400).send("Invalid product ID");
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.json(product);
}