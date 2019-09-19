import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ProductService } from '../product.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  searchingText: string;

  products: Product[] = [];
  productsToDisplay: Product[] = this.products;

  constructor(
    private productService: ProductService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    this.performGetProducts()

  }

  inputModified(event: any) {

    if (this.searchingText.length > 0) {
      this.productsToDisplay = this.products.filter(
        product => product.name.toLowerCase().indexOf(this.searchingText.toLowerCase()) >= 0
      )
    } else {
      this.productsToDisplay = this.products;
    }

  }

  performGetProducts() {

    console.log("buscando productos");

    this.productService.performGetProducts(this.sessionService.user.token).subscribe(
      data => {

        for (let productDic of data) {

          let product: Product = {
            id: productDic._id,
            name: productDic.name,
            image: productDic.image,
            price: productDic.price,
            stock: productDic.stock
          };

          this.products.push(product);

        }

        this.productsToDisplay = this.products

      },
      error => {

        alert("Ocurrió un error al consultar el catálogo de productos");

      }
    );

  }

}
