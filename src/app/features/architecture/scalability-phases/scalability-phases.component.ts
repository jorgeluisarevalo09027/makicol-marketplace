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
        <h3 class="text-white font-bold text-lg">Plan de Escalabilidad por Fases</h3>
        <p class="text-slate-400 text-sm mt-0.5">El núcleo de la arquitectura permanece invariante en todas las fases</p>
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
                <div class="text-slate-500 text-xs">USD / mes</div>
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

            <!-- Azure services for this phase -->
            <div>
              <h5 class="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Servicios Azure</h5>
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
      label: 'Fase 1 — MVP',
      title: 'Catálogo Digital + Pagos Online',
      timeline: 'Ago–Nov 2026 (Lanzamiento MVP)',
      status: 'current',
      icon: '�',
      color: '#38bdf8',
      bg: 'rgba(14,165,233,0.06)',
      border: 'rgba(14,165,233,0.25)',
      description: 'El MVP se lanza a nivel nacional. Los 500+ productores registrados en Makicol publican sus artesanías, libros y productos editoriales con pagos online vía PSE y Nequi. La infraestructura Azure se financia con patrocinadores institucionales.',
      triggerCondition: 'Confirmación de patrocinadores institucionales y aliados de fomento al emprendimiento. Inicio en agosto 2026.',
      estimatedCost: '$131–$180',
      features: [
        { icon: '🔐', name: 'Registro de Productores', detail: 'Portal de alta para artesanos y editores. Perfil con fotos, descripción y región de Colombia.' },
        { icon: '🎨', name: 'Catálogo de Productos', detail: 'Listado de artesanías, libros y productos editoriales con fotos, precio y stock disponible.' },
        { icon: '💳', name: 'Pagos Online Colombianos', detail: 'Integración con Wompi (Bancolombia): PSE, tarjeta crédito/débito, Nequi, Daviplata y Efecty en efectivo.' },
        { icon: '📦', name: 'Gestión de Pedidos', detail: 'Dashboard del productor: pedidos recibidos, estado de envío y historial de ventas.' },
        { icon: '🔍', name: 'Búsqueda y Filtros', detail: 'Filtrar por categoría (artesanía, libro, arte), región de Colombia y rango de precio.' },
        { icon: '📱', name: 'PWA Installable', detail: 'Los compradores agregan el marketplace a su pantalla de inicio desde el navegador.' },
      ],
      services: [
        { name: 'App Service B2', tier: 'COMPUTE' },
        { name: 'SQL Database S1', tier: 'DATA' },
        { name: 'Blob Storage LRS', tier: 'STORAGE' },
        { name: 'Azure CDN Standard', tier: 'DELIVERY' },
        { name: 'Front Door Standard', tier: 'GATEWAY' },
        { name: 'Wompi API', tier: 'PAGOS' },
      ]
    },
    {
      id: 2,
      label: 'Fase 2 — Reels',
      title: '+ Videos Cortos 30s (Historias)',
      timeline: '3–5 meses post-MVP',
      status: 'planned',
      icon: '�',
      color: '#a78bfa',
      bg: 'rgba(139,92,246,0.06)',
      border: 'rgba(139,92,246,0.25)',
      description: 'Se incorpora el módulo de videos cortos de 30 segundos al estilo de TikTok Shop / Instagram Reels. Los productores artesanales muestran el proceso de fabricación, presentan libros y generan engagement con compradores antes de la compra.',
      triggerCondition: 'Base de productores activos > 100 y volumen de ventas mensual > $2,000 USD en comisiones.',
      estimatedCost: '$280–$380',
      features: [
        { icon: '📹', name: 'Reels de Producto', detail: 'Videos de 30s que los artesanos graban para mostrar su proceso creativo y producto terminado.' },
        { icon: '�', name: 'Stories de Libros', detail: 'Presentaciones en video de libros editoriales: el autor leyendo fragmentos o describiendo la obra.' },
        { icon: '▶️', name: 'Feed de Videos', detail: 'Feed tipo TikTok/Instagram en el marketplace. Los compradores navegan videos de productos.' },
        { icon: '�', name: 'Interacción en Reels', detail: 'Comentarios, reacciones y botón "Comprar" directo desde el reel, sin salir del video.' },
        { icon: '📡', name: 'Streaming Adaptativo', detail: 'Azure Media Services con HLS. Calidad automática según conexión del comprador.' },
        { icon: '📊', name: 'Analytics de Video', detail: 'Reproducciones, tiempo de vista y tasa de conversión de reel a compra por productor.' },
      ],
      services: [
        { name: 'App Service P1v3', tier: 'COMPUTE' },
        { name: 'SQL Database S3', tier: 'DATA' },
        { name: 'Azure Media Services', tier: 'VIDEO' },
        { name: 'Azure CDN Premium', tier: 'DELIVERY' },
        { name: 'Redis Cache C1', tier: 'CACHE' },
        { name: 'Blob Storage (500GB+)', tier: 'STORAGE' },
      ]
    },
    {
      id: 3,
      label: 'Fase 3 — IA',
      title: '+ Recomendaciones IA + App Nativa',
      timeline: '9–18 meses post-MVP',
      status: 'future',
      icon: '🤖',
      color: '#34d399',
      bg: 'rgba(16,185,129,0.06)',
      border: 'rgba(16,185,129,0.25)',
      description: 'Motor de recomendación personalizado que sugiere artesanías y libros según el historial del comprador. Búsqueda visual de productos similares. App nativa Android con notificaciones push de nuevos reels y ofertas de productores favoritos.',
      triggerCondition: 'Base de compradores activos > 5,000 mensuales y marketplace autosuficiente financieramente.',
      estimatedCost: '$650–$950',
      features: [
        { icon: '🎯', name: 'Recomendaciones Personalizadas', detail: 'IA sugiere artesanías y libros según historial de compras, búsquedas y videos vistos.' },
        { icon: '�', name: 'Búsqueda Visual', detail: 'El comprador sube una foto y la IA encuentra artesanías similares en el catálogo.' },
        { icon: '🔔', name: 'Notificaciones Push (App)', detail: 'App nativa Android con alertas: nuevo reel del artesano favorito, producto disponible, oferta.' },
        { icon: '📈', name: 'Dashboard de Ventas IA', detail: 'Power BI para productores: predicción de demanda, productos más vistos y análisis de competencia.' },
        { icon: '🌐', name: 'Expansión de Categorías', detail: 'Apertura a nuevas categorías de emprendimiento más allá de artesanías: moda, alimentos y decoración.' },
        { icon: '💰', name: 'Marketplace de Exportación', detail: 'Integración con Etsy y Amazon Handmade para exportar artesanías colombianas al mundo.' },
      ],
      services: [
        { name: 'App Service P2v3', tier: 'COMPUTE' },
        { name: 'Azure OpenAI Service', tier: 'IA' },
        { name: 'Azure AI Search', tier: 'IA' },
        { name: 'Power BI Embedded', tier: 'ANALYTICS' },
        { name: 'Azure Cosmos DB', tier: 'NOSQL' },
        { name: 'Azure Computer Vision', tier: 'IA' },
      ]
    }
  ];
}
