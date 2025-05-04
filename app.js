import express from "express";
import morgan from "morgan";
import productRoute from "./routes/productRoute.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const app = express();
console.log(process.env.DB_USER);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("heloo from middleware");
  next();
});

const getUser = (req, res) => {
  res.send("Hello from user");
};
const createUser = (req, res) => {
  res.send("Hello from create user");
};
const editUser = (req, res) => {
  res.send("Hello from edit user");
};
const deleteUser = (req, res) => {
  res.send("Hello from delete user");
};

app.use("/products", productRoute);

const usersRouter = express.Router();
app.use("/users", usersRouter);

usersRouter.route("/").get(getUser).post(createUser);
usersRouter.route("/:id").put(editUser).delete(deleteUser);

app.listen(3000, () => {
  console.log("Server is runnin on port 3000 <3");
});
