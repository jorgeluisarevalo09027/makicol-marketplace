import { Component, signal } from '@angular/core';

interface ApproachData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
  tagline: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  techStack: string[];
  metrics: { label: string; value: string; good: boolean }[];
}

@Component({
  selector: 'app-comparison-cards',
  standalone: true,
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      @for (approach of approaches; track approach.id) {
        <div class="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
             [style.borderColor]="selectedId() === approach.id ? approach.accentColor + '60' : ''">

          <!-- Card header -->
          <div class="p-6 border-b border-slate-700/50"
               [style.background]="'linear-gradient(135deg, ' + approach.accentBg + ', transparent)'">
            <div class="flex items-start justify-between mb-4">
              <div class="text-4xl">{{ approach.icon }}</div>
              @if (approach.id === 'pwa') {
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  ✅ Recomendado Inicial
                </span>
              } @else {
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  ⚡ Fase 2 Escalabilidad
                </span>
              }
            </div>
            <h3 class="text-white font-bold text-xl mb-1">{{ approach.title }}</h3>
            <p class="text-sm font-medium mb-2" [style.color]="approach.accentColor">{{ approach.subtitle }}</p>
            <p class="text-slate-400 text-sm leading-relaxed">{{ approach.tagline }}</p>
          </div>

          <!-- Performance metrics -->
          <div class="px-6 pt-5 pb-3">
            <h4 class="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Métricas Clave</h4>
            <div class="grid grid-cols-3 gap-2">
              @for (metric of approach.metrics; track metric.label) {
                <div class="rounded-lg p-3 text-center"
                     [class]="metric.good ? 'bg-emerald-500/8 border border-emerald-500/20' : 'bg-amber-500/8 border border-amber-500/20'">
                  <div class="text-xs font-bold mb-0.5"
                       [class]="metric.good ? 'text-emerald-400' : 'text-amber-400'">
                    {{ metric.value }}
                  </div>
                  <div class="text-slate-500 text-[10px]">{{ metric.label }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Pros & Cons -->
          <div class="px-6 py-4 grid grid-cols-2 gap-4">
            <div>
              <h4 class="text-emerald-400 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Ventajas
              </h4>
              <ul class="space-y-1.5">
                @for (pro of approach.pros; track pro) {
                  <li class="text-slate-300 text-xs leading-relaxed flex items-start gap-2">
                    <span class="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                    {{ pro }}
                  </li>
                }
              </ul>
            </div>
            <div>
              <h4 class="text-amber-400 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
                Limitaciones
              </h4>
              <ul class="space-y-1.5">
                @for (con of approach.cons; track con) {
                  <li class="text-slate-400 text-xs leading-relaxed flex items-start gap-2">
                    <span class="text-amber-500/80 mt-0.5 flex-shrink-0">–</span>
                    {{ con }}
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- Tech stack pills -->
          <div class="px-6 pb-5">
            <div class="flex flex-wrap gap-2">
              @for (tech of approach.techStack; track tech) {
                <span class="px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-300 text-[11px] font-medium border border-slate-600/50">
                  {{ tech }}
                </span>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ComparisonCardsComponent {
  selectedId = signal('pwa');

  approaches: ApproachData[] = [
    {
      id: 'pwa',
      title: 'Progressive Web App (PWA)',
      subtitle: 'Angular 21 + Service Workers',
      icon: '🌐',
      accentColor: '#10b981',
      accentBg: 'rgba(16,185,129,0.05)',
      borderColor: '#10b981',
      tagline: 'Despliegue web con capacidades offline. Actualización inmediata sin tiendas. Solución de menor costo operativo.',
      pros: [
        'Actualización instantánea sin revisión de tienda',
        'Costo $0 en distribución (sin Play Store)',
        'Funciona en cualquier dispositivo con navegador',
        'SEO nativo y accesibilidad universal',
        'Un solo codebase para web y "app"',
      ],
      cons: [
        'Acceso limitado a APIs nativas del sistema',
        'Mayor uso de RAM en PDFs muy pesados (>50MB)',
        'Rendimiento de scroll inferior al nativo',
        'Soporte offline más limitado',
      ],
      bestFor: 'MVP, distribución masiva, bajo presupuesto',
      techStack: ['Angular 21', 'Service Worker', 'PDF.js', 'IndexedDB', 'Azure CDN'],
      metrics: [
        { label: 'Despliegue', value: 'Inmediato', good: true },
        { label: 'RAM PDF 50MB', value: '~180MB', good: true },
        { label: 'Costo dist.', value: '$0', good: true },
      ]
    },
    {
      id: 'native',
      title: 'App Nativa Android',
      subtitle: 'Capacitor + Angular 21',
      icon: '📱',
      accentColor: '#6366f1',
      accentBg: 'rgba(99,102,241,0.05)',
      borderColor: '#6366f1',
      tagline: 'Rendimiento nativo para PDFs pesados. Acceso completo a APIs del sistema. Experiencia de lectura premium offline.',
      pros: [
        'Renderizado nativo de PDF (menor RAM)',
        'Acceso total a FileSystem y APIs del SO',
        'Offline completo con SQLite local',
        'Notificaciones push nativas',
        'Experiencia de lectura fluida y gestos nativos',
      ],
      cons: [
        'Review Play Store: 1–3 días por actualización',
        'Costo: $25 registro Google Play',
        'Solo Android (no iOS sin trabajo adicional)',
        'Complejidad de distribución y versionado',
      ],
      bestFor: 'Usuarios con muchos PDFs, uso offline intensivo',
      techStack: ['Angular 21', 'Capacitor 6', 'Android Native', 'SQLite', 'Firebase FCM'],
      metrics: [
        { label: 'RAM PDF 50MB', value: '~80MB', good: true },
        { label: 'Despliegue', value: '1–3 días', good: false },
        { label: 'Costo dist.', value: '$25/año', good: false },
      ]
    }
  ];
}
