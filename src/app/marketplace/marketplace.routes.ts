import { Routes } from '@angular/router';

export const marketplaceRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/seleccionar-rol/seleccionar-rol.component').then(m => m.SeleccionarRolComponent),
  },
  {
    path: 'comprador',
    loadChildren: () =>
      import('./comprador/comprador.routes').then(m => m.compradorRoutes),
  },
  {
    path: 'artesano',
    loadChildren: () =>
      import('./artesano/artesano.routes').then(m => m.artesanoRoutes),
  },
  {
    path: 'soporte',
    loadChildren: () =>
      import('./soporte/soporte.routes').then(m => m.soporteRoutes),
  },
  {
    path: 'auditor',
    loadChildren: () =>
      import('./auditor/auditor.routes').then(m => m.auditorRoutes),
  },
];
