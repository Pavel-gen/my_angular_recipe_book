import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { firstValueFrom } from 'rxjs'; // Не забудь импортировать
import { filter, last } from 'rxjs/operators';

import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { limitToLast } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private collectionName = 'recipes';
  private defaultImage =
    'https://plus.unsplash.com/premium_vector-1715358041136-0994d3290224?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  private pageSize = 5;
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);

  constructor(private firestore: Firestore) {}

  private lastDocMap: Map<number, any> = new Map();
  async getRecipes(page: number): Promise<Recipe[]> {
    const recipeCollection = collection(this.firestore, this.collectionName);

    let q;
    if (page === 1) {
      q = query(
        recipeCollection,
        orderBy('createdAt', 'desc'),
        limit(this.pageSize)
      );
    } else {
      const lastDoc = this.lastDocMap.get(page - 1);
      console.log(lastDoc.data().createdAt);
      q = query(
        recipeCollection,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc.data().createdAt),
        limit(this.pageSize)
      );
    }

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      this.lastDocMap.set(page, snapshot.docs[snapshot.docs.length - 1]);
    }
    const newRecipes = snapshot.docs.map((doc) => {
      const data = doc.data() as Recipe; // Преобразуем в unknown
      return { id: doc.id, ...data } as Recipe; // Затем кастуем к Recipe
    });

    if (page === 1) {
      this.recipesSubject.next(newRecipes); // Сбрасываем для первой страницы
    } else {
      const currentRecipes = this.recipesSubject.value;
      this.recipesSubject.next([...currentRecipes, ...newRecipes]); // Добавляем новые рецепты
    }

    return newRecipes;
  }

  // Получение общего количества страниц
  async getTotalPages(view: string, userId?: string): Promise<number> {
    const recipeCollection = collection(this.firestore, this.collectionName);

    let q;
    if (view === 'all') {
      q = query(recipeCollection);
    } else if (view === 'my' && userId) {
      q = query(recipeCollection, where('userId', '==', userId));
    } else {
      throw new Error('Invalid view or missing userId');
    }

    const snapshot = await getDocs(q);
    return Math.ceil(snapshot.size / this.pageSize);
  }

  // Получение конкретного рецепта по ID
  getRecipe(id: string): Recipe | undefined {
    console.log(this.recipesSubject.value.find((r) => r.id === id));
    return this.recipesSubject.value.find((r) => r.id === id);
  }

  // Добавление нового рецепта
  async addRecipe(recipe: Recipe): Promise<void> {
    recipe.createdAt = new Date().toISOString();
    recipe.updatedAt = new Date().toISOString();
    const numericId = Date.now(); // Возвращает количество миллисекунд с 1970 года
    recipe.id = numericId.toString();
    this.recipesSubject.value.push(recipe);
    const recipeCollection = collection(this.firestore, this.collectionName);
    await addDoc(recipeCollection, { ...recipe });
  }

  // Обновление существующего рецепта
  async updateRecipe(updatedRecipe: Recipe): Promise<void> {
    updatedRecipe.updatedAt = new Date().toISOString();

    const recipeRef = doc(
      this.firestore,
      `${this.collectionName}/${updatedRecipe.id}`
    );
    await updateDoc(recipeRef, { ...updatedRecipe });
    // this.loadRecipes();
  }

  // Удаление рецепта
  async deleteRecipe(id: string): Promise<void> {
    const recipeRef = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(recipeRef);
    // this.loadRecipes();
  }

  // Установка изображения по умолчанию
  setDefaultImage(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage;
  }

  // Получение рецептов по ID пользователя
  async getRecipesByUserId(userId: string, page: number): Promise<Recipe[]> {
    const recipeCollection = collection(this.firestore, this.collectionName);

    let q;
    if (page === 1) {
      q = query(
        recipeCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(this.pageSize)
      );
    } else {
      const lastDoc = this.lastDocMap.get(page - 1);
      if (!lastDoc) throw new Error('Previous page data not found for user');

      q = query(
        recipeCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc.data().createdAt),
        limit(this.pageSize)
      );
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) return [];

    // Сохраняем последний документ текущей страницы для пользователя
    if (!snapshot.empty) {
      this.lastDocMap.set(page, snapshot.docs[snapshot.docs.length - 1]);
    }
    const newRecipes = snapshot.docs.map((doc) => {
      const data = doc.data() as Recipe;
      return { id: doc.id, ...data } as Recipe;
    });

    if (page === 1) {
      this.recipesSubject.next(newRecipes); // Сбрасываем для первой страницы
    } else {
      const currentRecipes = this.recipesSubject.value;
      this.recipesSubject.next([...currentRecipes, ...newRecipes]); // Добавляем новые рецепты
    }
    return newRecipes;
  }

  // Дополнительный метод для фильтрации данных
  async filterRecipesByUser(userId: number): Promise<Recipe[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Recipe; // Преобразуем в unknown
      return { id: doc.id, ...data } as Recipe; // Затем кастуем к Recipe
    });
  }
}
