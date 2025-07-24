import express, { Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controllers";
import { borrowRoutes } from "./app/controllers/borrowed.controller";
const cors = require("cors");
export const app = express();

//middleware
app.use(express.json(),);
app.use(cors({origin:"http://localhost:5173"}))

app.use("/api/books", booksRoutes)
app.use("/api/borrows", borrowRoutes)
//routes

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "This is Library Management API",
    });
});