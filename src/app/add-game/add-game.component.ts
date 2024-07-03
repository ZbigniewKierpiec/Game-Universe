import { Component } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Apollo } from 'apollo-angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface GamesInput {
  id: number;
  name: string;
  type: string;
  description: string;
  rating: number;
  platform: string;
  age: number;
  price: number;
  label: string;
}

interface AddGameResponse {
  addGame: {
    id: number;
    name: string;
    label: string;
    price: number;
    description: string;
    type: string;
    platform: string;
  };
}

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss',
})
export class AddGameComponent {
  private addgamesSubscription?: Subscription;

  public product: GamesInput = {
    id: 0,
    name: '',
    type: '',
    description: '',
    rating: 0,
    platform: '',
    age: 0,
    price: 0,
    label: '',
  };

  constructor(
    private gameService: GameService,
    private apollo: Apollo,
    private router: Router
  ) {}
  addNewGame() {
    const requiredFields: (keyof GamesInput)[] = [
      'name',
      'type',
      'description',
      'rating',
      'platform',
      'age',
      'price',
      'label',
    ];

    for (const field of requiredFields) {
      if (!this.product[field]) {
        alert(`Please fill in the ${field} field.`);
        return; // Exit the function if validation fails
      }
    }

    const newGame = {
      id: 0,
      name: this.product.name,
      type: this.product.type,
      description: this.product.description,
      rating: this.product.rating,
      platform: this.product.platform,
      age: this.product.age,
      price: this.product.price,
      label: this.product.label,
    };
    if (this.product === null) {
      return;
    }
    this.addgamesSubscription = this.gameService.addGame(newGame).subscribe({
      next: (value) => {
        this.router.navigate(['view/game']);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.addgamesSubscription) {
      this.addgamesSubscription.unsubscribe();
    }
  }
}
