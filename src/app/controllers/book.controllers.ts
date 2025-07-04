import express, {  Request, Response } from "express"
import { Book } from "../models/book.model";

export const booksRoutes = express.Router()

//create route for book creating
booksRoutes.post('/',async (req: Request, res: Response) => {
    const body = req.body ;
    const book = await Book.create(body)
    res.status(201).json ({
        success: true,
        message: "Book created successfuly ",
        book
    })
})

// data getting route

booksRoutes.get('/',async (req: Request, res: Response) => {
    const books = await Book.find()
      res.status(201).json ({
        success: true,
        message: "Books getting successfuly ",
        books
    })
})
// data getting route by id

booksRoutes.get('/:bookId',async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)
      res.status(201).json ({
        success: true,
        message: "Book getting successfuly ",
        book
    })
})
// data update route by id

booksRoutes.put('/:bookId',async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const updateData = req.body
    const book = await Book.findByIdAndUpdate(bookId,updateData,{new: true})
      res.status(201).json ({
        success: true,
        message: "Book updated successfuly ",
        book
    })
})
// data update route by id

booksRoutes.delete('/:bookId',async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findByIdAndDelete(bookId)
      res.status(201).json ({
        success: true,
        message: "Book deleted successfuly ",
        book
    })
})
