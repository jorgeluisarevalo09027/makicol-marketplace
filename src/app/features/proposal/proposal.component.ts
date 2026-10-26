import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { ProblemSolutionComponent } from '../problem-solution/problem-solution.component';
import { MarketComponent } from '../market/market.component';
import { TeamComponent } from '../team/team.component';
import { ProductComponent } from '../product/product.component';
import { BusinessModelComponent } from '../business-model/business-model.component';
import { OperationsComponent } from '../operations/operations.component';
import { RoadmapComponent } from '../roadmap/roadmap.component';
import { FinancialComponent } from '../financial/financial.component';
import { DeepDivesComponent } from '../deep-dives/deep-dives.component';

/**
 * Recorrido de la propuesta como plan de negocio (docs/plan-de-negocio/02 y 05).
 * Tres momentos: qué buscamos → qué tenemos hoy → a dónde vamos → detalles.
 */
@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [
    NavbarComponent, HeroComponent, ProblemSolutionComponent, MarketComponent, TeamComponent,
    ProductComponent, BusinessModelComponent, OperationsComponent, RoadmapComponent,
    FinancialComponent, DeepDivesComponent,
  ],
  template: `
    <app-navbar/>
    <main>
      <!-- Qué buscamos -->
      <app-hero/>              <!-- §1 resumen ejecutivo -->
      <app-problem-solution/> <!-- §2-§3 descripción, problema y solución -->
      <app-market/>           <!-- §4-§5 mercado y competencia -->
      <app-team/>             <!-- §10 equipo y aliados -->

      <!-- Qué tenemos hoy -->
      <app-product/>          <!-- §7 el demo construido -->

      <!-- A dónde vamos -->
      <app-business-model/>   <!-- §6 modelo de negocio -->
      <app-operations/>       <!-- §9 operaciones: pagos, envíos, identidad -->
      <app-roadmap/>          <!-- §8 crecimiento + §11 hitos y métricas -->
      <app-financial/>        <!-- §12 plan financiero -->

      <!-- Detalles profundos -->
      <app-deep-dives/>       <!-- §13 accesos a apéndices -->
    </main>
  `,
})
export class ProposalComponent {}
