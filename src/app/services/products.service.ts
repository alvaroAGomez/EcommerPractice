import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createProductDTO, Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiUrl = "https://young-sands-07814.herokuapp.com/api/products/";
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);	
  }
 
  getProduct(id:String) {
    return this.http.get<Product>(this.apiUrl+id);	
  }

  create(dto:createProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);	
  }
}
