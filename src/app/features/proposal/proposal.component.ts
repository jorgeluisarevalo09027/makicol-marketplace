import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { FinancialComponent } from '../financial/financial.component';
import { TechnicalComponent } from '../technical/technical.component';
import { ArchitectureComponent } from '../architecture/architecture.component';

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, FinancialComponent, TechnicalComponent, ArchitectureComponent],
  template: `
    <app-navbar/>
    <main>
      <app-hero/>
      <app-financial/>
      <app-technical/>
      <app-architecture/>
    </main>
  `,
})
export class ProposalComponent {}
