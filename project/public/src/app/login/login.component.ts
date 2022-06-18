import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { UsersService } from '../user.service';


export class Credentials {
  username!:string;
  password!:string;
  constructor(name:string,username:string,password:string){
    this.password = password;
    this.username = username;
  }
}

export class UserToken{
  #success!:boolean;
  #token!:string;

  get success(){ return this.#success;}
  get token(){ return this.#token;}
  set success(success:boolean){ this.#success = this.success;}
  set token(token:string){ this.token = this.token;}


}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLoggedIn!:boolean;
  credentials!:Credentials;
  #name!:string;
  unAuthorised!:boolean;

  set name(name){this.#name = name;}
  get name(){return this.#name;}


  @ViewChild('loginForm')
  loginForm!:NgForm;

  constructor(private _userService:UsersService, private _jwtHelperService:JwtHelperService, private _authService:AuthService) { 
    this.credentials = new Credentials("","","");
  }

  ngOnInit(): void {
    this.loginForm.setValue(this.credentials);
    console.log("foooorm",this.loginForm);
    setTimeout(() => {
      this.loginForm.setValue(this.credentials);
    }, 0);
  }

  login(loginForm:NgForm){
    console.log("login method");
    console.log(loginForm.value.username);
     const loginCredentials = new Credentials("",this.loginForm.value.username, this.loginForm.value.password);
    this._userService.login(loginCredentials).subscribe({
      next:(userToken)=>{
        console.log("Token fetched",userToken)
        this._authService.userToken = userToken;
        this.isLoggedIn = this._authService.isLoggedIn;
        this.name = this._authService.name;
        this.unAuthorised = false;
      },
      error:(err)=>{
        console.log("Error",err)
        this.unAuthorised = true;
      },
      complete:()=>{}
    });
  }

  onLogOut(){
    this._authService.deleteToken();
    this.isLoggedIn = this._authService.isLoggedIn;
  }

}