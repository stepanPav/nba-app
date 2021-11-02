import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './authorization/log-in/log-in.component';
import { SingUpComponent } from './authorization/sing-up/sing-up.component';
import { LikedPlayersComponent } from './liked/liked-players/liked-players.component';
import { LikedTeamsComponent } from './liked/liked-teams/liked-teams.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamsComponent } from './teams/teams.component';
import { LoginGuard } from './guards/login.guards';
const routes: Routes = [
  
  {path: 'singup', component: SingUpComponent},
  {path: 'login', component: LogInComponent, canActivate: [LoginGuard]},
  {path: 'players', component: PlayersComponent, canActivate: [LoginGuard]},
  {path: 'teams', component: TeamsComponent, canActivate: [LoginGuard]},
  {path: 'favorites_players', component: LikedPlayersComponent, canActivate: [LoginGuard]},
  {path: 'favorites_teams', component: LikedTeamsComponent, canActivate: [LoginGuard]},
  {path: 'player/:secondName/:firstName', component: PlayerComponent, canActivate: [LoginGuard]},
  {path: 'team/:acr', component:TeamInfoComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
