import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddGameComponent } from './add-game/add-game.component';
import { Component } from '@angular/core';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';
import { UpdateComponentComponent } from './update-component/update-component.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'view/game', component: TestComponent },
  { path: 'game-details/:id', component: GamesDetailComponent},
  {path:'game-update/:id',component:UpdateComponentComponent},
  { path: 'add/game', component: AddGameComponent },
  { path: '**', redirectTo: 'home' }, // Wildcard route for a 404 page or redirect to home
];
