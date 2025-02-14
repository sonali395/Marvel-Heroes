import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private storageKey = 'heroes';
  private jsonFilePath = 'assets/wikipedia_marvel_data.json';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    const storedHeroes = localStorage.getItem(this.storageKey);

    if (storedHeroes) {
      return of(JSON.parse(storedHeroes));
    } else {
      return this.http.get<Hero[]>(this.jsonFilePath).pipe(
        map((heroes) => {
          const heroesWithId = this.addIdsToHeroes(heroes);
          this.saveHeroes(heroesWithId);
          return heroesWithId;
        })
      );
    }
  }

  private addIdsToHeroes(heroes: Hero[]): Hero[] {
    return heroes.map((hero, index) => ({ ...hero, id: `id-${Math.random().toString(36).substring(2, 10)}` }));
  }

  saveHeroes(heroes: Hero[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(heroes));
  }

  addHero(hero: Hero): Hero[] {
    const heroes = this.getFromLocalStorage();
    heroes.unshift(hero);
    this.saveHeroes(heroes);
    return heroes;
  }

  updateHero(id: string, updatedHero: Hero): Hero[] {
    let heroes = this.getFromLocalStorage();
    heroes = heroes.map((hero) => (hero.id === id ? updatedHero : hero));
    this.saveHeroes(heroes);
    return heroes;
  }

  deleteHero(id: string): Hero[] {
    const heroes = this.getFromLocalStorage().filter((hero) => hero.id !== id);
    this.saveHeroes(heroes);
    return heroes;
  }

  private getFromLocalStorage(): Hero[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}
