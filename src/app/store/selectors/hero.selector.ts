import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HeroState } from '../reducers/hero.reducer';

export const selectHeroState = createFeatureSelector<HeroState>('heroes');

export const selectAllHeroes = createSelector(
  selectHeroState,
  (state: HeroState) => state.heroes
);

export const selectHeroById = (id: string) =>
  createSelector(selectHeroState, (state: HeroState) =>
    state.heroes.find(hero => hero.id === id)
  );

export const selectHeroesByName = (name: string) =>
  createSelector(selectHeroState, (state: HeroState) =>
    state.heroes.filter(hero => hero.nameLabel.includes(name))
  );
