import { Routes } from '@angular/router';
import { AuditorLayoutComponent } from './layout/auditor-layout.component';

export const auditorRoutes: Routes = [
  {
    path: '',
    component: AuditorLayoutComponent,
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      {
        path: 'resumen',
        loadComponent: () =>
          import('./pages/resumen/resumen.component').then(m => m.ResumenComponent),
      },
      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/ventas.component').then(m => m.VentasComponent),
      },
      {
        path: 'artesanos',
        loadComponent: () =>
          import('./pages/artesanos/artesanos.component').then(m => m.ArtesanosReporteComponent),
      },
      {
        path: 'compradores',
        loadComponent: () =>
          import('./pages/compradores/compradores.component').then(m => m.CompradoresReporteComponent),
      },
      {
        path: 'soporte',
        loadComponent: () =>
          import('./pages/soporte-reporte/soporte-reporte.component').then(m => m.SoporteReporteComponent),
      },
    ],
  },
];
