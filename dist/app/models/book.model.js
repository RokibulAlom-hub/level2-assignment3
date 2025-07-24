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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true }
}, {
    timestamps: true,
    versionKey: false
});
//creating a instance method in every book called borrow and
//  it takes a quantity parmeter and then calculate the copies
bookSchema.methods.borrow = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        //check how much have
        if (this.copies < quantity) {
            throw new Error('Not enough copies available');
        }
        //minus the copies form quantitys
        this.copies -= quantity;
        //check avalibityou
        if (this.copies === 0) {
            this.available = false;
        }
        yield this.save();
    });
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
