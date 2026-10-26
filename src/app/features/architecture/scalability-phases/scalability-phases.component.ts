import { Component, signal } from '@angular/core';

interface Phase {
  id: number;
  label: string;
  title: string;
  timeline: string;
  status: 'current' | 'planned' | 'future';
  icon: string;
  color: string;
  bg: string;
  border: string;
  description: string;
  features: { icon: string; name: string; detail: string }[];
  services: { name: string; tier: string }[];
  estimatedCost: string;
  triggerCondition: string;
}

@Component({
  selector: 'app-scalability-phases',
  standalone: true,
  template: `
    <div class="glass-card rounded-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-slate-700/50">
        <h3 class="text-white font-bold text-lg">Ruta de crecimiento</h3>
        <p class="text-slate-400 text-sm mt-0.5">Solo el piloto está definido; las fases siguientes son posibilidades sin fecha ni compromiso</p>
      </div>

      <!-- Phase selector tabs -->
      <div class="flex border-b border-slate-700/50 overflow-x-auto">
        @for (phase of phases; track phase.id) {
          <button
            class="flex-1 min-w-[160px] px-5 py-4 text-center transition-all duration-200 relative"
            [class.border-b-2]="activePhase() === phase.id"
            [style.borderBottomColor]="activePhase() === phase.id ? phase.color : 'transparent'"
            [style.background]="activePhase() === phase.id ? phase.bg : 'transparent'"
            (click)="activePhase.set(phase.id)">
            <div class="text-2xl mb-1.5">{{ phase.icon }}</div>
            <div class="text-xs font-bold"
                 [class]="activePhase() === phase.id ? 'text-white' : 'text-slate-500'">
              {{ phase.label }}
            </div>
            <div class="text-[10px] mt-0.5" [style.color]="phase.color">{{ phase.timeline }}</div>
            @if (phase.status === 'current') {
              <span class="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            }
          </button>
        }
      </div>

      <!-- Active phase detail -->
      @for (phase of phases; track phase.id) {
        @if (activePhase() === phase.id) {
          <div class="p-6 animate-fade-in">
            <!-- Phase header -->
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-3xl">{{ phase.icon }}</span>
                  <div>
                    <h4 class="text-white font-bold text-xl">{{ phase.title }}</h4>
                    <span class="text-xs font-medium px-2 py-0.5 rounded-full"
                          [style.color]="phase.color"
                          [style.background]="phase.bg"
                          [style.border]="'1px solid ' + phase.border">
                      {{ phase.label }} — {{ phase.timeline }}
                    </span>
                  </div>
                </div>
                <p class="text-slate-400 text-sm leading-relaxed max-w-2xl">{{ phase.description }}</p>
              </div>
              <div class="text-center sm:text-right flex-shrink-0">
                <div class="text-xs text-slate-500 uppercase tracking-wider mb-1">Costo Estimado</div>
                <div class="text-2xl font-bold font-mono" [style.color]="phase.color">{{ phase.estimatedCost }}</div>
                <div class="text-slate-500 text-xs">USD / mes (infraestructura)</div>
              </div>
            </div>

            <!-- Trigger condition -->
            <div class="mb-6 p-3 rounded-lg border flex items-start gap-3"
                 [style.background]="phase.bg"
                 [style.borderColor]="phase.border">
              <span class="text-base mt-0.5">🎯</span>
              <p class="text-sm" [style.color]="phase.color">
                <span class="font-semibold">Condición de activación:</span>
                <span class="text-slate-300"> {{ phase.triggerCondition }}</span>
              </p>
            </div>

            <!-- Features grid -->
            <div class="mb-6">
              <h5 class="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Funcionalidades de la Fase</h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (feature of phase.features; track feature.name) {
                  <div class="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60 transition-colors">
                    <span class="text-xl flex-shrink-0">{{ feature.icon }}</span>
                    <div>
                      <div class="text-white text-sm font-medium mb-0.5">{{ feature.name }}</div>
                      <div class="text-slate-500 text-xs leading-relaxed">{{ feature.detail }}</div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Services for this phase -->
            <div>
              <h5 class="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Servicios</h5>
              <div class="flex flex-wrap gap-2">
                @for (service of phase.services; track service.name) {
                  <div class="flex items-center gap-2 px-3 py-2 rounded-lg border"
                       [style.background]="phase.bg"
                       [style.borderColor]="phase.border">
                    <span class="text-[10px] font-bold uppercase tracking-wider" [style.color]="phase.color">{{ service.tier }}</span>
                    <span class="text-white text-xs font-medium">{{ service.name }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      }

      <!-- Phase timeline connector (bottom) -->
      <div class="px-6 pb-6">
        <div class="flex items-center gap-0">
          @for (phase of phases; track phase.id; let last = $last) {
            <div class="flex-1 flex items-center">
              <div class="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-300"
                   [style.borderColor]="phase.color"
                   [style.background]="activePhase() >= phase.id ? phase.color : 'transparent'">
              </div>
              @if (!last) {
                <div class="flex-1 h-0.5 transition-all duration-300"
                     [style.background]="activePhase() > phase.id ? 'linear-gradient(90deg, ' + phase.color + ', ' + phases[phase.id].color + ')' : '#334155'">
                </div>
              }
            </div>
          }
        </div>
        <div class="flex mt-2">
          @for (phase of phases; track phase.id) {
            <div class="flex-1 text-[10px] text-slate-500 font-medium">{{ phase.label }}</div>
          }
        </div>
      </div>
    </div>
  `
})
export class ScalabilityPhasesComponent {
  activePhase = signal(1);

  phases: Phase[] = [
    {
      id: 1,
      label: 'Fase 1 — Piloto',
      title: 'Catálogo y pedidos coordinados',
      timeline: 'Fecha por definir',
      status: 'current',
      icon: '🚀',
      color: '#38bdf8',
      bg: 'rgba(14,165,233,0.06)',
      border: 'rgba(14,165,233,0.25)',
      description: 'El demo ya cubre catálogo, carrito, pedidos por artesano, soporte y auditoría. El piloto añade autenticación con un proveedor externo (MFA para soporte y auditor) y un módulo de envíos con Servientrega. El pago es directo entre comprador y artesano, sin comisión de la plataforma.',
      triggerCondition: 'Patrocinio confirmado, migración de autenticación terminada, cotización y contrato de transporte, y asesoría legal para Términos y datos personales.',
      estimatedCost: '$124–$253',
      features: [
        { icon: '🔐', name: 'Registro de Artesanos', detail: 'Alta con perfil público; soporte verifica a cada artesano antes de publicar.' },
        { icon: '🎨', name: 'Catálogo de Productos', detail: 'Productos con fotos, precio, stock y región.' },
        { icon: '📦', name: 'Pedidos por Artesano', detail: 'El carrito se divide en un pedido por artesano; comprador y artesano gestionan el estado.' },
        { icon: '🚚', name: 'Envíos con Servientrega', detail: 'Guía imprimible y rastreo (propuesto; sin contrato ni cotización todavía).' },
        { icon: '🛡️', name: 'Autenticación con MFA', detail: 'Proveedor externo propuesto (Auth0); MFA obligatorio para soporte y auditor.' },
        { icon: '📊', name: 'Soporte y Auditoría', detail: 'Casos de ayuda, verificaciones, historias editoriales e informes (existen en el demo).' },
      ],
      services: [
        { name: 'App Service', tier: 'COMPUTE' },
        { name: 'SQL Database', tier: 'DATA' },
        { name: 'Blob Storage (por verificar)', tier: 'STORAGE' },
        { name: 'Auth0 (propuesto)', tier: 'IDENTIDAD' },
        { name: 'Servientrega (sin contrato)', tier: 'ENVÍOS' },
      ]
    },
    {
      id: 2,
      label: 'Fase 2 — Posibilidades',
      title: 'Pagos en línea y contenido en video',
      timeline: 'Sin fecha ni compromiso',
      status: 'planned',
      icon: '💳',
      color: '#a78bfa',
      bg: 'rgba(139,92,246,0.06)',
      border: 'rgba(139,92,246,0.25)',
      description: 'Si algún artesano lo pide o el patrocinio lo exige, se puede ofrecer el modelo con cobro por la plataforma mediante una pasarela. Exige concepto legal previo. Los videos cortos requieren un servicio de video distinto de Azure Media Services, retirado en 2024.',
      triggerCondition: 'Demanda comprobada en el piloto, concepto legal favorable y financiación disponible.',
      estimatedCost: 'Por definir',
      features: [
        { icon: '💳', name: 'Pasarela de pago', detail: 'Modelo A: cobro por la plataforma, con comisión; costo de pasarela y obligaciones legales por evaluar.' },
        { icon: '🎥', name: 'Videos cortos', detail: 'Videos de proceso y producto; el servicio de video está por elegir.' },
        { icon: '📱', name: 'PWA', detail: 'Instalación desde el navegador; no está implementada.' },
        { icon: '🌎', name: 'Envíos internacionales', detail: 'Posibilidad futura con flujo básico; hoy no se ejecutan.' },
      ],
      services: [
        { name: 'Pasarela de pago', tier: 'PAGOS' },
        { name: 'Servicio de video (por elegir)', tier: 'VIDEO' },
      ]
    },
    {
      id: 3,
      label: 'Fase 3 — Visión',
      title: 'Visión a largo plazo',
      timeline: 'Sin fecha',
      status: 'future',
      icon: '🔭',
      color: '#34d399',
      bg: 'rgba(16,185,129,0.06)',
      border: 'rgba(16,185,129,0.25)',
      description: 'Ideas sin análisis: recomendaciones con IA, aplicación nativa y expansión de categorías. Se evalúan solo si el piloto y la Fase 2 demuestran tracción.',
      triggerCondition: 'Tracción demostrada y financiación; sin umbrales definidos.',
      estimatedCost: 'Por definir',
      features: [
        { icon: '🎯', name: 'Ideas en evaluación', detail: 'Recomendaciones con IA, aplicación nativa y nuevas categorías.' },
      ],
      services: []
    }
  ];
}
