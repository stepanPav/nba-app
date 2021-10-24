import { Component, OnInit } from '@angular/core';
import { PlayersDataService } from '../players-data/players-data.service';

export interface IPlayer{
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
  isLiked: boolean;
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
    if(this._playersData.getList().length > 0) {
      this.playersList = this._playersData.getList();
      this.activePlayers = this.playersList.slice(0, 10);
    }
    else {
      this._playersData.getListFromServer().subscribe(data => {
        let res: string = JSON.stringify(data);
        if(res !== '{}'){
          this.playersList = data as Array<IPlayer>;
          this.activePlayers = this.playersList.slice(0, 10);
        }
      });
    }
    
  }

  onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePlayers = this.playersList.slice(firstCut, secondCut);
  }

  getURLFromName(name: string): string{
    let names =  name.split(' ');
    return names[1] + '/' +  names[0];
  }

  getImg(item: IPlayer){
    let names =  item.name.split(' ');
    return 'https://nba-players.herokuapp.com/players/' + names[1] + '/' +  names[0];
  }

  

}
