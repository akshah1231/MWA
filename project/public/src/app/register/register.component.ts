import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Credentials } from '../login/login.component';

export class UserCredential{
  _id!:string;
  name!:string;
  username!:string;
  password!:string;
  constructor(_id:string, name:string, username:string, password:string){
    this._id = _id;
    this.name = name;
    this.username = username;
    this.password = password;
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasSuccess = false;
  hasError = false;
  registrationForm!:FormGroup;
  credentials !:Credentials;
  
  constructor(private service:GamesDataService,private route:Router,private formBuilder:FormBuilder) { 
    this.registrationForm=this.formBuilder.group({
      name: "",
      username: "",
      password: "",
      repeatPassword: ""
    })
  }

  ngOnInit(): void {
  }
  register(registrationForm:FormGroup){
    console.log("form submitted");
    
    console.log(registrationForm.value);

    const newUser={
      name:registrationForm.value.name,
      username:registrationForm.value.username,
      password:registrationForm.value.password
    }
    if(registrationForm.value.password==registrationForm.value.repeatPassword){
      this.service.addUser(newUser).subscribe({
        next:(data)=>{
          console.log("user added",data);
          this.hasSuccess=true;
        },
        error:err=> {
          console.log(err);
          this.hasError=true;
        },
        complete:()=>{
          this.hasSuccess=true;
        }
        
      })
    }
    else{
      console.log("Password doesnt match");
      alert("password doesn't match");
    }

    
  }
}
