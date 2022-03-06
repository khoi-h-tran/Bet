import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { BetPageComponent } from './features/bet-page/bet-page.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { StatisticsPageComponent } from './features/statistics-page/statistics-page.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'bet', component: BetPageComponent },
  { path: 'stats', component: StatisticsPageComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }, // TODO: Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
