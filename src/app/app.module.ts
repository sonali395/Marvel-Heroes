import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';


import { AppComponent } from './app.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from './services/hero.service';
import { HeroTableComponent } from './hero-table/hero-table.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { heroReducer } from './store/reducers/hero.reducer';
import { HeroEffects } from './store/effects/hero.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartService } from './services/chart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroTableComponent,
    HeroFormComponent,
    HeroDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({ heroes: heroReducer }),
    EffectsModule.forRoot([HeroEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HeroService,
    ChartService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
