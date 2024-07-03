import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  ADD_GAME,
  DELETE_GAME,
  GET_GAMES,
  GET_GAME_BY_ID,
  UPDATE_GAME,
} from '../graphql.operations';
import { GamesInput } from '../games-input';

interface Game {
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
interface Game {
  id: number;
  name: string;
  // Add other fields as per your GraphQL schema
}

interface AddGameResponse {
  addGame: Game; // Ensure this matches your GraphQL schema
}

interface AddGameVariables {
  addGame: {
    name: string;
    // Add other fields as per your GraphQL mutation input
  };
}
interface QueryResult {
  gameById: Game; // Assuming you have a 'gameById' query returning a 'Game'
}
@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private apollo: Apollo) {}

  getGames(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_GAMES,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map((result: any) => result.data.allGames));
  }

  refetchGames() {
    return this.apollo
      .watchQuery({
        query: GET_GAMES,
      })
      .refetch();
  }

  getGameById(id: number): Observable<Game> {
    return this.apollo
      .query<QueryResult>({
        // Specify the type of data expected in query result
        query: GET_GAME_BY_ID,
        variables: {
          id: id,
        },
      })
      .pipe(map((result) => result.data.gameById));
  }

  addGame(newGame: { name: string }): Observable<Game> {
    return this.apollo
      .mutate<AddGameResponse, AddGameVariables>({
        mutation: ADD_GAME,
        variables: {
          addGame: newGame,
        },
      })
      .pipe(map((result) => result.data!.addGame));
  }

  updateGame(game: Game): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_GAME,
      variables: {
        updateGame: game,
      },
    });
  }

  deleteGame(id: number) {
    return this.apollo.mutate({
      mutation: DELETE_GAME,
      variables: {
        id: id,
      },
    });
  }
}
