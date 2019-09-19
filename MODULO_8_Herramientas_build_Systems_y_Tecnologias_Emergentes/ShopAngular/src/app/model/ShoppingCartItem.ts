import { Product } from './Product'

export class ShoppingCartItem {

  product: Product;
  quantity: number;

  subtotal(): number {
    return this.product.price * this.quantity;
  }

  constructor() {}

}
