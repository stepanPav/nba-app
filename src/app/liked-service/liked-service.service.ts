import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikedServiceService {
  private likedPlayers: Array<string> = [];

  constructor() { }
  getListOfLikedPlayers() {
    return this.likedPlayers;
  }
  addPlayer(name: string){
    this.likedPlayers.push(name);
    this.likedPlayers.sort((a: string,b: string) => +a-+b)
  }
}
