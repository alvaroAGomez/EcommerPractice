import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { createProductDTO, Product, updateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiUrl = "https://young-sands-07814.herokuapp.com/api/products/";
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?:number, offset?:number) {
    let params = new  HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset)

    }
    return this.http.get<Product[]>(this.apiUrl, {params});	
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

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Product[]>(this.apiUrl, {
      params:{limit,offset}
    });	

  }
}
