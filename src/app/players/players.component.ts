import { Component, OnInit } from '@angular/core';
import { PlayersDataService } from '../players-data/players-data.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

interface IPlayer{
  assists_per_game: number,
  blocks_per_game: number,
  defensive_rebounds_per_game: number,
  field_goal_percentage: number,
  field_goals_attempted_per_game: number,
  field_goals_made_per_game: number,
  free_throw_percentage: number,
  games_played: number,
  minutes_per_game: number,
  name: string,
  offensive_rebounds_per_game: number,
  player_efficiency_rating: number,
  points_per_game: number,
  rebounds_per_game: number,
  steals_per_game: number,
  team_acronym: string,
  team_name: string,
  three_point_attempted_per_game: number,
  three_point_made_per_game: number,
  three_point_percentage: number,
  turnovers_per_game: number,

}


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playersList: Array<any> = [];
  activePlayers: Array<any> = [];
  constructor(private _playersData: PlayersDataService) { }
  ngOnInit(): void {
    this._playersData.getList().subscribe(data => {
      let res: string = JSON.stringify(data);
      if(res !== '{}'){
        let tmp: Array<IPlayer> = JSON.parse(res); // в тмп списко игроков
        this.playersList = tmp;
        this.activePlayers = this.playersList.slice(0, 10);
        console.log(this.activePlayers);
      }
    });
  }

  onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePlayers = this.playersList.slice(firstCut, secondCut);
  }

  getImg(item: IPlayer){
    let names =  item.name.split(' ');
    return 'https://nba-players.herokuapp.com/players/' + names[1] + '/' +  names[0];
  }

}
