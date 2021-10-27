import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IPlayer } from '../players/players.component';
import { AsyncSubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService{
  playersList: Array<IPlayer> = [];
  $likedPlayers: AsyncSubject<Array<string>> = new AsyncSubject();
  listLiked: Array<string> = [];
  curPage: number = 1;
  constructor(private http: HttpClient) {
    this.http = http;
    this.http.get('http://localhost:3000/players').subscribe(data=> {
      data = JSON.parse(JSON.parse(JSON.stringify(data))[0]['list']);
      this.$likedPlayers.next(data as Array<string>)
      this.$likedPlayers.complete();
    } );
   }

  getListFromServer(){
    let p = new BehaviorSubject({})
    this.http.get("https://nba-players.herokuapp.com/players-stats")
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

  getList(): Array<IPlayer> {
      return this.playersList;
  }

  getPlayer(name: string): IPlayer | undefined {
    for(let i = 0; i< this.playersList.length; i++) {
      if(this.playersList[i].name === name)
        return this.playersList[i]
    }
    return undefined;
  }


  setFavorites(allPlayers: Array<IPlayer> ,likedPlayers: Array<string>): Array<IPlayer> {
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

  getLikedList() {
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

  addPlayer(name: string){
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

  removePlayer(name: string){
    const index = this.listLiked.indexOf(name);
    if (index > -1) {
      this.listLiked.splice(index, 1);
    }
    this.updateDataOnServer();
    return this.listLiked;
  }

  updateDataOnServer() {
    this.http.put('http://localhost:3000/players/1', {list: JSON.stringify(this.listLiked)}).subscribe()
  } 

  getPlayersFromTeam(team: string){
    let res = [];
    for(let i = 0; i < this.playersList.length; i++){
         if(this.playersList[i].team_acronym === team){
           res.push(this.playersList[i]);
         }
    }
    return res;
  }

  getURLFromName(name: string): string{
    let names =  name.split(' ');
    return names[1] + '/' +  names[0];
  }

  getImg(item: IPlayer){
    let names =  item.name.split(' ');
    return 'https://nba-players.herokuapp.com/players/' + names[1] + '/' +  names[0];
  }

  changeFavorite(player: IPlayer){
    player.is_liked = !player.is_liked;
    //console.log(this._playersData.getList()[2].name, this._playersData.getList()[2].isLiked);
    if(player.is_liked)
      this.addPlayer(player.name);
    else
      this.removePlayer(player.name);
  }

}
