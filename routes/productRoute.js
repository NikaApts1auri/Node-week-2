import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductCount,
  getMostExpensiveProduct,
  getLatestProduct,
} from "../controllers/productController.js";

const productsRouter = express.Router();

productsRouter.route("/").get(getAllProducts).post(createProduct);
productsRouter.get("/count", getProductCount);
productsRouter.get("/most-expensive", getMostExpensiveProduct);
productsRouter.get("/latest", getLatestProduct);

export default productsRouter;
