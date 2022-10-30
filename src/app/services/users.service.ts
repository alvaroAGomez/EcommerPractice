import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  User, UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.api_url+"/api/users/";

  constructor(private _http: HttpClient) { }

  create(user: UserDto){
    return this._http.post(this.apiUrl,user);
  }

  getAll(){
    return this._http.get<User[]>(this.apiUrl);
  }
}
