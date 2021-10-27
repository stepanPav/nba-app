import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedComponent } from './liked/liked.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path: 'players', component: PlayersComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'favorites', component: LikedComponent},
  {path: 'player/:secondName/:firstName', component: PlayerComponent},
  {path: 'team/:acr', component:TeamInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
