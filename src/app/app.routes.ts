import { RouterModule, Routes } from '@angular/router';
import { Portfolio } from './pages/portfolio/portfolio';

export const routes: Routes = [
  { path: 'portfolio', component: Portfolio },
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
];
