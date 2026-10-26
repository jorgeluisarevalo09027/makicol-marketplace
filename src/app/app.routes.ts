import { Routes } from '@angular/router';
import { ProposalComponent } from './features/proposal/proposal.component';

export const routes: Routes = [
  // La raíz carga el componente directamente, sin redirectTo: un redirect en la raíz combinado con
  // la hidratación SSR deja al router en un estado inconsistente.
  { path: '', component: ProposalComponent },
  { path: 'propuesta', component: ProposalComponent },
  // Investigación de envíos internacionales: fase futura, no ejecutada.
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
  // Diseño de base de datos para los 4 roles del marketplace.
  {
    path: 'base-de-datos',
    loadComponent: () =>
      import('./features/database-design/database-design.component').then(m => m.DatabaseDesignComponent),
  },
  // Reglas de diseño del contrato de API del demo; el contrato vigente es su Swagger.
  {
    path: 'contrato-api',
    loadComponent: () =>
      import('./features/api-contract/api-contract.component').then(m => m.ApiContractComponent),
  },
  { path: '**', redirectTo: '' },
];
