import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  baseUrl="http://localhost:9000/api";
  constructor(private http:HttpClient) { }
  public getGame(id:string): Observable<Game> {
    const url:string=this.baseUrl+"/games/"+id;
    return this.http.get<Game>(url);
    }
  private _handleError(err:any):Promise<any>{
    console.log("service error",err);
    return Promise.reject(err.message|| err);
    
  }
  public getGames(): Observable<Game[]> {
    const url:string=this.baseUrl+"/games";
    return this.http.get<Game[]>(url);
    }
  public addGame(game : any):Observable<any>{
    console.log(game);
    return this.http.post(this.baseUrl+ "/games", game); 
  }
  public addPublisher(newPublisher:any,gameId:string):Observable<any>{
    const url=this.baseUrl+'/games/'+gameId+"/publisher";
    return this.http.post(url,newPublisher);
  }
  updateGame(game:any,gameId:string):Observable<any>{
    const url: string = this.baseUrl + '/games/' + gameId;
    return this.http.put<any>(url,game);
  }

  updatePublisher(newPublisher:any,gameId:string):Observable<any>{
    const url=this.baseUrl+'/games/'+gameId+"/publisher";
    return this.http.put<any>(url,newPublisher);
  }

  deleteGame = (gameId: string): Observable<any> => {
    const url: string = this.baseUrl + '/games/' + gameId;
    return this.http.delete<any>(url);
  };

  addUser(user:any):Observable<any>{
    console.log(user);
    return this.http.post(this.baseUrl+"/users",user);
  }
  // getGames():Array<Game>{
  //   let game=new Array<game>(2);

  // }
}
