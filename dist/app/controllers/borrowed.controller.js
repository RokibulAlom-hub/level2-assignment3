"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const mongoose_1 = require("mongoose");
exports.borrowRoutes = express_1.default.Router();
//create borrow route
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: bookId, quantity, dueDate } = req.body;
    //find the book
    const findBook = yield book_model_1.Book.findById(bookId);
    if (!findBook) {
        return res.status(404).json({ success: false, message: "Book not found" });
    }
    // Call borrow method on the book
    yield (findBook === null || findBook === void 0 ? void 0 : findBook.borrow(quantity));
    // create a borrow record 
    const borrowRecord = yield borrow_model_1.Borrow.create({
        //i dont exacly give req.body cause didnt getting data by aggration so i take help of ai and added data like this 
        book: new mongoose_1.Types.ObjectId(req.body.book),
        quantity: req.body.quantity,
        dueDate: req.body.dueDate
    });
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord
    });
}));
// get borrow by mongodb aggregation honestly i take a lots of ai help here by understanding the code specially for lookup
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
        {
            // grouping by book feild to count total quantity
            $group: {
                _id: "$book",
                totalquantity: { $sum: "$quantity" }
            }
        },
        {
            // look up book details from  book collection 
            $lookup: {
                from: "books",
                localField: "_id", // this is local field where books real id 
                foreignField: "_id", // thisi is foregn key it stored in borrow database
                as: "bookDetails"
            }
        },
        {
            //converting book details array into object for separate data
            $unwind: "$bookDetails"
        },
        {
            //select title and isbn for showing the data in query
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
}));
