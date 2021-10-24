import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlayer } from '../players/players.component';

@Injectable({
  providedIn: 'root'
})
export class TeamsDataService {
  playersList: any = null;
  constructor(private http: HttpClient) { }

  getList(){
    let p = new BehaviorSubject({})
    this.http.get("https://nba-players.herokuapp.com/teams")
    .subscribe((data) => {
      p.next(data as Array<Object>);
      this.playersList = data;
    })
    return p;
  }

  
  
}
