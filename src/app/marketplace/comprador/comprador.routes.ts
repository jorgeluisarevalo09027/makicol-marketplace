import { Routes } from '@angular/router';
import { CompradorLayoutComponent } from './layout/comprador-layout.component';

export const compradorRoutes: Routes = [
  {
    path: '',
    component: CompradorLayoutComponent,
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
        path: 'pago',
        loadComponent: () =>
          import('./pages/pago/pago.component').then(m => m.PagoComponent),
      },
      {
        path: 'mis-pedidos',
        loadComponent: () =>
          import('./pages/mis-pedidos/mis-pedidos.component').then(m => m.MisPedidosComponent),
      },
      {
        path: 'ayuda',
        loadComponent: () =>
          import('./pages/ayuda/ayuda.component').then(m => m.AyudaCompradorComponent),
      },
      {
        path: 'ayuda/nuevo',
        loadComponent: () =>
          import('./pages/ayuda-nuevo/ayuda-nuevo.component').then(m => m.AyudaNuevoCompradorComponent),
      },
      {
        path: 'mis-casos',
        loadComponent: () =>
          import('./pages/mis-casos/mis-casos.component').then(m => m.MisCasosCompradorComponent),
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
