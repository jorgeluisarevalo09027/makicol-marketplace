import { Routes } from '@angular/router';
import { ProposalComponent } from './features/proposal/proposal.component';

export const routes: Routes = [
  { path: '', component: ProposalComponent },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./marketplace/marketplace.routes').then(m => m.marketplaceRoutes),
  },
  { path: '**', redirectTo: '' },
];
