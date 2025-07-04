import express, { Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controllers";

export const app = express();

//middleware
app.use(express.json(),);


app.use("/books", booksRoutes)
//routes

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "This is Library Management API",
    });
});