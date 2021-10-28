import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IPlayer } from '../types/player.type';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { PLAYERS_API_URL, LOCAL_API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {
  playersList: Array<IPlayer> = [];
  $likedPlayers = new AsyncSubject<Array<string>>();
  listLiked: Array<string> = [];
  curPage = 1;

  constructor(private http: HttpClient) {
    this.http.get(`${LOCAL_API_URL}/players`).subscribe(data=> { 
      data = JSON.parse(JSON.parse(JSON.stringify(data))[0]['list']);
      this.$likedPlayers.next(data as Array<string>)
      this.$likedPlayers.complete();
    } );
   }

  public getListFromServer(): BehaviorSubject<any> {
    let p = new BehaviorSubject({});
    this.http.get(`${PLAYERS_API_URL}/players-stats`)
    .subscribe((data) => {
      this.$likedPlayers.subscribe(liked => {
        this.listLiked = liked as  Array<string>;
        let res: string = JSON.stringify(data);
        if(res !== '{}'){
          this.playersList = this.setFavorites(JSON.parse(res), this.listLiked);
          p.next(this.playersList as Array<Object>);
        }
      })
      
    })
    return p;
  }

  public getList(): Array<IPlayer> {
      return this.playersList;
  }

  public getPlayer(name: string): IPlayer | undefined {
    for(let i = 0; i< this.playersList.length; i++) {
      if(this.playersList[i].name === name)
        return this.playersList[i]
    }
    return undefined;
  }


  private setFavorites(allPlayers: Array<IPlayer> ,likedPlayers: Array<string>): Array<IPlayer> {
    let indexOfLiked = 0;
    allPlayers = allPlayers.sort((n1,n2) => {
      if (n1.name > n2.name) {
          return 1;
      }
      else if (n1.name < n2.name) {
          return -1;
      }
      return 0;
    });
    return allPlayers.map(val => {
      if(val.name === likedPlayers[indexOfLiked]) {
        
        val.is_liked = true;
        if(indexOfLiked + 1 < likedPlayers.length)
          indexOfLiked += 1;
      }
      else 
        val.is_liked = false;
      return val;
    } );
  }

  public getLikedList() {
    let indexOfLiked = 0;
    return this.playersList.filter(val => {
      if(val.name === this.listLiked[indexOfLiked]) {
        if(indexOfLiked + 1 < this.listLiked.length)
          indexOfLiked += 1;
        return true
      }
      return false;
    } );
  }

  public addPlayer(name: string){
    this.listLiked.push(name)
    this.listLiked = this.listLiked.sort((n1,n2) => {
      if (n1 > n2) {
          return 1;
      }
      else if (n1 < n2) {
          return -1;
      }
      return 0;
    });
    this.updateDataOnServer()
  }

  public removePlayer(name: string){
    const index = this.listLiked.indexOf(name);
    if (index > -1) {
      this.listLiked.splice(index, 1);
    }
    this.updateDataOnServer();
    return this.listLiked;
  }

  private updateDataOnServer() {
    this.http.put(`${LOCAL_API_URL}/players/1`, {list: JSON.stringify(this.listLiked)}).subscribe()
  } 

  public getPlayersFromTeam(team: string){
    let res = [];
    for(let i = 0; i < this.playersList.length; i++){
         if(this.playersList[i].team_acronym === team){
           res.push(this.playersList[i]);
         }
    }
    return res;
  }

  public getURLFromName(name: string): string{
    let names =  name.split(' ');
    return names[1] + '/' +  names[0];
  }

  public getImg(item: IPlayer){
    let names =  item.name.split(' ');
    return `${PLAYERS_API_URL}/players/${names[1]}/${names[0]}`;
  }

  public changeFavorite(player: IPlayer){
    player.is_liked = !player.is_liked;
    if (player.is_liked) {
      this.addPlayer(player.name);
    } else {
      this.removePlayer(player.name);
    }
  }

}
