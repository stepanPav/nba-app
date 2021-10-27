import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersDataService } from '../players-data/players-data.service';
import { IPlayer } from '../players/players.component';
import { TeamsDataService } from '../teams-data/teams-data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './team-info.component.html',
  styleUrls: ['../players/players.component.css']
})
export class TeamInfoComponent implements OnInit {
  listOfPlayers: Array<IPlayer> = [];
  activePlayerOfTeam: Array<IPlayer> = [];
  isLoaded: boolean = false;
  curTeam: string = '';
  constructor(private router: Router, private _teamsData: TeamsDataService, private _playersData: PlayersDataService) { }

  ngOnInit(): void {
    this.curTeam = this.router.url.split('/')[2];
    console.log(this.curTeam)
    if(this._playersData.getList().length > 0) {
        console.log()
        this.listOfPlayers = this._playersData.getPlayersFromTeam(this.curTeam)
        this.activePlayerOfTeam = this.listOfPlayers.slice(0, 10);
        this.isLoaded= true;
      }
      else {
        this._playersData.getListFromServer().subscribe(data => {
          let res: string = JSON.stringify(data);
          if(res !== '{}'){
            this.isLoaded = true;
            this.listOfPlayers = this._playersData.getPlayersFromTeam(this.curTeam);
            this.activePlayerOfTeam = this.listOfPlayers.slice(0, 10);
            this.isLoaded= true;
          }
        });
      }
    
  }

  onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePlayerOfTeam = this.listOfPlayers.slice(firstCut, secondCut);
  }

  getURLFromName(name: string): string{
    return this._playersData.getURLFromName(name);
  }

  getImg(item: IPlayer){
    return this._playersData.getImg(item);
    
  }

  changeFavorite(player: IPlayer){
    this._playersData.changeFavorite(player)
  }

}
