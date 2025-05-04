import fs from "fs";

const readProducts = () =>
  JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

const writeProducts = (products) =>
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));

const getAllProducts = (req, res) => {
  const products = readProducts();
  res.json(products);
};

const createProduct = (req, res) => {
  const products = readProducts();
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const nameExists = products.some((product) => product.name === name);
  if (nameExists) {
    return res.status(400).json({ error: "Product already exists" });
  }

  const newProduct = {
    ...req.body,
    id: Date.now(),
    AddedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
};

const getProductCount = (req, res) => {
  const products = readProducts();
  res.status(200).json({ count: products.length });
};

const getMostExpensiveProduct = (req, res) => {
  const products = readProducts();
  if (products.length === 0) {
    return res.status(404).json({ error: "No products found" });
  }

  const mostExpensive = products.reduce((prev, curr) =>
    curr.price > prev.price ? curr : prev
  );

  res.status(200).json({ mostExpensive });
};

const getLatestProduct = (req, res) => {
  const products = readProducts();
  if (products.length === 0) {
    return res.status(404).json({ error: "No products found" });
  }

  const latest = products.reduce((prev, curr) =>
    curr.AddedAt > prev.AddedAt ? curr : prev
  );

  res.status(200).json({ latest });
};

export {
  getAllProducts,
  createProduct,
  getProductCount,
  getMostExpensiveProduct,
  getLatestProduct,
};
