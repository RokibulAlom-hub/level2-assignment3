import express, {  Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { Types } from "mongoose";

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
    const borrowRecord = await Borrow.create({
  book: new Types.ObjectId(req.body.book),
  quantity: req.body.quantity,
  dueDate: req.body.dueDate
})

     // Step 5: Send response
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord
    });
})
// get borrow by mongodb aggregation

borrowRoutes.get("/",async(req:Request, res: Response) => {
  const summary =  await Borrow.aggregate([
    {
      // grouping by book feild to count total quantity
      $group:{
        _id:"$book",
        totalquantity:  {$sum : "$quantity"}
      }
    },
    {
      // look up book details from  book collection 
      $lookup:{
        from:"books",
        localField:"_id",
        foreignField:"_id",
        as:"bookDetails"
      }
    },
    {
      //converitng book details array into object
      $unwind:
        "$bookDetails"
      
    },
    {
      //select title and isbn
      $project:{
        _id:0,
        totalquantity: 1,
        book:{
          title:"$bookDetails.title",
          isbn:"$bookDetails.isbn"
        }
      }
    }
  ])
  // return respose
  res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });
})
