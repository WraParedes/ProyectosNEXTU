import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    if (this.sessionService.user == null) {

      this.router.navigate(['/login']);

    }

  }

}
