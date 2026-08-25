import { Routes } from '@angular/router';
import { MarketplaceLayoutComponent } from './layout/marketplace-layout.component';

export const marketplaceRoutes: Routes = [
  {
    path: '',
    component: MarketplaceLayoutComponent,
    children: [
      { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
      {
        path: 'catalogo',
        loadComponent: () =>
          import('./pages/catalogo/catalogo.component').then(m => m.CatalogoComponent),
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('./pages/buscar/buscar.component').then(m => m.BuscarComponent),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./pages/registro/registro.component').then(m => m.RegistroComponent),
      },
      {
        path: 'pago',
        loadComponent: () =>
          import('./pages/pago/pago.component').then(m => m.PagoComponent),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/pedidos/pedidos.component').then(m => m.PedidosComponent),
      },
      {
        path: 'creadores',
        loadComponent: () =>
          import('./pages/creadores/creadores.component').then(m => m.CreadoresComponent),
      },
      {
        path: 'creadores/:id',
        loadComponent: () =>
          import('./pages/creador-detalle/creador-detalle.component').then(m => m.CreadorDetalleComponent),
      },
      {
        path: 'productos/:id',
        loadComponent: () =>
          import('./pages/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent),
      },
      {
        path: 'historias',
        loadComponent: () =>
          import('./pages/historias/historias.component').then(m => m.HistoriasComponent),
      },
      {
        path: 'sobre-maki',
        loadComponent: () =>
          import('./pages/sobre-maki/sobre-maki.component').then(m => m.SobreMakiComponent),
      },
      {
        path: 'terminos',
        loadComponent: () =>
          import('./pages/terminos/terminos.component').then(m => m.TerminosComponent),
      },
    ],
  },
];
