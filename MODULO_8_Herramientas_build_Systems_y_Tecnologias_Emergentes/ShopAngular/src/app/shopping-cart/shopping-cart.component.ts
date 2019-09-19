import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  title = "Carrito de compras"

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    if (this.sessionService.user == null) {

      this.router.navigate(['/login']);

    }

  }

  pay() {

    this.shoppingCartService.payShoppingCart();

  }

}
