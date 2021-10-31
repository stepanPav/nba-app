import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersDataService } from '../players-data/players-data.service';
import { IPlayer } from '../types/player.type';
import { MatDialog } from '@angular/material/dialog';
import { PlayerChangeDialog } from '../dialog-template/player-info/player-change-dialog.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: []
})
export class PlayerComponent implements OnInit {
  href: string = "";
  names!: Array<string>;
  playerStat!: IPlayer;
  isLoaded= false;
  constructor(private router: Router, private _playersData: PlayersDataService, public dialog: MatDialog) {}
  
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
        this.isLoaded = true;
      });
      
    }
    else{
      let player = this._playersData.getPlayer(this.names[1] + ' ' + this.names[0]);
      if(player){
        this.playerStat = player;
        this.isLoaded = true;
      }
      
    }
    
  }

  changeFavorite(item: IPlayer){
    this._playersData.changeFavorite(item);
  }
  

  public playerChangeInfo(player: IPlayer): void {
    const dialogRef = this.dialog.open(PlayerChangeDialog, {
      width: '1100px',
      data: Object.assign({}, player)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.playerStat=result;
        this._playersData.changePlayerInfo(result);
        this._playersData.addChangedPlayer(this.playerStat);
        
      }
    });
  }

}
