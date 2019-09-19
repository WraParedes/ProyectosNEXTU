import { Injectable } from '@angular/core';
import { Product } from './model/Product';
import { ShoppingCartItem } from './model/ShoppingCartItem';
import { SessionService } from './session.service';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Injectable()
export class ShoppingCartService {

  shoppingCartItems: ShoppingCartItem[] = [];

  constructor(

    private router: Router,
    private productService: ProductService,
    private sessionService: SessionService,

  ) { }

  addProduct(product: Product, quantity: number) {

    let found = this.shoppingCartItems.find(sci => sci.product.id === product.id);

    if (found != null) {

      if (quantity == 0) {

        let index = this.shoppingCartItems.indexOf(found, 0);
        this.shoppingCartItems.splice(index, 1);

      } else {

        found.quantity = quantity

      }

    } else if (quantity > 0) {

      let shoppingCartItem: ShoppingCartItem = new ShoppingCartItem();
      shoppingCartItem.product = product;
      shoppingCartItem.quantity = quantity;

      this.shoppingCartItems.push(shoppingCartItem);

    }

  }

  resetShoppingCart() {

    this.shoppingCartItems = [];

  }

  payShoppingCart() {

    if (this.shoppingCartItems.length > 0) {

      let item = this.shoppingCartItems[0]

      this.payProduct(item);

    }

  }

  payProduct(item: ShoppingCartItem) {

    item.product.stock -= item.quantity;

    this.productService.performPutProduct(this.sessionService.user.token, item.product).subscribe(
      data => {

        let index = this.shoppingCartItems.indexOf(item, 0);

        if (index == this.shoppingCartItems.length - 1) {

          this.resetShoppingCart();
          this.router.navigate(['/dashboard']);

        } else {

          let sci = this.shoppingCartItems[index + 1];

          this.payProduct(sci);

        }

      },
      error => {

        alert("Ocurrió un error al Pagar el carrito");

      }
    );

  }

  total(): number {

    var total = 0;

    for (let item of this.shoppingCartItems) {
      total += item.subtotal();
    }

    return total;

  }

}
