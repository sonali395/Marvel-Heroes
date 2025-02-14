import { createAction, props } from '@ngrx/store';
import { Hero } from '../../models/hero.model';

export class HeroActions {
  static readonly loadHeroes = createAction('[Hero] Load Heroes');
  static readonly loadHeroesSuccess = createAction(
    '[Hero] Load Heroes Success',
    props<{ heroes: Hero[] }>()
  );

  static readonly addHero = createAction('[Hero] Add Hero', props<{ hero: Hero }>());
  static readonly addHeroSuccess = createAction(
    '[Hero] Add Hero Success',
    props<{ hero: Hero }>()
  );

  static readonly updateHero = createAction(
    '[Hero] Edit Hero',
    props<{ id: string; hero: Hero }>()
  );
  static readonly updateHeroSuccess = createAction(
    '[Hero] Edit Hero Success',
    props<{ id: string; hero: Hero }>()
  );

  static readonly deleteHero = createAction(
    '[Hero] Delete Hero',
    props<{ id: string }>()
  );
  static readonly deleteHeroSuccess = createAction(
    '[Hero] Delete Hero Success',
    props<{ id: string }>()
  );
}

