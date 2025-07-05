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
    const filter = typeof req.query.filter === 'string' ? req.query.filter : undefined;
    const sortBy =typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const sortByorder = req.query.sort === 'desc' ? -1 : 1;
    const limit = parseInt(req.query.limit as string, 10) || 10
    let query = {}
    if (filter) {
      query  = {genre: filter}
    }
    const books = await Book.find(query)
    .sort({[sortBy] : sortByorder})
    .limit(limit)
      res.status(201).json ({
        success: true,
        message: "Books getting successfuly ",
        books
    })
})


//   try {
//     // Validate and parse query parameters
//     const filter = typeof req.query.filter === 'string' ? req.query.filter : undefined;
//     const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
//     const sortOrder = req.query.sort === 'desc' ? -1 : 1;
//     const limit = parseInt(req.query.limit as string, 10) || 10;

//     // Validate sortBy to prevent injection
//     const validSortFields = ['createdAt', 'title', 'author', 'genre']; // Example fields
//     if (!validSortFields.includes(sortBy)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid sortBy field',
//       });
//     }

//     // Build query
//     const query = filter ? { genre: filter } : {};

//     // Fetch books
//     const books = await Book.find(query)
//       .sort({ [sortBy]: sortOrder }) // Use computed property for dynamic key
//       .limit(limit);

//     // Send response
//     res.status(200).json({
//       success: true,
//       message: 'Books retrieved successfully',
//       books,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve books',
//       error: error.message,
//     });
//   }
// });
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
        data: null
    })
})
