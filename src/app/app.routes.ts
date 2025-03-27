import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'puzzles',
    loadComponent: () => import('./pages/puzzles/puzzles.page').then( m => m.PuzzlesPage)
  },
  {
    path: 'coordinates',
    loadComponent: () => import('./pages/coordinates/coordinates.page').then( m => m.CoordinatesPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage)
  },
  {
    path: '960',
    loadComponent: () => import('./pages/960/960.page').then( m => m.960Page)
  },
  {
    path: 'positions960',
    loadComponent: () => import('./pages/positions960/positions960.page').then( m => m.Positions960Page)
  },
];
