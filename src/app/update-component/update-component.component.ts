import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  name?:string='';
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private apollo: Apollo
  ) {}

  onUpdate() {
    const updateGameData:Game = {
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

    this.name = this.editableGame?.name
//  const updateGameData = {
//       id:this.gameId,
//       name: 'Red Dead Redemption 2',
//       type:'Action-Adventure, Open World',
//       description:'An action-adventure game set in the American Wild West, following outlaw Arthur Morgan and the Van der Linde gang as they rob, steal, and fight across the frontier.',
//       rating:9,
//       platform: 'PC, Xbox, PlayStation.',
//       age: 17,
//       price:49.99,
//       label:'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png',
//     };

    this.gameService.updateGame(updateGameData).subscribe({
      next: (data) => {
        console.log('Muttation Success', data);
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
