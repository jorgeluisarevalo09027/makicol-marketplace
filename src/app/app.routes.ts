import { Routes } from '@angular/router';
import { ProposalComponent } from './features/proposal/proposal.component';

export const routes: Routes = [
  // La ruta inicial carga directamente el selector de flujo (sin redirectTo): un redirect en
  // la raíz combinado con la hidratación SSR deja al router en un estado inconsistente y hace
  // que, al navegar después a una ruta anidada con carga perezosa, la vista anterior no se
  // limpie del DOM y quede apilada junto a la nueva. Cargar el componente directamente aquí
  // evita ese doble procesamiento del redirect (uno en el servidor, otro al hidratar).
  {
    path: '',
    loadComponent: () =>
      import('./marketplace/pages/seleccionar-rol/seleccionar-rol.component').then(m => m.SeleccionarRolComponent),
  },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./marketplace/marketplace.routes').then(m => m.marketplaceRoutes),
  },
  // Propuesta ejecutiva: se mantiene disponible en su propia ruta, separada del prototipo.
  { path: 'propuesta', component: ProposalComponent },
  // Investigación y propuesta de envíos internacionales (piloto Zona Caribe).
  {
    path: 'envios-internacionales',
    loadComponent: () =>
      import('./features/international-shipping/international-shipping.component').then(m => m.InternationalShippingComponent),
  },
  // Evaluación de arquitectura: ¿separar Storefront (comprador/artesano) de Back-office (soporte/auditor)?
  {
    path: 'evaluacion-backoffice',
    loadComponent: () =>
      import('./features/backoffice-evaluation/backoffice-evaluation.component').then(m => m.BackofficeEvaluationComponent),
  },
  // Diseño de base de datos (trabajo en progreso) para los 4 roles del marketplace.
  {
    path: 'base-de-datos',
    loadComponent: () =>
      import('./features/database-design/database-design.component').then(m => m.DatabaseDesignComponent),
  },
  { path: '**', redirectTo: '' },
];
