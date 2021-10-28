import { Component, OnInit } from '@angular/core';
import { PlayersDataService } from '../players-data/players-data.service';
import { IPlayer } from '../types/player.type';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['../app.component.css']
})
export class LikedComponent implements OnInit {

  likedList: Array<IPlayer> = []
  isLoaded: boolean = false;
  constructor(private _playersData: PlayersDataService) { }

  ngOnInit(): void {
    if(this._playersData.getList().length > 0) {
      this.likedList = this._playersData.getLikedList();
      this.isLoaded = true;
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
    this._playersData.changeFavorite(player)
  }

}
