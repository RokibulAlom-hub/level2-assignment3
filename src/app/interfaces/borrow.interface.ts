import { Types } from "mongoose";

export interface Iborrows{ 
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}