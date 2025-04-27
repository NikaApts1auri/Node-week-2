import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
const data = fs.readFileSync("./data/products.json", "utf8");

app.get("/products", (req, res) => {
  res.json(JSON.parse(data));
});

app.post("/products", (req, res) => {
  const products = JSON.parse(data);
  const newProducts = { ...req.body, id: Date.now() };
  products.push(newProducts);
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(201).json(newProducts);
});

app.put("/products/:id", (req, res) => {
  const products = JSON.parse(data);
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );
  const newProducts = req.body;
  products[productIndex] = newProducts;
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(201).json(newProducts);
});

//this is path methodolog just in express isn't path method and does it with put
app.put("/products/:id", (req, res) => {
  const products = JSON.parse(data);
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );
  const newProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = newProduct;

  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.json(newProduct);
});

app.delete("/products/:id", (req, res) => {
  const products = JSON.parse(data);
  const newProducts = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  );
  fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
  res.status(204).send("deleted product succesfuly and it is ", newProducts);
});

app.listen(3000, () => {
  console.log("Server is runnin on port 3000 <3");
});
