import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GameService } from './Services/game.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Apollo, gql } from 'apollo-angular';
import { ADD_GAME } from './graphql.operations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";

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
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TestComponent, FormsModule, RouterLink, HomeComponent, LayoutComponent]
})
export class AppComponent {
  // public gameInput: GamesInput = {
  //   id: 0,
  //   name: '',
  //   type: '',
  //   description: '',
  //   rating: 0,
  //   platform: '',
  //   age: 0,
  //   price: 0,
  //   label: '',
  // };



  public product:GamesInput = {
    id: 0,
    name: '',
    type: '',
    description: '',
    rating: 0,
    platform: '',
    age: 0,
    price: 0,
    label: ''
  };






  constructor(private gameService: GameService, private apollo: Apollo) {}
  addNewGame() {
    const requiredFields: (keyof GamesInput)[] = ['name', 'type', 'description', 'rating', 'platform', 'age', 'price', 'label'];

    for (const field of requiredFields) {
      if (!this.product[field]) {
        alert(`Please fill in the ${field} field.`);
        return; // Exit the function if validation fails
      }
    }


    const newGame = {
      id:0,
      name:this.product.name,
      type:this.product.type,
      description:this.product.description,
      rating:this.product.rating,
      platform:this.product.platform,
      age:this.product.age,
      price:this.product.price,
      label:this.product.label,
    };
         if(this.product === null){
                    return
         }
    this.gameService.addGame(newGame).subscribe((result) => {
      window.location.reload();
      // console.log('Game added with ID:', result.data.saveGame.id);
    });
  }
}
