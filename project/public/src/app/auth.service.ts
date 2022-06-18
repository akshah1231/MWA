import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment} from 'src/environments/environment';
import { UserToken } from './login/login.component';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn!:boolean;


  constructor(private _jwtService:JwtHelperService) { 
  }
  #name!:string;
  get name(){
    return this.#name;
  }
  set name(name:string){
    this.#name = name;
  }


  #usertoken!:UserToken;
  get userToken(){
    return this.#usertoken;
  }
  set userToken(userToken:UserToken){
    console.log("set usertoken called.")
    this.#usertoken = userToken;
    this.#token = userToken.token;
    this.isLoggedIn = true;
    localStorage.setItem(environment.TOKEN_STORAGE_KEY,userToken.token);
    const token:string = localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;
    this.#name = this._jwtService.decodeToken(token).name;
  }
 
  #token!:string;
  get token(){
     return this.#token;
  }

  set token(token:string){
    this.#token = token;
  }


  deleteToken(){
    localStorage.clear();
    this.isLoggedIn = false;

  }

  geTokenHeader (){
    let head = new HttpHeaders({
      'Content-Type': `application/json`
    }).set('Authorization',  `Bearer ${this.token}`)
    return {
        headers: head
    }
  }}
