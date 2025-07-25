"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrowed_controller_1 = require("./app/controllers/borrowed.controller");
exports.app = (0, express_1.default)();
//middleware
exports.app.use(express_1.default.json());
exports.app.use("/api/books", book_controllers_1.booksRoutes);
exports.app.use("/api/borrow", borrowed_controller_1.borrowRoutes);
//routes
exports.app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "This is Library Management API",
    });
});
