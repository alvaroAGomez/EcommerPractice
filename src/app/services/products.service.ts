import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createProductDTO, Product, updateProductDTO } from './../models/product.model';

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


  //con put se envia todo el cuerpo del product
  //con patch solo se envia los atributos modificados

  update(dto:updateProductDTO, id:string) {
    return this.http.put<Product>(this.apiUrl+id, dto);	
  }

  delete(id:string){
    return this.http.delete<boolean>(this.apiUrl+id);	
  }
}
