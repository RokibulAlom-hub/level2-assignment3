

import { model, Schema } from "mongoose";
import { Ibooks } from "../interfaces/book.interface";


 const bookSchema = new Schema <Ibooks> ({
    title: {type: String , required: true, trim: true},
    author: {type: String , required: true, trim: true},
    genre: {type: String , required: true, trim: true},
   isbn: {type: String , required: true, trim: true},
    description: {type: String , required: true, trim: true},
   copies : {type: Number , required: true},
    available: {type: Boolean , required: true}
 },{
   timestamps: true,
   versionKey: false
 }) 
 



export const Book = model<Ibooks>("Book", bookSchema)