import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IPlayer } from '../players/players.component';
import { BehaviorSubject } from 'rxjs';
import { LikedServiceService } from '../liked-service/liked-service.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService{
  playersList: Array<IPlayer> = [];
  curPage: number = 1;
  constructor(private http: HttpClient, private _likedPlayers: LikedServiceService) { }

  getListFromServer(){
    let p = new BehaviorSubject({})
    this.http.get("https://nba-players.herokuapp.com/players-stats")
    .subscribe((data) => {
      
      let res: string = JSON.stringify(data);
      if(res !== '{}'){
        let tmp: Array<IPlayer> = JSON.parse(res); 
        const listLikedPlayers = this._likedPlayers.getListOfLikedPlayers();
        let indexOfLiked = 0;
        this.playersList = tmp.map(val => {
          if(val.name === listLikedPlayers[indexOfLiked]) {
            val.isLiked = true;
            if(indexOfLiked + 1 < listLikedPlayers.length)
              indexOfLiked += 1;
          }
          else 
            val.isLiked = false;
          return val;
        } );
        p.next(this.playersList as Array<Object>);
      }
    })
    return p;
  }

  getList(): Array<IPlayer> {
      return this.playersList;
  }

  getPlayer(name: string): IPlayer | undefined {
    return this.playersList.find((val: IPlayer) => {
      return val.name === name;
    });
    
  }

  

}
