import { createReducer, on } from '@ngrx/store';

import { HeroActions } from '../actions/hero.actions';
import { Hero } from '../../models/hero.model';

export interface HeroState {
  heroes: Hero[];
}

const initialState: HeroState = {
  heroes: []
};

export const heroReducer = createReducer(
  initialState,

  on(HeroActions.loadHeroesSuccess, (state, { heroes }) => ({
    ...initialState,
    heroes
  })),

  on(HeroActions.addHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: [hero, ...state.heroes]
  })),

  on(HeroActions.updateHeroSuccess, (state, { id, hero }) => ({
    ...state,
    heroes: state.heroes.map((h) => (h.id === id ? hero : h))
  })),

  on(HeroActions.deleteHeroSuccess, (state, { id }) => ({
    ...state,
    heroes: state.heroes.filter((h) => h.id !== id)
  }))
);
