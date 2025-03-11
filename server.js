import express from "express";
import cookieParser from "cookie-parser";
import auth from "./routes/authRouter.js";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import connectDB from "./database/databse.js";
import bodyParser from "body-parser";
connectDB();

const app = express();

const server = 6001;

app.use(express.json());
app.use(cookieParser());

config({
  path: "./data/config.env",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};


app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", auth);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.get("/", (req, res) => {
  res.json({
    message: "Nice you have build a backend server in nodeJS ",
  });
});

app.listen(server, () => {
  console.log(`server is listening at ${server}`);
});
