import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersDataService } from '../players-data/players-data.service';
import { IPlayer } from '../players/players.component';




@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styles: [
  ]
})
export class PlayerComponent implements OnInit {
  href: string = "";
  names!: Array<string>;
  playerStat!: IPlayer;
  constructor(private router: Router, private _playersData: PlayersDataService) {}

  ngOnInit(): void {
    this.href = this.router.url;
    let tmp = this.href.split('/');
    this.names = [tmp[2], tmp[3]]
    //console.log(this.names)
    if(this._playersData.playersList.length === 0){
      this._playersData.getListFromServer().subscribe(data => {
        if(this._playersData.playersList.length > 0) {
          let player = this._playersData.getPlayer(this.names[1] + ' ' + this.names[0]);
          if(player)
            this.playerStat = player;
        }
      });
    }
    else{
      let player = this._playersData.getPlayer(this.names[1] + ' ' + this.names[0]);
      if(player)
        this.playerStat = player;
      
    }
    
  }

}
