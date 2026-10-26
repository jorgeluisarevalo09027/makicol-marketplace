import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { CostTableComponent } from './cost-table/cost-table.component';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [DecimalPipe, SectionHeaderComponent, CostTableComponent],
  template: `
    <section id="financiero" class="relative py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 section-primary-tint">

      <!-- Section background accent — warm artisanal gold glow -->
      <div class="absolute inset-0"
           style="background: radial-gradient(ellipse at 50% 0%, rgba(218,175,55,0.10) 0%, transparent 65%), radial-gradient(ellipse at 10% 90%, rgba(41,84,64,0.06) 0%, transparent 50%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="💰"
          iconBg="rgba(218,175,55,0.15)"
          badge="Módulo 01 — Financiero"
          title="Modelo Financiero del Marketplace"
          subtitle="El patrocinio es la primera fuente de financiación; el piloto arranca sin comisión. Costos estimados en USD/mes, pendientes de cotización."/>

        <!-- Info bar -->
        <div class="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-lg glass-card">
          <span class="text-2xl">📌</span>
          <p class="text-slate-300 text-sm">
            <span class="text-emerald-400 font-semibold">Modelo de patrocinio:</span>
            La financiación inicial se busca con patrocinadores institucionales y privados; <span class="text-white font-medium">aún no hay acuerdo ni carta de ningún patrocinador</span>.
            Otras entradas (comisión si un artesano adopta el modelo con cobro de la plataforma, suscripciones, destacados) son posibilidades, no el plan base.
          </p>
        </div>

        <!-- Users indicator shared between both panels -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <span class="text-slate-400 text-sm">Artesanos activos (escenario):</span>
          <span class="text-sky-400 font-bold text-xl font-mono">{{ sharedUsers() | number }}</span>
          <div class="flex gap-2">
            @for (preset of userPresets; track preset.value) {
              <button
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                [class]="sharedUsers() === preset.value
                  ? 'bg-sky-400 text-white shadow-md shadow-sky-400/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200'"
                (click)="sharedUsers.set(preset.value)">
                {{ preset.label }}
              </button>
            }
          </div>
        </div>

        <!-- Cost table -->
        <app-cost-table [users]="sharedUsers()"/>

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
    { label: 'Piloto · 50', value: 50 },
    { label: 'Crecimiento · 200', value: 200 },
    { label: 'Escala · 500', value: 500 },
    { label: 'Visión · 1,000', value: 1000 },
  ];

  insights = [
    {
      icon: '🤝',
      title: 'Patrocinio como primera fuente',
      text: 'Objetivo, no hecho: se buscarán entidades de cultura y fomento al emprendimiento. La propuesta anterior estimaba ~USD 1,800 el año 1, cifra sin sustento que solo cubriría infraestructura.'
    },
    {
      icon: '💳',
      title: 'La comisión es una posibilidad',
      text: 'Con cobro por pasarela, el costo de la pasarela absorbe cerca del 60 % de una comisión del 6 %. Por eso el piloto no cobra comisión y no se promete autofinanciación.'
    },
    {
      icon: '🧾',
      title: 'Costos únicos del piloto',
      text: 'Además de la infraestructura: migración de autenticación, módulo de envíos, asesoría legal y contrato de transporte. Rangos y supuestos en el análisis del plan de negocio.'
    },
  ];
}
