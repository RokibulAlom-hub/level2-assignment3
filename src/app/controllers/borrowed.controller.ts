import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { Types } from "mongoose";
import { Ibooks } from "../interfaces/book.interface";

export const borrowRoutes = express.Router()

// console.log(`this is form borrow`,borrowRoutes);

//create borrow route
borrowRoutes.post("/", async (req: Request, res: Response): Promise<any> => {
 const {bookID,quantity,dueDate} = (req.body);
 const findBook = await(Book.findById(bookID));
 if (!findBook) {
   return res.status(404).json({ success: false, message: "Book not found" });
  }
  await findBook.borrow(quantity);
  const borrowRecord = await Borrow.create({
    book: new Types.ObjectId(bookID),
    quantity,
    dueDate,
  });
  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrowRecord,
  });
  // console.log(findBook,bookID,req.body),borrowRecord;
 
})
// get borrow by mongodb aggregation honestly i take a lots of ai help here by understanding the code specially for lookup

borrowRoutes.get("/", async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book", // ObjectId of the book
        totalquantity: { $sum: "$quantity" }
      }
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails"
      }
    },
    // { $unwind: "$bookDetails" },
    {
      $project: {
        _id: 0,
        totalquantity: 1,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn"
        }
      }
    }
  ]);

  // return respose
  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary
  });
})
