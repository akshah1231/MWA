import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Game;
  #_isLoggedIn!: boolean;
  get isLoggedIn():boolean {
    return this._authService.isLoggedIn;
  }
  set isLoggedIn(res:boolean ) {
    this._authService.isLoggedIn = res;
  }


  constructor(private route:ActivatedRoute,private gameService:GamesDataService,private router:Router,private _authService: AuthService) { 
    this.game = new Game("","");
  }

  ngOnInit(): void {
    const gameId=this.route.snapshot.params["gameId"];
    this.gameService.getGame(gameId).subscribe(game => {
      this.game = game;
    });
  }

  onDelete = () => {
    this.gameService.deleteGame(this.game._id).subscribe(() => {
      this.router.navigate(['/games']);
    });
  };
  onEdit=()=>{
    this.router.navigate
  }

}
