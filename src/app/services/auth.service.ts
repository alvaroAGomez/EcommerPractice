import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.api_url+"/api/auth/";

  constructor(private http: HttpClient) { }

  login(email:String, password:string){
    return this.http.post<Auth>(this.apiUrl+"login", {email,password})
  }

  profile(){
    return this.http.get(this.apiUrl+"profile")
  }
}
