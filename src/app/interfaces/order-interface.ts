import {CartItemInterface} from './cart-item-interface';
import {UserInterface} from './user-interface';

export interface OrderInterface {
  id: number;
  items: Array<CartItemInterface>;
  total: number;
  name: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  user: UserInterface;
}
