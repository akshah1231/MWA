import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  gameForm:FormGroup;
  game!:Game;

  constructor(private service:GamesDataService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder) { 
    this.gameForm=this.formBuilder.group({
      title:"",
      year:"",
      name:"",
      established:""
    });
    const gameId = this.route.snapshot.params["gameId"];
    this.service.getGame(gameId).subscribe(
      data=>{
        console.log("Game fetched successfully",data);
        this.game = data;
        this.gameForm.controls['title'].setValue(data.title);
        this.gameForm.controls['year'].setValue(data.year);
        this.gameForm.controls['name'].setValue(data.publisher.name);
        this.gameForm.controls['established'].setValue(data.publisher.established);
        console.log("After set data",this.gameForm.value)
      },
      err=>{console.log(err)},
      ()=>{}
    )
    
}

  ngOnInit(): void {
  }
  updateGame(gameForm:FormGroup){
    console.log("Form submitted with value",gameForm.value);
    const newGame={
      "title":gameForm.value.title,
      "year":gameForm.value.year
    }
    const newPublisher={
      "name":gameForm.value.name,
      "established":gameForm.value.established
    }
    // this.service.updateGame(newGame,this.game._id).subscribe({
    //   next:(data)=>{
    //     console.log("data added",data,this.game._id);
    //     this.service.updatePublisher(newPublisher,data._id).subscribe({
    //       next:(data)=>{
    //         alert("game added");
    //         console.log("data added",data,this.game._id);
            
    //       },
    //       error:err=>console.log(err),
    //       complete:()=>{
    //         this.router.navigate(["games/"]);
    //       }
    //     })
    //   },
    //   error:err=> console.log(err),
    //   complete:()=>{
        
    //   }
      
    // })
    this.service.updateGame(newGame,this.game._id).subscribe({
      next: (data) => {
       this.service.updatePublisher(newPublisher,this.game._id).subscribe({
         next: (data) => { 
           alert("Game data updated successfully.")
         },
         error: err=>console.log(),
         complete: ()=>{
           this.router.navigate(["games/",this.game._id]);
         }
       })
 },
 error: err => console.log("Service Error:", err),
 complete: () => {
}
})
  }

}
