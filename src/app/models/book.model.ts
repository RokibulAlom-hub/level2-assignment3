

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
 
 //creating a instance method in every book called borrow and
 //  it takes a quantity parmeter and then calculate the copies

 bookSchema.methods.borrow = async function(quantity:number) {
  //check how much have
   if(this.copies < quantity){
    throw new Error('Not enough copies available')
   }
   //minus the copies form quantitys
   this.copies -= quantity
   //check avalibityou
   if (this.copies === 0 ) {
     this.available = false;
   }
   
   await this.save()
  }
 



export const Book = model<Ibooks>("Book", bookSchema)