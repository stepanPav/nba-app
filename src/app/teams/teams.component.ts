import { Component, OnInit } from '@angular/core';
import { TeamsDataService } from '../teams-data/teams-data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamsList: Array<any> = [];
  activeTeams: Array<any> = [];
  constructor(private _teamsData: TeamsDataService) { }

  ngOnInit(): void {
    this._teamsData.getList().subscribe(data => {
      let res: string = JSON.stringify(data);
      if(res !== '{}'){
        let tmp: Array<any> = JSON.parse(res); // в тмп списко игроков
        this.teamsList = tmp;
        this.activeTeams = this.teamsList.slice(0, 10);
        console.log(this.activeTeams);
      }
    });
  }

  onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activeTeams = this.teamsList.slice(firstCut, secondCut);
  }

}
