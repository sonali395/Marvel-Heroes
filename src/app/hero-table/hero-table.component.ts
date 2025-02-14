import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSort } from '@angular/material/sort';

import { Hero } from '../models/hero.model';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { COLUMN_DEFINITIONS } from '../config/constants';
import { HeroActions } from '../store/actions/hero.actions';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../store/selectors/hero.selector';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})

export class HeroTableComponent implements OnInit, AfterViewInit {
  columnDefinitions = COLUMN_DEFINITIONS;
  displayedColumns: string[] = [];
  heroes: Hero[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource(this.heroes);
  filteredData: Hero[] = [];
  filterChips: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private chartService: ChartService, public dialog: MatDialog, private readonly store: Store, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.dispatch(HeroActions.loadHeroes());
    this.store.select(selectAllHeroes).subscribe(data => {
      this.heroes = data;
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.sort = this.sort;
      this.filteredData = this.heroes;
      this.displayedColumns = [...this.columnDefinitions.map(col => col.columnDef), 'edit', 'delete'];
      this.createChartsForColumns();
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
    this.createChartsForColumns();
  }

  createChartsForColumns() {
    this.displayedColumns.forEach((column) => {
      if (column !== 'edit' && column !== 'delete' && column !== 'nameLabel') {
        const values = this.heroes.map((hero: any) => hero[column].toLowerCase());
        const distinctValues = Array.from(new Set(values));
        const valueCounts = this.countValues(values);
        if (distinctValues.length <= 5) {
          this.chartService.createPieChart(column, distinctValues, valueCounts);
        } else {
          this.chartService.createBarChart(column, distinctValues, valueCounts);
        }
      }
    });
  }

  addChip(event: any): void {
    const inputValue = event.value?.trim();
    if (inputValue && !this.filterChips.includes(inputValue)) {
      this.filterChips.push(inputValue);
      this.applyFilter();
    }
    event.chipInput!.clear();
  }

  removeChip(chip: string): void {
    const index = this.filterChips.indexOf(chip);
    if (index >= 0) {
      this.filterChips.splice(index, 1);
      this.applyFilter();
    }
  }

  openCreateEditForm(hero?: Hero): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '35vw',
      data: hero ? hero : null
    });
  }

  applyFilter(): void {
    this.filteredData = this.filterChips.length > 0
      ? this.heroes.filter(hero => this.filterChips.some(keyword => hero.nameLabel.toLowerCase().includes(keyword.toLowerCase())))
      : this.heroes;
    this.dataSource.data = this.filteredData;
  }

  openHeroDetails(hero: Hero): void {
    this.dialog.open(HeroDetailsComponent, {
      width: '30vw',
      data: hero
    });
  }

  deleteHero(hero: Hero): void {
    this.store.dispatch(HeroActions.deleteHero({ id: hero.id }))
  }

  countValues(values: number[]): { [key: number]: number } {
    const counts: { [key: number]: number } = {};
    values.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  }
}
