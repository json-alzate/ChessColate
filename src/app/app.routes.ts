import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
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
    path: 'positions960',
    loadComponent: () => import('./pages/positions960/positions960.page').then( m => m.Positions960Page)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  }
];
