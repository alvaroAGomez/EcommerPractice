import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.api_url+"/api/auth/";
  private user = new BehaviorSubject<User|null>(null);

  User$ = this.user.asObservable();  //store global donde guardo el estado del usuario

  constructor(private http: HttpClient, 
              private tokenService: TokenService) { }

  login(email:String, password:string){
    return this.http.post<Auth>(this.apiUrl+"login", {email,password})
    .pipe(
      tap(response => this.tokenService.saveToke(response.access_token))
    );
  }


  loginAndGet(email:string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(()=>this.getProfile())
    )
  }

  getProfile(){
    return this.http.get<User>(this.apiUrl+"profile")
    .pipe(
      tap(user=>this.user.next(user))
    )
  }

  logout(){
    this.tokenService.removeToken();
  }
}
