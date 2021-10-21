import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService{
  playersList: any = null;
  constructor(private http: HttpClient) { }

  getList(){
    let p = new BehaviorSubject({})
    this.http.get("https://nba-players.herokuapp.com/players-stats")
    .subscribe((data) => {
      p.next(data as Array<Object>);
      this.playersList = data;
    })
    return p;
  }



}
