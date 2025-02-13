export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}
export interface User {
  id?: string;
  email: string;
  password?: string;
  createdAt?: Date;
}
export interface Recipe {
  id?: string;
  title: string;
  image: string;
  ingredients: Ingredient[];
  preparationTime: number;
  description: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  userId: User['id'];
}
