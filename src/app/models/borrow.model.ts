import { model, Schema } from "mongoose";
import { Iborrows } from "../interfaces/borrow.interface";

const borrowSchema = new Schema <Iborrows>({
    book:{
        type: Schema.Types.ObjectId,
        ref: "Book",
         required: true},
    quantity:{type:Number, required: true},
    dueDate:{type:Date, required: true},
},{
    timestamps: true,
})

export const Borrow = model<Iborrows>("Borrow", borrowSchema)