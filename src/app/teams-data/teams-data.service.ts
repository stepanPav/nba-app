import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { Team } from '../types/team.type';
import {LOCAL_API_URL, PLAYERS_API_URL} from '../constants/index'



@Injectable({
  providedIn: 'root'
})
export class TeamsDataService {
  teamsList: Array<Team>=[];
  likedTeams: Array<string> = [];
  $likedTeams: AsyncSubject<Array<string>> = new AsyncSubject();
  isLoaded: boolean = false;
  constructor(private http: HttpClient) {
    this.http = http;
    http.get(`${LOCAL_API_URL}/teams`).subscribe(data=>{
      data = JSON.parse(JSON.parse(JSON.stringify(data))[0]['list']);
      this.$likedTeams.next(data as Array<string>);
      this.$likedTeams.complete();
    })
  }

  public getList(){
    let p = new BehaviorSubject({})
    this.http.get(`${PLAYERS_API_URL}/teams`)
    .subscribe((data) => {
      this.$likedTeams.subscribe(liked => {
        this.likedTeams = liked;
        this.teamsList = this.setLiked(data as Array<string>, liked);
        p.next(this.teamsList);
        
        this.isLoaded = true;
      })
      
    })
    return p;
  }


  public getTeam(name: string){
    this.http.get(`${PLAYERS_API_URL}/players-stats-teams/${name}`).subscribe(data => console.log(data));
  }


  private setLiked(teams: Array<string>, liked: Array<string>){
    teams = teams.sort((a,b) => {
      if(a > b)
        return 1;
      else if(a<b)
        return -1
      else
        return 0
      
    })
    let res: Array<Team> = [];
    let count = 0;
    teams.forEach((val)=>{
      let isLiked = false;
      if(val === liked[count]) {
        
        isLiked = true;
        if(count < liked.length-1)
          count++;
      }
      res.push({acr: val, "isLiked": isLiked})
    })
    return res;
  }


  public addTeam(name: string){
    console.log(this.likedTeams)
    this.likedTeams.push(name)
    console.log(this.likedTeams)
    this.likedTeams = this.likedTeams.sort((n1,n2) => {
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


  public removeTeam(name: string){
    const index = this.likedTeams.indexOf(name);
    if (index > -1) {
      this.likedTeams.splice(index, 1);
    }
    this.updateDataOnServer();
    return this.likedTeams;
  }


  private updateDataOnServer(){
    this.http.put(`${LOCAL_API_URL}/teams/1`, {list: JSON.stringify(this.likedTeams)}).subscribe()
  }
  
}
