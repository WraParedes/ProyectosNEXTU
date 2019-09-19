import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { LoginService } from '../login.service'
import { SessionService } from '../session.service'
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';

  user = {
    username: '',
    password: ''
  };

  validUsername = true
  validPassword = true

  validLogin = true

  constructor(
    private shoppingCartService: ShoppingCartService,
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {

    this.shoppingCartService.resetShoppingCart();

  }

  submitForm(form) {

    let validForm = true

    if (this.user.username == "") {
      this.validUsername = false
      validForm = false
    } else {
      this.validUsername = true
    }

    if (this.user.password == "") {
      this.validPassword = false
      validForm = false
    } else {
      this.validPassword = true
    }

    if (validForm) {

      this.performLogin(this.user.username, this.user.password);

    }

  }

  performLogin(username: string, password: string) {

    this.loginService.performLogin(username, password).subscribe(
      data => {

      let user: User = {
        username: data.username,
        token: data._kmd.authtoken
      }

      this.sessionService.user = user;

      this.router.navigate(['./dashboard']);

    },
    error => {

      this.validLogin = false;

    })

  }

}
