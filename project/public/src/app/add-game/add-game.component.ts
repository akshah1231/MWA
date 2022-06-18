import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  gameForm:FormGroup;

  constructor(private service:GamesDataService,private route:Router,private formBuilder:FormBuilder) { 
    this.gameForm=this.formBuilder.group({
      title:"",
      year:"",
      name:"",
      established:""
    })
  }

  ngOnInit(): void {
  }
  addGame(gameForm:FormGroup){
    console.log("Form submitted with value",gameForm.value);
    // const newGame: Game=new Game("","");
    // newGame.title=this.gameForm.value["title"];    
    // newGame.year=this.gameForm.value["year"];
    // newGame.publisher.name=this.gameForm.value["name"];
    // newGame.publisher.established=this.gameForm.value["established"];
    // this.service.addGame(newGame).subscribe(
    //   game =>{
    //     console.log(game);
    //   },
    //   error =>{
    //     console.log(error);
    //   },
    //   () =>{
    //     this.route.navigate(["games"]);
    //   }      
    // )
    const newGame={
      "title":gameForm.value.title,
      "year":gameForm.value.year
    }
    const newPublisher={
      "name":gameForm.value.name,
      "established":gameForm.value.established
    }
    this.service.addGame(newGame).subscribe({
      next:(data)=>{
        console.log("data added",data);
        this.service.addPublisher(newPublisher,data._id).subscribe({
          next:(data)=>{
            alert("game added");
          },
          error:err=>console.log(err),
          complete:()=>{
            this.route.navigate(["games/"]);
          }
        })
      },
      error:err=> console.log(err),
      complete:()=>{
        
      }
      
    })
  }

}
