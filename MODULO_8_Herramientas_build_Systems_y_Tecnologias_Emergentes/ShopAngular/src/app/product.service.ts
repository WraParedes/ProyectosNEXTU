import { Injectable } from '@angular/core';
import { Product } from './model/Product'
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  performGetProducts(sessionToken: string): Observable<any> {

    var headers = {
      'Authorization': 'Kinvey ' + sessionToken,
      'X-Kinvey-API-Version': '3'
    };

    let url = 'https://baas.kinvey.com/appdata/kid_ryL78U7WM/products';

    let response = this.http.get(
      url,
      {
        headers: headers
      }
    );

    return response;

  }

  performGetProductById(sessionToken: string, productId: string): Observable<any> {

    var headers = {
      'Authorization': 'Kinvey ' + sessionToken,
      'X-Kinvey-API-Version': '3'
    };

    let url = 'https://baas.kinvey.com/appdata/kid_ryL78U7WM/products/' + productId;

    let response = this.http.get(
      url,
      {
        headers: headers
      }
    );

    return response;

  }

  performPutProduct(sessionToken: string, product: Product): Observable<any> {

    var headers = {
      'Authorization': 'Kinvey ' + sessionToken,
      'X-Kinvey-API-Version': '3'
    };

    let url = 'https://baas.kinvey.com/appdata/kid_ryL78U7WM/products/' + product.id;

    let response = this.http.put(
      url,
      product,
      {
        headers: headers
      }
    );

    return response;

  }

}
