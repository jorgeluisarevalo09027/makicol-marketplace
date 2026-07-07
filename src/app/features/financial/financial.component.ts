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
          title="Modelo Financiero del Marketplace"
          subtitle="Infraestructura Azure + modelo de patrocinadores + ingresos por comisión. El marketplace es sostenible desde el primer año. Costos en USD/mes."/>

        <!-- Info bar -->
        <div class="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
          <span class="text-emerald-400 text-sm">📌</span>
          <p class="text-slate-300 text-sm">
            <span class="text-emerald-400 font-semibold">Modelo de patrocinio:</span>
            La infraestructura inicial es cubierta por patrocinadores institucionales (Unimagdalena, Ministerio de Cultura, Banco de la República).
            Los ingresos recurrentes provienen de <span class="text-white font-medium">comisiones del 5-8% por venta</span> realizada en la plataforma.
          </p>
        </div>

        <!-- Users indicator shared between both panels -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <span class="text-slate-400 text-sm">Productores activos:</span>
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
  sharedUsers = signal(200);

  userPresets = [
    { label: 'MVP · 50', value: 50 },
    { label: 'Fase 1 · 200', value: 200 },
    { label: 'Fase 2 · 500', value: 500 },
    { label: 'Fase 3 · 1,000', value: 1000 },
  ];

  insights = [
    {
      icon: '🤝',
      title: 'Patrocinadores clave',
      text: 'Unimagdalena, Ministerio de Cultura y Banco de la República cubren el costo inicial (~$1,800 USD año 1). El marketplace se autofinancia desde el mes 8 con comisiones.'
    },
    {
      icon: '�',
      title: 'Ingresos por comisión',
      text: 'Con 200 productores activos y un promedio de $50 USD en ventas mensuales por productor, la comisión del 6% genera ~$600 USD/mes, superando el costo operativo.'
    },
    {
      icon: '🎥',
      title: 'Videos cortos (Reels)',
      text: 'Azure Media Services permite publicar videos de 30s por $0.02/GB procesado. Con 200 reels de 10MB cada uno, el costo adicional es mínimo (~$4/mes).'
    },
  ];
}
