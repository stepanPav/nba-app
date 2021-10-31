import { Component, OnInit } from '@angular/core';
import { TeamsDataService } from '../teams-data/teams-data.service';
import { Team } from '../types/team.type';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamsList: Array<Team> = [];
  activeTeams: Array<Team> = [];
  constructor(private _teamsData: TeamsDataService) { }

  ngOnInit(): void {
    this._teamsData.getList().subscribe(data => {
      let res: string = JSON.stringify(data);
      if(res !== '{}'){
        let tmp: Array<Team> = JSON.parse(res); // в тмп списко игроков
        this.teamsList = tmp;
        this.activeTeams = this.teamsList.slice(0, 10);
      }
    });
  }

  public onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activeTeams = this.teamsList.slice(firstCut, secondCut);
  }

  public changeFavorite(team: Team){
    team.isLiked = !team.isLiked;
    if(team.isLiked)
      this._teamsData.addTeam(team.acr);
    else
      this._teamsData.removeTeam(team.acr);
  }
}
