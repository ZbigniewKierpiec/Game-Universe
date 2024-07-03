import { gql } from 'apollo-angular';

const GET_GAMES = gql`
  query {
    allGames {
      id
      name
      label
      price
      description
      type
      platform
      rating
      age
    }
  }
`;

const GET_GAME_BY_ID = gql`
  query GetGameById($id: Int!) {
    gameById(id: $id) {
      id
      name
      label
      price
      description
      type
      platform
      rating
      age
    }
  }
`;

const ADD_GAME = gql`
  mutation ($addGame: GamesInput!) {
    saveGame(newGame: $addGame) {
      id
    }
  }
`;

const UPDATE_GAME = gql`
  mutation UpdateGame($updateGame: GamesInput!) {
    updateGame(updateGame: $updateGame) {
      id
      name
      label
      price
      description
      type
      platform
      rating
      age
    }
  }
`;

const DELETE_GAME = gql`
  mutation DeleteGame($id: Int!) {
    deleteGame(id: $id)
  }
`;

export { ADD_GAME };
export { GET_GAMES };
export { GET_GAME_BY_ID };
export { UPDATE_GAME };
export { DELETE_GAME };
