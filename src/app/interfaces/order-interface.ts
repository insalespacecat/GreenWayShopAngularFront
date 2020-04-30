import {CartItemInterface} from './cart-item-interface';

export interface OrderInterface {
  id: number;
  items: Array<CartItemInterface>;
  total: number;
  name: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
}
