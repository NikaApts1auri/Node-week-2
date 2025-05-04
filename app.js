// import express from "express";
// import fs from "fs";

// const app = express();
// app.use(express.json());
// const data = fs.readFileSync("./data/products.json", "utf8");

// app.get("/products", (req, res) => {
//   res.json(JSON.parse(data));
// });

// app.post("/products", (req, res) => {
//   const products = JSON.parse(data);
//   const newProducts = { ...req.body, id: Date.now() };
//   products.push(newProducts);
//   fs.writeFileSync("./data/products.json", JSON.stringify(products));
//   res.status(201).json(newProducts);
// });

// app.put("/products/:id", (req, res) => {
//   const products = JSON.parse(data);
//   const productIndex = products.findIndex(
//     (product) => product.id === parseInt(req.params.id)
//   );
//   const newProducts = req.body;
//   products[productIndex] = newProducts;
//   fs.writeFileSync("./data/products.json", JSON.stringify(products));
//   res.status(201).json(newProducts);
// });

// //this is path methodolog just in express isn't path method and does it with put
// app.put("/products/:id", (req, res) => {
//   const products = JSON.parse(data);
//   const productIndex = products.findIndex(
//     (product) => product.id === parseInt(req.params.id)
//   );
//   const newProduct = { ...products[productIndex], ...req.body };
//   products[productIndex] = newProduct;

//   fs.writeFileSync("./data/products.json", JSON.stringify(products));
//   res.json(newProduct);
// });

// app.delete("/products/:id", (req, res) => {
//   const products = JSON.parse(data);
//   const newProducts = products.filter(
//     (product) => product.id !== parseInt(req.params.id)
//   );
//   fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
//   res.status(204).send("deleted product succesfuly and it is ", newProducts);
// });

// app.listen(3000, () => {
//   console.log("Server is runnin on port 3000 <3");
// });

import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
const data = fs.readFileSync("./data/products.json", "utf8");
const products = JSON.parse(data);

app.post("/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );
  products[productIndex].stock -= 1;

  // განახლებული მონაცემების ჩაწერა products.json ფაილში
  fs.writeFileSync("./data/products.json", JSON.stringify(products)); // მოცანემის ცვლილებას ასახავს დინამიურად .json ში

  res.status(200).json({
    message: "Stock decreased by 1",
    product: products[productIndex],
  });
});

app.delete("/products/delete-all", (req, res) => {
  const newProducts = [];
  fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
  res.status(200).json("Data is empty, removed all items ", newProducts);
});

app.get("/products/count", (req, res) => {
  const count = products.length;
  res.status(200).json(`count is ${count}`);
});

// app.post("/products", (req, res) => {
//   const { name, price } = req.body;

//   if (!name || !price) {
//     return res.status(400).json({ error: "Name and price are required" });
//   }

//   const newProduct = {
//     ...req.body,
//     id: Date.now(),
//   };

//   products.push(newProduct);
//   fs.writeFileSync("./data/products.json", JSON.stringify(products));
//   res.status(201).json(newProduct);
// });

app.post("/products", (req, res) => {
  const { name } = req.body;
  const nameExists = products.some((product) => product.name === name);
  if (nameExists) {
    return res.status(400).json({ error: "this product is exists" });
    problemmmmm;
  }
});

app.get("/products/most-expensive", (req, res) => {
  if (products.length === 0) {
    return res.status(404).json({ error: "No products found" });
  }

  const mostExpensive = products.reduce((prev, curr) =>
    curr.price > prev.price ? curr : prev
  );

  res.status(200).json({ mostExpensive });
});

// app.post("/products", (req, res) => {
//   const newProduct = { ...req.body, AddedAt: Date.now() };
//   products.push(newProduct);
//   fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
//   res.status(201).send(newProduct);
// });

//9
fs.readFile("products.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  fs.writeFile("products_backup.json", data, "utf8", (err) => {
    if (err) {
      console.error("Error writing the backup file:", err);
    } else {
      console.log("Backup created successfully as products_backup.json");
    }
  });
});
app.get("/products/latest", (req, res) => {
  if (products.length === 0) {
    return res.status(404).json({ error: "No products found" });
  }

  const latest = products.reduce((prev, curr) =>
    curr.AddedAt > prev.AddedAt ? prev : curr
  );

  res.status(200).json({ latest });
});

app.listen(3000, () => {
  console.log("Server is runnin on port 3000 <3");
});
