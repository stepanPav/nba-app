import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { LikedPlayersComponent } from './liked/liked-players/liked-players.component';
import { LikedTeamsComponent } from './liked/liked-teams/liked-teams.component';
import { PlayersDataService } from './players-data/players-data.service';
import { PlayerComponent } from './player/player.component';
import { MaterialModule } from './material.module';
import { TeamInfoComponent } from './team-info/team-info.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from './dialog.module'
import { PlayerChangeDialog } from './dialog-template/player-info/player-change-dialog.component';
import { LogInComponent } from './authorization/log-in/log-in.component';
import { SingUpComponent } from './authorization/sing-up/sing-up.component';
import { LoginGuard } from './guards/login.guards';
import { TeamsDataService } from './teams-data/teams-data.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    TeamsComponent,
    LikedPlayersComponent,
    PlayerComponent,
    TeamInfoComponent,
    PlayerChangeDialog,
    LikedTeamsComponent,
    LogInComponent,
    SingUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    DialogModule

  ],
  providers: [PlayersDataService, TeamsDataService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
