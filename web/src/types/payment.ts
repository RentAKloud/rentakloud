import { User } from "./user";
import { Order } from "./order";

export type Payment = {
  id: number;
  user: User;
  userId: number;
  order: Order;
  orderId: number;
  
  amount: number;
  currency: string;
  
  createdAt: string;
  updatedAt: string;
  
  number: string;
  amount_due: number;
  created: number;
}