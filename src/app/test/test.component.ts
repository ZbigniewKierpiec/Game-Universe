import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { NgFor, NgIf } from '@angular/common';
import { GameService } from '../Services/game.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgFor, NgIf],

  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  private gamesSubscription?: Subscription;
  games: any[] = [];
  error: any;

  constructor(
    private apollo: Apollo,
    private gameservice: GameService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  goToGameDetails(gameId: number): void {
    // Navigate to game details page using game ID
    this.router.navigate(['/game-details', gameId]);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  this.gamesSubscription   =  this.gameservice.getGames().subscribe((data) => {
      console.log(data);
      this.games = data;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {

    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
  }




}
