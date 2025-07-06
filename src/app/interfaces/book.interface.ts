
export interface Ibooks {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean; 

  borrow(quantity: number): Promise<void>; // thsi is instance method for calculaitng the copis
}
