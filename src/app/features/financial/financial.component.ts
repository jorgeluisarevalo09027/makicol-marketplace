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
        <div style="text-align:center; margin-bottom:1.5rem;">
          <span class="mk-eyebrow mk-eyebrow--target">A dónde vamos · Plan financiero</span>
        </div>
        <app-section-header
          icon="💰"
          iconBg="rgba(201,162,39,0.15)"
          badge="Plan financiero"
          title="Costos, financiación y valor del trabajo"
          subtitle="El patrocinio es la primera fuente de financiación; el piloto arranca sin comisión. Costos de infraestructura estimados en USD/mes, pendientes de cotización."/>

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
        <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
          <span class="text-slate-400 text-sm">Artesanos activos (escenario):</span>
          <span class="text-sky-400 font-bold text-xl font-mono">{{ sharedUsers() | number }}</span>
          <div class="flex flex-wrap gap-2 justify-center">
            @for (preset of userPresets; track preset.value) {
              <button
                class="px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
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

        <!-- ===== Valor del trabajo realizado ===== -->
        <div class="mt-16">
          <div class="flex flex-wrap items-center gap-3 mb-6">
            <span class="text-3xl">🧮</span>
            <div>
              <h3 class="text-white text-xl sm:text-2xl font-bold">Valor del trabajo realizado</h3>
              <p class="text-slate-400 text-sm">Valor de reposición del desarrollo acumulado (backend, frontend y propuesta).</p>
            </div>
          </div>

          <!-- Rango recomendado destacado -->
          <div class="glass-card rounded-xl p-6 sm:p-8 mb-8 text-center border border-amber-500/30"
               style="background: linear-gradient(135deg, rgba(218,175,55,0.12) 0%, rgba(41,84,64,0.10) 100%);">
            <div class="text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">Rango recomendado para la propuesta</div>
            <div class="text-amber-500 text-3xl sm:text-5xl font-bold font-mono mb-3">COP $50 – 95 millones</div>
            <div class="text-slate-300 text-sm sm:text-base">≈ USD 16 – 30 K · valor de reposición del desarrollo acumulado</div>
          </div>

          <!-- Triangulación de los 3 métodos -->
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <span class="text-xl">📐</span>
            <h4 class="text-white text-base sm:text-lg font-semibold">Triangulación por tres métodos</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            @for (metodo of metodos; track metodo.label) {
              <div class="glass-card rounded-xl p-4 sm:p-6 flex flex-col gap-2 hover:border-slate-600/60 transition-colors">
                <div class="flex items-center gap-2">
                  <span class="text-2xl flex-shrink-0">{{ metodo.icon }}</span>
                  <div class="text-sky-400 text-sm font-semibold">{{ metodo.label }}</div>
                </div>
                <div class="text-slate-400 text-xs leading-relaxed flex-1">{{ metodo.desc }}</div>
                <div class="text-white text-lg sm:text-xl font-bold font-mono mt-1">{{ metodo.rango }}</div>
              </div>
            }
          </div>

          <!-- Intersección ponderada destacada -->
          <div class="glass-card rounded-xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 border border-emerald-500/30"
               style="background: linear-gradient(135deg, rgba(41,84,64,0.14) 0%, rgba(218,175,55,0.08) 100%);">
            <div class="flex items-center gap-3">
              <span class="text-2xl flex-shrink-0">🎯</span>
              <div>
                <div class="text-emerald-400 text-sm font-semibold">Intersección ponderada</div>
                <div class="text-slate-400 text-xs">Donde convergen los tres métodos → rango recomendado</div>
              </div>
            </div>
            <div class="text-amber-500 text-xl sm:text-2xl font-bold font-mono">COP 50 – 95 M</div>
          </div>

          <!-- Inventario medido -->
          <div class="mt-8 mb-3 flex flex-wrap items-center gap-2">
            <span class="text-xl">📦</span>
            <h4 class="text-white text-base sm:text-lg font-semibold">Inventario medido (19-oct-2026)</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            @for (item of inventario; track item.title) {
              <div class="glass-card rounded-xl p-4 sm:p-6 flex flex-col gap-2 hover:border-slate-600/60 transition-colors">
                <div class="flex items-center gap-2">
                  <span class="text-2xl flex-shrink-0">{{ item.icon }}</span>
                  <div class="text-white text-sm font-semibold">{{ item.title }}</div>
                </div>
                <div class="text-slate-400 text-xs leading-relaxed">{{ item.text }}</div>
              </div>
            }
          </div>

          <!-- Disclaimer -->
          <div class="mt-8 flex flex-wrap items-start gap-3 p-4 sm:p-5 rounded-lg glass-card border border-slate-600/40">
            <span class="text-2xl flex-shrink-0">⚠️</span>
            <p class="text-slate-400 text-xs leading-relaxed flex-1">
              <span class="text-slate-200 font-semibold">Valor del trabajo ≠ valor del producto ni de la empresa:</span>
              es un piso de inversión acumulada (costo de reposición), no una valuación por múltiplos ni DCF.
              Las horas son equivalentes de mercado; el desarrollo real fue más rápido por asistencia de IA.
              Tarifas con fuentes públicas (consulta 19-oct-2026); TRM $3.174,67 COP/USD.
              Fuente: <span class="text-slate-300 font-mono">docs/valoracion-trabajo-realizado.md</span>.
            </p>
          </div>
        </div>
        <!-- ===== Fin: Valor del trabajo realizado ===== -->
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

  metodos = [
    {
      icon: '🧱',
      label: 'Método A — Reposición bottom-up',
      desc: 'Horas-equivalente × tarifa (caso base freelance senior).',
      rango: 'COP 44 – 90 M'
    },
    {
      icon: '👥',
      label: 'Método B — Costo de equipo empleado',
      desc: '3,3 – 4,5 meses-hombre senior + overhead de gestión.',
      rango: 'COP 36 – 85 M'
    },
    {
      icon: '🏢',
      label: 'Método C — Benchmark de agencia',
      desc: 'Lo que cobraría una agencia por este alcance con propuesta documentada.',
      rango: 'COP 70 – 140 M'
    },
  ];

  inventario = [
    {
      icon: '⚙️',
      title: 'Backend',
      text: '~10.600 LOC en C#, Clean Architecture en 4 capas, JWT, EF Core + Azure SQL, 4 migraciones, seeders idempotentes, CI.'
    },
    {
      icon: '🖥️',
      title: 'Frontend',
      text: 'Monorepo Nx con 43 proyectos, ~25.800 LOC, design system de 30 componentes Mk*, 159 archivos de tests, e2e Playwright, 4 roles + área pública.'
    },
    {
      icon: '📄',
      title: 'Propuesta',
      text: '~8.300 LOC Angular, simulador de costos, diseño de BD iterado, sitio navegable.'
    },
  ];
}
