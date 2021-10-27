import { Component, OnInit } from '@angular/core';
import { PlayersDataService } from '../players-data/players-data.service';
import { IPlayer } from '../players/players.component';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['..//app.component.css']
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
          console.log('baran')
          this.likedList = res;
        }
        if(tmp > 1){
          this.isLoaded = true;
        }
      });
    }
  }

  getURLFromName(name: string): string{
    let names =  name.split(' ');
    return names[1] + '/' +  names[0];
  }

  getImg(item: IPlayer){
    let names =  item.name.split(' ');
    return 'https://nba-players.herokuapp.com/players/' + names[1] + '/' +  names[0];
  }

  changeFavorite(player: IPlayer){
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
