import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

import { StoreService } from '../../services/store.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile :User |null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService, 
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
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
