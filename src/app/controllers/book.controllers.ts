import express, { Request, Response } from "express"
import { Book } from "../models/book.model";

export const booksRoutes = express.Router()
// console.log(`this is form book`,booksRoutes);

//create route for book creating
booksRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body)
    res.status(201).json({
      success: true,
      message: "Book created successfuly ",
      book
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create book',
      error: error.message,
    });
  }
})

//all the obook data getting route

booksRoutes.get('/', async (req: Request, res: Response) => {
  try {
    // here first type validaton done for filter sortby, sortbtorders, limit
    const filter = typeof req.query.filter === 'string' ? req.query.filter : undefined;
    const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const sortByorder = req.query.sort === 'desc' ? -1 : 1;
    const limit = parseInt(req.query.limit as string, 10) || 10

    let query = {}
    if (filter) {
      query = { genre: filter }
    }
    const books = await Book.find(query)
    //here sortBy i didnt first get how to do it for dynamic sort then help of ai i wrap sortby with []
      .sort({ [sortBy]: sortByorder })
    res.status(201).json({
      success: true,
      message: "Books getting successfuly ",
      books
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books',
      error: error.message,
    });
  }
})

// signle book data getting 
booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)
    res.status(201).json({
      success: true,
      message: "Book getting successfuly ",
      book
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve book',
      error: error.message,
    });
  }
})
// data update route by id

booksRoutes.patch('/:bookId', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const updateData = req.body
    const book = await Book.findByIdAndUpdate(bookId, updateData, { new: true })
    res.status(201).json({
      success: true,
      message: "Book updated successfuly ",
      book
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update books data',
      error: error.message,
    });
  }
})
// data book delete route by id

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const book = await Book.findByIdAndDelete(bookId)
    res.status(201).json({
      success: true,
      message: "Book deleted successfuly ",
      data: null
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: error.message,
    });
  }
})
