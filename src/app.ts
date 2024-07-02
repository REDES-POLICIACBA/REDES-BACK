import "dotenv/config";
import connectDB from "./config/dataBase";
import indexRouter from "./routes/index";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);


const port = process.env.PORT || 3000;

connectDB()
app.listen(port, () => console.log(`Servidor corriendo en el port: ${port}!`))