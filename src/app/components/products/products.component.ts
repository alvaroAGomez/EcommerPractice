import { Component, OnInit } from '@angular/core';

import { createProductDTO, Product, updateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail:boolean = false;
  productChosen:Product = {
    id:'',
    price:0,
    images:[],
    title:'',
    category:{
      id:'',
      name:''
    },
    description:''
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }


  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: String) { 
    this.productsService.getProduct(id).subscribe(res=>{
      this.toggleProductDetail();
      this.productChosen = res;
    })
   }

createNewProduct(){
  const product: createProductDTO ={
    title:'Nuevo producto',
    description:'descripcion es esta ',
    images:['https://placeimg.com/640/480/any'],
    price:56489,
    categoryId:2
  };
  this.productsService.create(product).subscribe((res: Product)=>{
    console.log(res);
    this.products.unshift(res);//agrega en la primera posicion
  })
}


updateProduct(){
  const changes : updateProductDTO={
    title:'Esto es un cambio'
  };
  const id = this.productChosen.id;
  this.productsService.update(changes, id).subscribe(res=>{
    console.log(res);
    const productIndex =  this.products.findIndex(item=>item.id === this.productChosen.id);
    this.products[productIndex] = res;
    this.productChosen = res;
  })

}

deleteProduct(){
  const id = this.productChosen.id;

  this.productsService.delete(id).subscribe(res=>{
    const productIndex =  this.products.findIndex(item=>item.id === this.productChosen.id);
    this.products.splice(productIndex,1);
    this.showProductDetail = false;
  })
}

}
