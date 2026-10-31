import { Component, HostListener, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { CostTableComponent } from './cost-table/cost-table.component';

/** Fila de desglose de un método de valoración (horas, costos o tiers de agencia). */
interface MetodoFila {
  concepto: string;
  detalle: string;
  valor: string;
  destacado?: boolean;
}

/** Método de valoración del trabajo (A/B/C) con su detalle para el modal. */
interface Metodo {
  icon: string;
  label: string;
  desc: string;
  rango: string;
  titulo: string;
  idea: string;
  filas: MetodoFila[];
  escenarios: { label: string; valor: string }[];
  cierre: string;
}

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [DecimalPipe, SectionHeaderComponent, CostTableComponent],
  styles: [`
    /* Modal de detalle por método — tema claro del sitio (papel), coherente con mk-card/deep-dives.
       No usa las clases oscuras (glass-card/text-white/slate), que el CSS global remapea y rompen el contraste. */
    .mk-modal-overlay {
      position: fixed; inset: 0; z-index: 100;
      display: flex; justify-content: center; align-items: flex-end;
      background: rgba(28, 77, 54, 0.45); backdrop-filter: blur(2px);
      padding: 0; animation: fadeIn 0.2s ease-out;
    }
    .mk-modal-panel {
      background: var(--mk-surface);
      width: 100%; max-width: 640px; max-height: 92vh;
      display: flex; flex-direction: column;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -8px 40px rgba(35, 49, 42, 0.25);
      overflow: hidden;
    }
    .mk-modal-head {
      display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
      padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--mk-sand);
      background: var(--mk-paper-alt);
    }
    .mk-modal-close {
      flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%;
      background: var(--mk-surface); border: 1px solid var(--mk-sand);
      color: var(--mk-ink-soft); font-size: 1.1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, color 0.2s;
    }
    .mk-modal-close:hover { background: var(--mk-green-tint); color: var(--mk-green-deep); }
    .mk-modal-body { padding: 1.5rem; overflow-y: auto; }
    .mk-row {
      display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between;
      gap: 0.25rem 1rem; padding: 0.7rem 0.85rem; border-radius: 12px;
      background: var(--mk-paper); border: 1px solid var(--mk-sand);
    }
    .mk-row--total {
      background: var(--mk-green-tint); border-color: rgba(44, 115, 80, 0.3);
    }
    .mk-modal-cierre {
      display: flex; align-items: flex-start; gap: 0.5rem;
      padding: 0.85rem; border-radius: 12px;
      background: var(--mk-green-tint); border: 1px solid rgba(44, 115, 80, 0.25);
    }
    /* En tablet/desktop el modal se centra y es una tarjeta flotante. */
    @media (min-width: 640px) {
      .mk-modal-overlay { align-items: center; padding: 1.5rem; }
      .mk-modal-panel { border-radius: 20px; box-shadow: 0 12px 48px rgba(35, 49, 42, 0.3); }
    }
  `],
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
              <button type="button"
                      (click)="abrirMetodo(metodo)"
                      class="glass-card rounded-xl p-4 sm:p-6 flex flex-col gap-2 text-left w-full cursor-pointer hover:border-sky-500/50 hover:bg-slate-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                      [attr.aria-label]="'Ver detalle de ' + metodo.label">
                <div class="flex items-center gap-2">
                  <span class="text-2xl flex-shrink-0">{{ metodo.icon }}</span>
                  <div class="text-sky-400 text-sm font-semibold">{{ metodo.label }}</div>
                </div>
                <div class="text-slate-400 text-xs leading-relaxed flex-1">{{ metodo.desc }}</div>
                <div class="text-white text-lg sm:text-xl font-bold font-mono mt-1">{{ metodo.rango }}</div>
                <div class="text-sky-400 text-xs font-semibold mt-1 flex items-center gap-1">Ver el porqué <span aria-hidden="true">→</span></div>
              </button>
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

      <!-- ===== Modal de detalle por método ===== -->
      @if (metodoActivo(); as m) {
        <div class="mk-modal-overlay" (click)="cerrarMetodo()">
          <div class="mk-modal-panel" role="dialog" aria-modal="true" [attr.aria-label]="m.titulo"
               (click)="$event.stopPropagation()">

            <!-- Encabezado del modal: franja clara con el ícono y el título -->
            <div class="mk-modal-head">
              <div style="display:flex; align-items:center; gap:0.75rem; min-width:0;">
                <span style="font-size:2rem; flex-shrink:0;">{{ m.icon }}</span>
                <div style="min-width:0;">
                  <div style="color:var(--mk-green); font-size:0.72rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;">{{ m.label }}</div>
                  <h3 style="font-family:var(--font-brand); color:var(--mk-ink); font-weight:800; font-size:1.15rem; line-height:1.2; margin:0.15rem 0 0;">{{ m.titulo }}</h3>
                </div>
              </div>
              <button type="button" (click)="cerrarMetodo()" class="mk-modal-close" aria-label="Cerrar">✕</button>
            </div>

            <!-- Cuerpo con scroll -->
            <div class="mk-modal-body">
              <!-- Idea del método -->
              <p style="color:var(--mk-ink-soft); font-size:0.9rem; line-height:1.65; margin:0 0 1.25rem;">{{ m.idea }}</p>

              <!-- Desglose -->
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.25rem;">
                @for (fila of m.filas; track fila.concepto) {
                  <div class="mk-row" [class.mk-row--total]="fila.destacado">
                    <div style="flex:1 1 55%; min-width:0;">
                      <div style="font-size:0.9rem; font-weight:700;" [style.color]="fila.destacado ? 'var(--mk-green-deep)' : 'var(--mk-ink)'">{{ fila.concepto }}</div>
                      <div style="color:var(--mk-ink-soft); font-size:0.78rem; line-height:1.5;">{{ fila.detalle }}</div>
                    </div>
                    <div style="font-family:var(--font-body); font-weight:800; font-size:0.9rem; white-space:nowrap;"
                         [style.color]="fila.destacado ? 'var(--mk-green-deep)' : 'var(--mk-green)'">{{ fila.valor }}</div>
                  </div>
                }
              </div>

              <!-- Escenarios de tarifa (solo Método A) -->
              @if (m.escenarios.length) {
                <div style="margin-bottom:1.25rem;">
                  <div style="color:var(--mk-ink-faint); font-size:0.72rem; font-weight:800; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:0.5rem;">Valoración por escenario de tarifa</div>
                  <div style="display:flex; flex-direction:column; gap:0.4rem;">
                    @for (esc of m.escenarios; track esc.label) {
                      <div class="mk-row">
                        <span style="color:var(--mk-ink-soft); font-size:0.8rem;">{{ esc.label }}</span>
                        <span style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; white-space:nowrap;">{{ esc.valor }}</span>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Cierre: qué aporta a la triangulación -->
              <div class="mk-modal-cierre">
                <span style="font-size:1.1rem; flex-shrink:0;" aria-hidden="true">🎯</span>
                <p style="color:var(--mk-ink); font-size:0.82rem; line-height:1.55; margin:0;">{{ m.cierre }}</p>
              </div>

              <!-- Fuente -->
              <p style="color:var(--mk-ink-faint); font-size:0.72rem; margin:1rem 0 0;">
                Detalle en <span style="font-family:var(--font-body); color:var(--mk-ink-soft);">docs/valoracion-trabajo-realizado.md</span> §5. Tarifas con fuentes públicas (19-oct-2026).
              </p>
            </div>
          </div>
        </div>
      }
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

  metodos: Metodo[] = [
    {
      icon: '🧱',
      label: 'Método A — Reposición bottom-up',
      desc: 'Horas-equivalente × tarifa (caso base freelance senior).',
      rango: 'COP 44 – 90 M',
      titulo: 'Reposición bottom-up (horas-equivalente × tarifa)',
      idea: 'Se estiman las horas que un equipo senior tardaría en producir este alcance con este nivel de acabado, y se multiplican por la tarifa de mercado. No son horas cronometradas: son equivalentes de reposición.',
      // Horas-equivalente por componente (documento §5, Método A).
      filas: [
        { concepto: 'Backend', detalle: 'Dominio multi-rol, clean architecture, Azure (SQL, Blob), seguridad (JWT, rate limit), seeders, migraciones', valor: '160 – 220 h' },
        { concepto: 'Frontend', detalle: 'Monorepo con boundaries, 30 componentes de design system, 4 apps de rol + pública, 159 specs, e2e, temas', valor: '260 – 340 h' },
        { concepto: 'Propuesta / plan de negocio', detalle: 'Modelo financiero interactivo, diseño de BD iterado, sitio de propuesta, prototipo navegable', valor: '90 – 130 h' },
        { concepto: 'Specs / arquitectura / QA / DevOps', detalle: '~6.900 líneas de specs, docs de arquitectura, pipelines, evaluación de estado', valor: '40 – 60 h' },
        { concepto: 'Total', detalle: 'Suma de horas-equivalente del alcance', valor: '550 – 750 h', destacado: true },
      ],
      // Valoración por escenario de tarifa (documento §5, Método A).
      escenarios: [
        { label: 'Empleado senior ($55–95 K/h)', valor: 'COP 30 – 71 M' },
        { label: 'Freelance senior ($80–120 K/h)', valor: 'COP 44 – 90 M' },
        { label: 'Agencia ($100–160 K/h)', valor: 'COP 55 – 120 M' },
      ],
      cierre: 'El caso base para la triangulación es el freelance senior: COP 44 – 90 M.',
    },
    {
      icon: '👥',
      label: 'Método B — Costo de equipo empleado',
      desc: '3,3 – 4,5 meses-hombre senior + overhead de gestión.',
      rango: 'COP 36 – 85 M',
      titulo: 'Costo de equipo empleado',
      idea: 'Se traducen las 550 – 750 horas-equivalente a meses-hombre de un desarrollador senior en nómina, con el costo real para el empleador (salario + prestaciones y parafiscales).',
      filas: [
        { concepto: 'Esfuerzo', detalle: '550 – 750 h a jornada completa (~168 h/mes)', valor: '3,3 – 4,5 meses-hombre' },
        { concepto: 'Costo mensual empleador', detalle: 'Salario senior $7–12 M + 29–32 % de prestaciones/parafiscales', valor: 'COP 9 – 15,8 M/mes' },
        { concepto: 'Subtotal', detalle: 'Meses-hombre × costo mensual', valor: 'COP 30 – 71 M' },
        { concepto: 'Con overhead de gestión', detalle: 'Un equipo real de 2–3 personas tarda más calendario por coordinación: +~20 %', valor: 'COP 36 – 85 M', destacado: true },
      ],
      escenarios: [],
      cierre: 'Aporta el piso más conservador de la triangulación: COP 36 – 85 M.',
    },
    {
      icon: '🏢',
      label: 'Método C — Benchmark de agencia',
      desc: 'Lo que cobraría una agencia por este alcance con propuesta documentada.',
      rango: 'COP 70 – 140 M',
      titulo: 'Benchmark de mercado (qué cobra una agencia)',
      idea: 'Se compara el alcance contra lo que cobran las agencias colombianas por proyectos equivalentes, usando los tramos de precio publicados (Granweb, 2026).',
      filas: [
        { concepto: 'Tier "producto operativo"', detalle: 'Backend propio, roles, catálogo/pedidos/soporte', valor: 'COP 32 – 60 M' },
        { concepto: 'Tier "plataforma empresarial"', detalle: 'Mayor madurez técnica (design system, tests, Azure)', valor: 'COP 72 – 140 M+' },
        { concepto: 'Posición de Makicol', detalle: 'Por madurez técnica queda en la zona alta del rango', valor: 'COP 60 – 120 M' },
        { concepto: 'Con propuesta de negocio', detalle: 'Suma el plan financiero, ER y contrato de API documentados', valor: 'COP 70 – 140 M', destacado: true },
      ],
      escenarios: [],
      cierre: 'Marca el techo de la triangulación: COP 70 – 140 M.',
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

  /** Método cuyo modal de detalle está abierto; null = sin modal. */
  metodoActivo = signal<Metodo | null>(null);

  abrirMetodo(metodo: Metodo): void {
    this.metodoActivo.set(metodo);
  }

  cerrarMetodo(): void {
    this.metodoActivo.set(null);
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    this.cerrarMetodo();
  }
}
