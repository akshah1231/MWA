import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-naviagation',
  templateUrl: './naviagation.component.html',
  styleUrls: ['./naviagation.component.css']
})
export class NaviagationComponent implements OnInit {
  #_isLoggedIn!: boolean;
  get isLoggedIn():boolean {
    return this._authService.isLoggedIn;
  }
  set isLoggedIn(res:boolean ) {
    this._authService.isLoggedIn = res;
  }

  constructor(private _router:Router,private _authService: AuthService) { }
  onHome(): void {
    this._router.navigate(['']);
  }
  onGames(): void {
    this._router.navigate(['games']);
  }
  onRegister():void{
    this._router.navigate(['register']);
  }
  onProfile():void{
    this._router.navigate(['profile']);
  }

  ngOnInit(): void {
  }

}
