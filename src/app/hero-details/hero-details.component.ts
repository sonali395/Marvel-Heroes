import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Hero } from '../models/hero.model';
import { COLUMN_DEFINITIONS } from '../config/constants';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent {
  columnDefinitions = COLUMN_DEFINITIONS;

  constructor(@Inject(MAT_DIALOG_DATA) public hero: Hero) { }

  getHeroProperty(column: { columnDef: string }): any {
    return this.hero[column.columnDef as keyof Hero];
  }
}
