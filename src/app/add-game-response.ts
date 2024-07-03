export interface AddGameResponse {
  addGame: {
    id: number;
    name: string;
    type: string;
    description: string;
    rating: number;
    platform: string;
    age: number;
    price: number;
    label: string;
  };
}
