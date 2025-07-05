import { Document } from 'mongoose';
export interface Ibooks extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean; 

  borrow(quantity: number): Promise<void>; // instance method for calculaitng the copis
}
