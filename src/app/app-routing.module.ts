import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroTableComponent } from './hero-table/hero-table.component';

const routes: Routes = [
  { path: 'Home', component: HeroTableComponent },
  { path: '', component: HeroTableComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
