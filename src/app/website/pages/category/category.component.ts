import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  productId : string|null= null;


  constructor(
    private activeRoute: ActivatedRoute,
    private productServices: ProductsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productServices.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((res) => {
        this.products = res;
      });
      this.activeRoute.queryParamMap.subscribe(params=>{
        this.productId = params.get('product');
      })
  }

  onLoadMore() {
    if (this.categoryId) {
      this.productServices
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((res) => {
          this.products = this.products.concat(res);
          this.offset += this.limit;
        });
    }
  }
}
