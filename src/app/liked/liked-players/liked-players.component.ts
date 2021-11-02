import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlayersDataService } from '../../players-data/players-data.service';
import { IPlayer } from '../../types/player.type';

@Component({
  selector: 'app-liked',
  templateUrl: './liked-players.component.html',
  styleUrls: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikedPlayersComponent implements OnInit {

  likedList: Array<IPlayer> = []
  isLoaded: boolean = false;
  constructor(private _playersData: PlayersDataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this._playersData.getList().length > 0) {
      this.likedList = this._playersData.getLikedList();
      this.isLoaded = true;
      this.cdr.detectChanges()
    }
    else {
      let tmp = 0;
      this._playersData.getListFromServer().subscribe(data => {
        tmp+=1;
        let res: Array<IPlayer> = this._playersData.getLikedList();
        if(res.length > 0) {
          this.likedList = res;
        }
        if(tmp > 1){
          this.cdr.markForCheck()
          this.isLoaded = true;
        }
      });
    }
  }

  public getURLFromName(name: string): string{
    return this._playersData.getURLFromName(name);
  }

  public getImg(item: IPlayer){
    return this._playersData.getImg(item);
  }

  public changeFavorite(player: IPlayer){
    player.is_liked = !player.is_liked;
    //console.log(this._playersData.getList()[2].name, this._playersData.getList()[2].isLiked);
    if(player.is_liked){
      this._playersData.addPlayer(player.name);
      this.likedList = this._playersData.getLikedList()
    }
    else{
      this._playersData.removePlayer(player.name);
      this.likedList = this._playersData.getLikedList()
    }

  }

}
