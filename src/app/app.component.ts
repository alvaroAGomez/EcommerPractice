import { Component, OnInit } from '@angular/core';

import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgParent = '';
  showImg = true;
token:string ="";

imgRta:string ="";
  constructor(private authService: AuthService, 
    private userService: UsersService, 
    private fileService: FilesService,
    private tokenService: TokenService){}


  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name:"Alvaro",
      email:"alvaro@gmail.com",
      password:"123456",
      role:"Customer"
    }).subscribe(res=>{
      console.log({res});
      
    })
  }

  downloadFile(){
    this.fileService.getFile('myPDEF.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','aplicattion/pdf').subscribe(res=>{
    console.log(res)
    })
  }

onUpload(event:Event){
  const element = event.target as HTMLInputElement;
  const file = element.files?.item(0);
  if(file){
    this.fileService.uploadFile(file).subscribe(res=>{
      this.imgRta = res.location;
    })
  }
  }
 
}
