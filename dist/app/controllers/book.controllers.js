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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoutes = express_1.default.Router();
//create route for book creating
exports.booksRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfuly ",
            book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create book',
            error: error.message,
        });
    }
}));
//all the obook data getting route
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // here first type validaton done for filter sortby, sortbtorders, limit
        const filter = typeof req.query.filter === 'string' ? req.query.filter : undefined;
        const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
        const sortByorder = req.query.sort === 'desc' ? -1 : 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        let query = {};
        if (filter) {
            query = { genre: filter };
        }
        const books = yield book_model_1.Book.find(query)
            //here sortBy i didnt first get how to do it for dynamic sort then help of ai i wrap sortby with []
            .sort({ [sortBy]: sortByorder })
            .limit(limit);
        res.status(201).json({
            success: true,
            message: "Books getting successfuly ",
            books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error: error.message,
        });
    }
}));
// signle book data getting 
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book getting successfuly ",
            book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve book',
            error: error.message,
        });
    }
}));
// data update route by id
exports.booksRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateData = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated successfuly ",
            book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update books data',
            error: error.message,
        });
    }
}));
// data book delete route by id
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfuly ",
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: error.message,
        });
    }
}));
