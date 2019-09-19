import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  logout() {

    this.sessionService.user = null;
    this.router.navigate(['/login']);

  }

  showCart() {

    if (this.shoppingCartService.shoppingCartItems.length > 0){

      this.router.navigate(['/shoppingCart']);

    } else {

      alert("Debes agregar al menos un producto al carrito");

    }

  }

}
