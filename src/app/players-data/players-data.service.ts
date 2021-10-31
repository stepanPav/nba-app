import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IPlayer } from '../types/player.type';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { PLAYERS_API_URL, LOCAL_API_URL } from '../constants';

type changedJSON = {
  id: string,
  list_changed_players: Array<IPlayer>
}

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {
  playersList: Array<IPlayer> = [];
  playersChangedList: Array<IPlayer> = [];
  $likedPlayers = new AsyncSubject<Array<string>>();
  listLiked: Array<string> = [];
  curPage = 1;

  constructor(private http: HttpClient) {
    this.http.get(`${LOCAL_API_URL}/changed_players/1`).subscribe(changedList => {
      changedList = changedList as changedJSON;
      this.parseChangedList(changedList as changedJSON)

    })
      
    this.http.get(`${LOCAL_API_URL}/liked_players`).subscribe(data=> { 
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
          let tmp = this.setChangedPlayers(JSON.parse(res), this.playersChangedList);
          this.playersList = this.setFavorites(tmp, this.listLiked);
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

  private setChangedPlayers(allPlayers: Array<IPlayer> ,changedPlayers: Array<IPlayer>): Array<IPlayer>{
    let indexOfChanged = 0;
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
      if(val.name === changedPlayers[indexOfChanged].name) {

        val = changedPlayers[indexOfChanged];
        if(indexOfChanged + 1 < changedPlayers.length)
          indexOfChanged += 1;
      }
      return val;
    } );
  }

  public getLikedList(): Array<IPlayer> {
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

  public addPlayer(name: string): void{
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
    this.updateLikedPlayersOnServer()
  }

  private parseChangedList(data: changedJSON){
    this.playersChangedList = data['list_changed_players'];
  }

  public removePlayer(name: string): Array<string>{
    const index = this.listLiked.indexOf(name);
    if (index > -1) {
      this.listLiked.splice(index, 1);
    }
    this.updateLikedPlayersOnServer();
    return this.listLiked;
  }

  private updateLikedPlayersOnServer(): void {
    this.http.put(`${LOCAL_API_URL}/liked_players/1`, {list: JSON.stringify(this.listLiked)}).subscribe()
  } 

  private updateChangedPlayersOnServer(): void{
    this.http.put(`${LOCAL_API_URL}/changed_players/1`, {'list_changed_players':this.playersChangedList}).subscribe();
  }

  public getPlayersFromTeam(team: string): Array<IPlayer>{
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

  public changeFavorite(player: IPlayer): void{
    player.is_liked = !player.is_liked;
    if (player.is_liked) {
      this.addPlayer(player.name);
    } else {
      this.removePlayer(player.name);
    }
  }

  public changePlayerInfo(player: IPlayer): void {
    for(let i = 0; i < this.playersList.length; i++){
      if(player.name === this.playersList[i].name){
        this.playersList[i] = player;
        this.http.get(`${LOCAL_API_URL}/changed_players/1`).subscribe(data => console.log(data));
        //console.log('fine');
        return;
      }
    }
  }

  public addChangedPlayer(player: IPlayer) {
    this.playersChangedList.push(player);
    this.playersChangedList = this.playersChangedList.sort((n1,n2) => {
      if (n1.name > n2.name) {
          return 1;
      }
      else if (n1.name < n2.name) {
          return -1;
      }
      return 0;
    });
    this.updateChangedPlayersOnServer();
  }

}
