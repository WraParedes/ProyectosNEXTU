import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/Product';
import { ShoppingCartService } from '../shopping-cart.service';
//import { ShoppingCartItem } from './model/ShoppingCartItem';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product: Product;

  purchaseQuantity: number;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {

    this.purchaseQuantity = 0;

  }

  ngOnInit() {

    let found = this.shoppingCartService.shoppingCartItems.find(sci => sci.product.id === this.product.id);

    if (found != null) {
      this.purchaseQuantity = found.quantity;
    }

  }

  addToCart() {

    if (this.purchaseQuantity <= this.product.stock) {

      this.shoppingCartService.addProduct(this.product, this.purchaseQuantity);

    } else {

      alert("No puedes agregar: " + this.purchaseQuantity + ", el inventario es de " + this.product.stock);
      this.purchaseQuantity = 0;

    }

  }

}
