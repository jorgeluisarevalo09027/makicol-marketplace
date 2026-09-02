import { Routes } from '@angular/router';
import { SoporteLayoutComponent } from './layout/soporte-layout.component';

export const soporteRoutes: Routes = [
  {
    path: '',
    component: SoporteLayoutComponent,
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      {
        path: 'panel',
        loadComponent: () =>
          import('./pages/panel/panel.component').then(m => m.SoportePanelComponent),
      },
      {
        path: 'casos',
        loadComponent: () =>
          import('./pages/casos/casos.component').then(m => m.CasosComponent),
      },
      {
        path: 'casos/:id',
        loadComponent: () =>
          import('./pages/caso-detalle/caso-detalle.component').then(m => m.CasoDetalleComponent),
      },
    ],
  },
];
