import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './features/hero/hero.component';
import { FinancialComponent } from './features/financial/financial.component';
import { TechnicalComponent } from './features/technical/technical.component';
import { ArchitectureComponent } from './features/architecture/architecture.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    FinancialComponent,
    TechnicalComponent,
    ArchitectureComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
