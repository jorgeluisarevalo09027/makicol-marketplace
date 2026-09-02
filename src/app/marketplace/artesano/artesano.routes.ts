import { Routes } from '@angular/router';
import { ArtesanoLayoutComponent } from './layout/artesano-layout.component';

export const artesanoRoutes: Routes = [
  {
    path: '',
    component: ArtesanoLayoutComponent,
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      {
        path: 'panel',
        loadComponent: () =>
          import('./pages/panel/panel.component').then(m => m.PanelComponent),
      },
      {
        path: 'mis-productos',
        loadComponent: () =>
          import('./pages/mis-productos/mis-productos.component').then(m => m.MisProductosComponent),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./pages/registro/registro.component').then(m => m.RegistroComponent),
      },
      {
        path: 'ayuda',
        loadComponent: () =>
          import('./pages/ayuda/ayuda.component').then(m => m.AyudaArtesanoComponent),
      },
      {
        path: 'ayuda/nuevo',
        loadComponent: () =>
          import('./pages/ayuda-nuevo/ayuda-nuevo.component').then(m => m.AyudaNuevoArtesanoComponent),
      },
      {
        path: 'mis-casos',
        loadComponent: () =>
          import('./pages/mis-casos/mis-casos.component').then(m => m.MisCasosArtesanoComponent),
      },
    ],
  },
];
