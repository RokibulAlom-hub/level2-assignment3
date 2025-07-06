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
      //i dont exacly give req.body cause didnt getting data by aggration so i take help of ai and added data like this 
  book: new Types.ObjectId(req.body.book),
  quantity: req.body.quantity,
  dueDate: req.body.dueDate
})

     
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord
    });
})
// get borrow by mongodb aggregation honestly i take a lots of ai help here by understanding the code specially for lookup

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
        localField:"_id", // this is local field where books real id 
        foreignField:"_id", // thisi is foregn key it stored in borrow database
        as:"bookDetails"
      }
    },
    {
      //converting book details array into object for separate data
      $unwind:
        "$bookDetails"
      
    },
    {
      //select title and isbn for showing the data in query
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
