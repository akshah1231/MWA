import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




import { AppComponent } from './app.component';
import { NaviagationComponent } from './naviagation/naviagation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AddGameComponent } from './add-game/add-game.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    NaviagationComponent,
    FooterComponent,
    HomeComponent,
    GamesComponent,
    RegisterComponent,
    GameComponent,
    ErrorComponent,
    LoginComponent,
    AddGameComponent,
    EditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([{
      path:"",
      component:HomeComponent
    },
    {
      path:"games",
      component:GamesComponent
    },
    {
      path:"register",
      component:RegisterComponent
    },
    {
      path:"games/:gameId",
      component:GameComponent
    },
    {
      path:"games/update/:gameId",
      component:EditComponent
    },
    {
      path:"profile",
      component:ProfileComponent
    },
    {
      path:"**",
      component:ErrorComponent
    }
  ])
  ],
  providers: [{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
