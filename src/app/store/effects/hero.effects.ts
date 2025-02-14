import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { HeroService } from '../../services/hero.service';
import { HeroActions } from '../actions/hero.actions';

@Injectable()
export class HeroEffects {
  constructor(private readonly actions$: Actions, private heroService: HeroService, private store: Store) { }

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.loadHeroes),
      mergeMap(() =>
        this.heroService.getHeroes().pipe(
          map((heroes) => HeroActions.loadHeroesSuccess({ heroes }))
        )
      )
    )
  );

  addHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.addHero),
      map(({ hero }) => {
        this.heroService.addHero(hero);
        return HeroActions.addHeroSuccess({ hero });
      })
    )
  );

  editHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.updateHero),
      map(({ id, hero }) => {
        this.heroService.updateHero(id, hero);
        return HeroActions.updateHeroSuccess({ id, hero });
      })
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.deleteHero),
      map(({ id }) => {
        this.heroService.deleteHero(id);
        return HeroActions.deleteHeroSuccess({ id });
      })
    )
  );
}
