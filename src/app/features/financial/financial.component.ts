import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { CostTableComponent } from './cost-table/cost-table.component';
import { CostSimulatorComponent } from './cost-simulator/cost-simulator.component';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [DecimalPipe, SectionHeaderComponent, CostTableComponent, CostSimulatorComponent],
  template: `
    <section id="financiero" class="relative py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16">

      <!-- Section background accent -->
      <div class="absolute inset-0 opacity-20"
           style="background: radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 60%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="💰"
          iconBg="rgba(16,185,129,0.15)"
          badge="Módulo 01 — Financiero"
          title="Análisis de Costos Azure"
          subtitle="Desglose detallado de la infraestructura cloud con simulador interactivo de escalabilidad. Todos los costos en USD/mes."/>

        <!-- Info bar -->
        <div class="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
          <span class="text-emerald-400 text-sm">📌</span>
          <p class="text-slate-300 text-sm">
            <span class="text-emerald-400 font-semibold">Nota:</span>
            Los costos son estimados según el calculador oficial de Azure (julio 2025) para la región
            <span class="text-white font-medium">East US</span>.
            Pueden variar según consumo real y descuentos de reserva.
          </p>
        </div>

        <!-- Users indicator shared between both panels -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <span class="text-slate-400 text-sm">Usuarios simulados:</span>
          <span class="text-sky-400 font-bold text-xl font-mono">{{ sharedUsers() | number }}</span>
          <div class="flex gap-2">
            @for (preset of userPresets; track preset.value) {
              <button
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                [class]="sharedUsers() === preset.value
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'"
                (click)="sharedUsers.set(preset.value)">
                {{ preset.label }}
              </button>
            }
          </div>
        </div>

        <!-- Main grid: cost table + simulator -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <app-cost-table [users]="sharedUsers()"/>
          <app-cost-simulator/>
        </div>

        <!-- Bottom insight cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          @for (insight of insights; track insight.title) {
            <div class="glass-card rounded-xl p-5 flex gap-4 items-start hover:border-slate-600/60 transition-colors">
              <span class="text-2xl flex-shrink-0">{{ insight.icon }}</span>
              <div>
                <div class="text-white text-sm font-semibold mb-1">{{ insight.title }}</div>
                <div class="text-slate-400 text-xs leading-relaxed">{{ insight.text }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
    <hr class="section-divider mx-auto max-w-4xl">
  `
})
export class FinancialComponent {
  sharedUsers = signal(300);

  userPresets = [
    { label: '300', value: 300 },
    { label: '1,000', value: 1000 },
    { label: '2,000', value: 2000 },
    { label: '5,000', value: 5000 },
  ];

  insights = [
    {
      icon: '💡',
      title: 'Costo por usuario',
      text: 'A 300 usuarios, el costo por usuario activo es de ~$0.43/mes. A 2,000 usuarios escala a ~$0.22/mes gracias a las economías de escala.'
    },
    {
      icon: '📉',
      title: 'Reservas de 1 año',
      text: 'Azure Reserved Instances para App Service y SQL pueden reducir los costos de cómputo hasta un 40% con un compromiso de 1 año.'
    },
    {
      icon: '🚀',
      title: 'Costo vs. alternativas',
      text: 'Una solución SaaS similar (Teachable, Thinkific) costaría entre $200-$500/mes con menos control. Azure ofrece mayor flexibilidad a menor costo.'
    },
  ];
}
