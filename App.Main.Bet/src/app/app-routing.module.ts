import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetPageComponent } from './features/bet-page/bet-page.component';
import { StatisticsPageComponent } from './features/statistics-page/statistics-page.component';

const routes: Routes = [
  { path: 'bet', component: BetPageComponent },
  { path: 'stats', component: StatisticsPageComponent },
  { path: '', redirectTo: '/bet', pathMatch: 'full' },
  { path: '**', component: BetPageComponent }, // TODO: Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
