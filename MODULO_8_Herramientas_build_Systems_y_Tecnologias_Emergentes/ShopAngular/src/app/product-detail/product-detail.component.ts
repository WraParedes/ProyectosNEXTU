import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../model/Product';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    if (this.sessionService.user == null) {

      this.router.navigate(['/login']);

    } else {

      let id = this.route.snapshot.paramMap.get('id');

      this.getProductDetail(id);
    }

  }

  getProductDetail(id: string) {

    this.productService.performGetProductById(this.sessionService.user.token, id).subscribe(
      data => {

        this.product = {
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          stock: data.stock
        }

      },
      error => {

        alert("Ocurrió un error al consultar el detalle del producto");

      }
    )

  }

  goBack() {
    this.location.back();
  }

}
