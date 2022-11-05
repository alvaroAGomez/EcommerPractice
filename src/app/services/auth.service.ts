import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.api_url+"/api/auth/";

  constructor(private http: HttpClient, 
              private tokenService: TokenService) { }

  login(email:String, password:string){
    return this.http.post<Auth>(this.apiUrl+"login", {email,password})
    .pipe(
      tap(response => this.tokenService.saveToke(response.access_token))
    );
  }

  getProfile(){
    return this.http.get<User>(this.apiUrl+"profile")
  }
}
