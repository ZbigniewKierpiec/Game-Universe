import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { GameService } from '../Services/game.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Game } from '../games-detail/games-detail.component';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-update-component',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './update-component.component.html',
  styleUrl: './update-component.component.scss',
})
export class UpdateComponentComponent {
  games?: Game;
  gameId?: any;
  editableGame: Game | null = null; // Initialize as null
  name?: string = '';
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private apollo: Apollo,
    private router: Router
  ) {}

  onUpdate() {
    const updateGameData: Game = {
      id: this.gameId,
      name: this.editableGame!.name,
      type: this.editableGame!.type,
      description: this.editableGame!.description,
      rating: this.editableGame!.rating,
      platform: this.editableGame!.platform,
      age: this.editableGame!.age,
      price: this.editableGame!.price,
      label: this.editableGame!.label,
    };

    this.name = this.editableGame?.name;

    this.gameService.updateGame(updateGameData).subscribe({
      next: (data) => {
        console.log('Muttation Success', data);

        this.router.navigate(['view/game']);
      },
      error: (error) => {
        console.error('Mutation error.', error);
        // Handle error response here
      },
    });

    console.log(this.games);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gameId = +params['id'];
      this.gameId = gameId;
      this.gameService.getGameById(this.gameId).subscribe((data) => {
        this.games = data;
        this.editableGame = { ...data };
      });
    });
  }
}
