import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlayersDataService } from '../players-data/players-data.service';
import { IPlayer } from '../types/player.type';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDialog } from '../dialog-template/player-dialog/player-dialog.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit {
  playersList: Array<any> = [];
  activePlayers: Array<any> = [];
  isLoaded: Boolean = false;
  constructor(private _playersData: PlayersDataService, public dialog: MatDialog, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {

    if(this._playersData.getList().length > 0) {
      this.playersList = this._playersData.getList();
      this.activePlayers = this.playersList.slice(0, 10);
      this.isLoaded= true;
    }
    else {
      this._playersData.getListFromServer().subscribe(data => {
        let res: string = JSON.stringify(data);
        if(res !== '{}'){
          this.playersList = data as Array<IPlayer>;
          this.activePlayers = this.playersList.slice(0, 10);
          this.isLoaded= true;
          this.cdr.detectChanges();
          
        }
      });
    }
    
  }

  public onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePlayers = this.playersList.slice(firstCut, secondCut);
  }

  public getURLFromName(name: string): string{
    return this._playersData.getURLFromName(name);
  }

  public getImg(item: IPlayer){
    return this._playersData.getImg(item);
  }

  public changeFavorite(player: IPlayer){
    this._playersData.changeFavorite(player)
  }

  public playerInfo(player: IPlayer): void {
    const dialogRef = this.dialog.open(PlayerDialog, {
      width: '1100px',
      data: player
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  

}
