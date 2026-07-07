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
      title: 'Plataforma de Lectura de PDFs',
      timeline: 'Lanzamiento inicial',
      status: 'current',
      icon: '📄',
      color: '#38bdf8',
      bg: 'rgba(14,165,233,0.06)',
      border: 'rgba(14,165,233,0.25)',
      description: 'El MVP establece el núcleo de la plataforma: autenticación, gestión de PDFs y visor. La arquitectura se diseña deliberadamente para soportar las fases 2 y 3 sin refactorización mayor.',
      triggerCondition: 'Proyecto aprobado. Esta fase define la base arquitectónica inmutable.',
      estimatedCost: '$129–$180',
      features: [
        { icon: '🔐', name: 'Autenticación y Roles', detail: 'Azure AD B2C con roles: Admin, Instructor, Estudiante. JWT con claims personalizados.' },
        { icon: '📚', name: 'Biblioteca de PDFs', detail: 'Upload, organización por cursos/categorías y búsqueda full-text sobre metadatos.' },
        { icon: '📖', name: 'Visor de PDFs', detail: 'PDF.js con anotaciones, marcadores y control de progreso de lectura por usuario.' },
        { icon: '📊', name: 'Analytics Básico', detail: 'Páginas vistas, tiempo de lectura, documentos más populares via App Insights.' },
        { icon: '💾', name: 'Offline con PWA', detail: 'Service Worker cachea PDFs recientes. Acceso sin conexión a contenido descargado.' },
        { icon: '📱', name: 'Mobile-First UI', detail: 'Angular 21 responsive design. PWA installable en Android e iOS.' },
      ],
      services: [
        { name: 'App Service B2', tier: 'COMPUTE' },
        { name: 'SQL Database S1', tier: 'DATA' },
        { name: 'Blob Storage LRS', tier: 'STORAGE' },
        { name: 'Azure CDN Standard', tier: 'DELIVERY' },
        { name: 'Front Door Standard', tier: 'GATEWAY' },
        { name: 'Azure AD B2C', tier: 'AUTH' },
      ]
    },
    {
      id: 2,
      label: 'Fase 2 — Video',
      title: '+ Módulo de Streaming de Video',
      timeline: '3–6 meses post-MVP',
      status: 'planned',
      icon: '🎬',
      color: '#a78bfa',
      bg: 'rgba(139,92,246,0.06)',
      border: 'rgba(139,92,246,0.25)',
      description: 'Se añade streaming adaptativo de video educativo sin tocar el núcleo PDF. Azure Media Services maneja la transcodificación y el CDN ya existente sirve el video en múltiples calidades.',
      triggerCondition: 'Base de usuarios > 500 usuarios activos y demanda confirmada de contenido en video.',
      estimatedCost: '$380–$520',
      features: [
        { icon: '🎥', name: 'Upload de Video', detail: 'Ingesta a Azure Media Services. Transcodificación automática a múltiples resoluciones (360p, 720p, 1080p).' },
        { icon: '📡', name: 'Adaptive Bitrate', detail: 'HLS/DASH streaming. El cliente selecciona automáticamente la calidad según el ancho de banda.' },
        { icon: '🔒', name: 'DRM Protection', detail: 'Azure DRM (Widevine + PlayReady) para proteger el contenido premium de cursos.' },
        { icon: '📝', name: 'Subtítulos y Capítulos', detail: 'Azure Cognitive Services para transcripción automática y generación de subtítulos VTT.' },
        { icon: '⏱️', name: 'Progreso de Video', detail: 'Guardado de posición de reproducción por usuario. Retoma desde donde lo dejó.' },
        { icon: '📊', name: 'Analytics de Video', detail: 'Tiempo de visualización, tasa de completitud, puntos de abandono por video.' },
      ],
      services: [
        { name: 'App Service P1v3', tier: 'COMPUTE' },
        { name: 'SQL Database S3', tier: 'DATA' },
        { name: 'Media Services', tier: 'VIDEO' },
        { name: 'Azure CDN Premium', tier: 'DELIVERY' },
        { name: 'Redis Cache C1', tier: 'CACHE' },
        { name: 'Blob Storage (500GB+)', tier: 'STORAGE' },
      ]
    },
    {
      id: 3,
      label: 'Fase 3 — IA',
      title: '+ Motor de IA y Analíticas',
      timeline: '9–18 meses post-MVP',
      status: 'future',
      icon: '🤖',
      color: '#34d399',
      bg: 'rgba(16,185,129,0.06)',
      border: 'rgba(16,185,129,0.25)',
      description: 'Integración de capacidades de IA sobre la base de conocimiento ya construida. Búsqueda semántica en PDFs, preguntas al documento y recomendaciones personalizadas de contenido.',
      triggerCondition: 'Base de usuarios > 2,000 activos y ROI positivo demostrado en Fases 1-2.',
      estimatedCost: '$800–$1,200',
      features: [
        { icon: '🔍', name: 'Búsqueda Semántica', detail: 'Azure AI Search con embeddings vectoriales. Busca por significado, no solo palabras clave en todos los PDFs.' },
        { icon: '💬', name: 'Chat con Documentos', detail: 'Azure OpenAI (GPT-4o) + RAG. Los estudiantes preguntan en lenguaje natural sobre el contenido del PDF.' },
        { icon: '🎯', name: 'Recomendaciones IA', detail: 'Motor de recomendación personalizado basado en historial de lectura, completitud y calificaciones.' },
        { icon: '📈', name: 'Analytics Avanzado', detail: 'Power BI Embedded para instructores: métricas de engagement, predicción de abandono, mapas de calor de lectura.' },
        { icon: '✅', name: 'Evaluaciones Auto-generadas', detail: 'Azure OpenAI genera quizzes automáticamente a partir del contenido del PDF para verificar comprensión.' },
        { icon: '🌐', name: 'Traducción Automática', detail: 'Azure Cognitive Translator para traducir PDFs y subtítulos de video en tiempo real.' },
      ],
      services: [
        { name: 'App Service P2v3', tier: 'COMPUTE' },
        { name: 'Azure OpenAI Service', tier: 'AI' },
        { name: 'Azure AI Search', tier: 'AI' },
        { name: 'Cognitive Services', tier: 'AI' },
        { name: 'Power BI Embedded', tier: 'ANALYTICS' },
        { name: 'Azure Cosmos DB', tier: 'NOSQL' },
      ]
    }
  ];
}
