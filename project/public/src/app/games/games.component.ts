import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { AuthService } from '../auth.service';

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  publisher!:any;
  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }
  get year() { return this.#year; }
  set year(year:string){
    this.#year=year;
  }
  
  constructor(id: string, title: string,) {
    this.#_id = id;
    this.#title = title;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  #_isLoggedIn!: boolean;
  get isLoggedIn():boolean {
    return this._authService.isLoggedIn;
  }
  set isLoggedIn(res:boolean ) {
    this._authService.isLoggedIn = res;
  }


  games!: Game[];
  searchText!:string;

  constructor(private gamesService: GamesDataService,private _authService: AuthService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.games = games;
    });
  }

}


