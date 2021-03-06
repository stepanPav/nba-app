import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeamsDataService } from 'src/app/teams-data/teams-data.service';
import { Team } from 'src/app/types/team.type';

@Component({
  selector: 'app-liked-teams',
  templateUrl: './liked-teams.component.html',
  styleUrls: ['./liked-teams.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikedTeamsComponent implements OnInit {

  likedList: Array<Team> = []
  isLoaded: boolean = false;
  constructor(private _teamsData: TeamsDataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    let tmp = 0;
    this._teamsData.getList().subscribe(data => {
        tmp+=1;
        let res: Array<Team> = this._teamsData.getLikedTeams();
        if(res.length > 0) {
            this.likedList = res;
            console.log(this.likedList)
        }
        if(tmp > 1){
            this.isLoaded = true;
            this.cdr.detectChanges()
        }
    });
    
  }

  public changeFavorite(team: Team){
    team.isLiked = !team.isLiked;
    if(team.isLiked)
        this._teamsData.addTeam(team.acr);
    else {
        this._teamsData.removeTeam(team.acr);
        this.likedList = this._teamsData.getLikedTeams();
    }
    
  }


}
