import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../Services/game.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
export interface Game {
  id: number;
  name: string;
  label: string;
  price: number;
  description: string;
  type: string;
  platform: string;
  rating: number;
  age: number;
}
@Component({
  selector: 'app-games-detail',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf,    FontAwesomeModule ],
  templateUrl: './games-detail.component.html',
  styleUrl: './games-detail.component.scss',
})
export class GamesDetailComponent implements OnInit {
  game$!: Observable<Game>;
  gameId: any = null;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  update() {
    this.router.navigate(['/game-update', this.gameId]);
  }

  delete() {
    this.gameService.deleteGame(this.gameId).subscribe({
      next: (result) => {
        console.log('Game deleted successfully');

        this.router.navigate(['view/game']);
        // Optionally, you can handle any post-delete logic here
      },
      error: (error) => {
        console.error('Error deleting game:', error);
        // Handle error scenarios
      },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gameId = +params['id'];
      this.gameId = gameId;
      this.game$ = this.gameService.getGameById(this.gameId);
    });
  }
}
