import express, { Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controllers";
import { borrowRoutes } from "./app/controllers/borrowed.controller";

export const app = express();

//middleware
app.use(express.json(),);


app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowRoutes)
//routes

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "This is Library Management API",
    });
});