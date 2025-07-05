import express, {  Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router()

//create borrow route

borrowRoutes.post("/", async(req:Request, res: Response) : Promise<any> => {
    const { book: bookId, quantity, dueDate } = req.body;
    //find the book
    const findBook = await Book.findById(bookId)
    if (!findBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
   
     // Call borrow method on the book
    await findBook?.borrow(quantity)

    // create a borrow record 
    const borrowRecord = await Borrow.create(req.body)

     // Step 5: Send response
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord
    });
})