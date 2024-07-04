import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending-games',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trending-games.component.html',
  styleUrl: './trending-games.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrendingGamesComponent {
  private gamesSubscription?: Subscription;
  games: any[] = [];
constructor( private gameservice: GameService, private cdr: ChangeDetectorRef){};


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
