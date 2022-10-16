import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';

import { createProductDTO, Product, updateProductDTO } from './../models/product.model';
import {retry, repeatWhen, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private apiUrl = environment.api_url+"/api/products/";
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?:number, offset?:number) {
    let params = new  HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset)

    }
    return this.http.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3) //permite reiintentar la peticion hasta 3 veces antes del error 
    );	
  }
 
  getProduct(id:String) {
    return this.http.get<Product>(this.apiUrl+id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        
        if(error.status ===HttpStatusCode.Conflict){
          return throwError ('Algo Fallo en el server ')
        }

        if(error.status === HttpStatusCode.NotFound){
          return throwError ('Producto no existe')
        }

        if(error.status === HttpStatusCode.Unauthorized){
          return throwError ('no autorizado')
        }

        return throwError ('Algo salio mal ')
      })
    );	
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
