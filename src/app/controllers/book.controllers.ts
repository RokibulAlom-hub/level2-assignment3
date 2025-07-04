import express, {  Request, Response } from "express"
import { Book } from "../models/book.model";

export const booksRoutes = express.Router()

booksRoutes.post('/create-book',async (req: Request, res: Response) => {
    const body = req.body ;
    const book = await Book.create(body)
    res.status(201).json ({
        success: true,
        message: "Bool created successfuly shuvo",
        book
    })
})

