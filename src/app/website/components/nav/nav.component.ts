import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile :User |null = null;
  categories :Category[] =[];

  constructor(
    private storeService: StoreService,
    private authService: AuthService, 
    private userService: UsersService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

getAllCategories(){
  this.categoryService.getAllProducts().subscribe(res=>{
    this.categories = res;
  })
}

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login("alvaro@gmail.com","123456").subscribe(res=>{
      this.getProfile();
    })
  }

  getProfile(){
    this.authService.getProfile().subscribe(res=>{
      this.profile = res;
    })
  }
}
