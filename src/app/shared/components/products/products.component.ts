import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Product, createProductDTO, updateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  
  @Input() products: Product[] = [];
  //@Input() productId: string | null =null;

   @Input()
   set productId(id:string|null){
    if(id){
      this.onShowDetail(id);
    }
   }
  
  @Output() loadMore = new EventEmitter();

  showProductDetail: boolean = false;
  productChosen: Product | null =null;


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: String) {
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id).subscribe(
      (res) => {
       
        this.productChosen = res;
      },
      (errorMsg) => {
        window.alert(errorMsg);
        console.log(errorMsg);
      }
    );
  }


  createNewProduct() {
    const product: createProductDTO = {
      title: 'Nuevo producto',
      description: 'descripcion es esta ',
      images: ['https://placeimg.com/640/480/any'],
      price: 56489,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((res: Product) => {
      console.log(res);
      this.products.unshift(res); //agrega en la primera posicion
    });
  }

  updateProduct() {
    if(this.productChosen){
      const changes: updateProductDTO = {
        title: 'Esto es un cambio',
      };
      const id = this.productChosen?.id;
      this.productsService.update(changes, id).subscribe((res) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products[productIndex] = res;
        this.productChosen = res;
      });
    }

  }

  deleteProduct() {
    if(this.productChosen){
      const id = this.productChosen?.id;

      this.productsService.delete(id).subscribe((res) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }

  }

  onLoadMore() {
    this.loadMore.emit();
  }

  //para evitar el callback hell, utilizo un pipe y despues el switchmap para hacer todas las peticiones necesarias
  readAndUpdate(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update({ title: 'change' }, product.id)
        ) //esta es cuando tiene dependencia en este caso necesita el id
      )
      .subscribe((res) => {
        console.log(res);
      });

    //zip es para ejecutar varias peticiones a la vez q no son dependientes, y la rta es una array con cada response de las peticiones
    this.productsService
      .fetchAndUpdate(id, { title: 'change' })
      .subscribe((res) => {
        const read = res[0];
        const update = res[1];
      });
  }
}
