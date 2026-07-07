import { Component, signal } from '@angular/core';

type Rating = 'excellent' | 'good' | 'fair' | 'poor';

interface MatrixRow {
  category: string;
  feature: string;
  pwa: { rating: Rating; detail: string };
  native: { rating: Rating; detail: string };
}

@Component({
  selector: 'app-feature-matrix',
  standalone: true,
  template: `
    <div class="glass-card rounded-2xl overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-5 border-b border-slate-700/50">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-white font-bold text-lg">Matriz Comparativa Detallada</h3>
            <p class="text-slate-400 text-sm mt-0.5">Evaluación técnica por categoría</p>
          </div>
          <!-- Category filter -->
          <div class="flex flex-wrap gap-2">
            <button
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              [class]="activeCategory() === 'all'
                ? 'bg-sky-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'"
              (click)="activeCategory.set('all')">
              Todas
            </button>
            @for (cat of categories; track cat.id) {
              <button
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                [class]="activeCategory() === cat.id
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'"
                (click)="activeCategory.set(cat.id)">
                {{ cat.icon }} {{ cat.label }}
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Table header -->
      <div class="grid grid-cols-12 px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-800/40">
        <div class="col-span-4">Característica</div>
        <div class="col-span-4 text-center flex items-center justify-center gap-2">
          <span class="text-lg">🌐</span> PWA
        </div>
        <div class="col-span-4 text-center flex items-center justify-center gap-2">
          <span class="text-lg">📱</span> Nativa Android
        </div>
      </div>

      <!-- Category groups -->
      @for (category of visibleCategories(); track category) {
        <!-- Category separator -->
        <div class="px-6 py-2.5 bg-slate-800/20 border-b border-t border-slate-700/40">
          <span class="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {{ getCategoryLabel(category) }}
          </span>
        </div>

        @for (row of getRowsByCategory(category); track row.feature) {
          <div class="grid grid-cols-12 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors items-center">
            <div class="col-span-4 text-slate-300 text-sm font-medium">{{ row.feature }}</div>

            <!-- PWA rating -->
            <div class="col-span-4 flex flex-col items-center gap-1">
              <div class="flex items-center gap-1.5">
                <span [innerHTML]="getRatingIcon(row.pwa.rating)"></span>
                <span class="text-xs font-semibold" [class]="getRatingClass(row.pwa.rating)">
                  {{ getRatingLabel(row.pwa.rating) }}
                </span>
              </div>
              <span class="text-slate-500 text-[10px] text-center leading-tight hidden sm:block">{{ row.pwa.detail }}</span>
            </div>

            <!-- Native rating -->
            <div class="col-span-4 flex flex-col items-center gap-1">
              <div class="flex items-center gap-1.5">
                <span [innerHTML]="getRatingIcon(row.native.rating)"></span>
                <span class="text-xs font-semibold" [class]="getRatingClass(row.native.rating)">
                  {{ getRatingLabel(row.native.rating) }}
                </span>
              </div>
              <span class="text-slate-500 text-[10px] text-center leading-tight hidden sm:block">{{ row.native.detail }}</span>
            </div>
          </div>
        }
      }

      <!-- Legend -->
      <div class="px-6 py-4 bg-slate-800/20 flex flex-wrap gap-4">
        @for (item of legend; track item.rating) {
          <div class="flex items-center gap-2">
            <span [innerHTML]="getRatingIcon(item.rating)"></span>
            <span class="text-slate-400 text-xs">{{ getRatingLabel(item.rating) }}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class FeatureMatrixComponent {
  activeCategory = signal('all');

  legend = [
    { rating: 'excellent' as Rating },
    { rating: 'good' as Rating },
    { rating: 'fair' as Rating },
    { rating: 'poor' as Rating },
  ];

  categories = [
    { id: 'rendimiento', label: 'Rendimiento', icon: '⚡' },
    { id: 'despliegue', label: 'Despliegue', icon: '🚀' },
    { id: 'funciones', label: 'Funciones', icon: '🔧' },
    { id: 'ux', label: 'UX', icon: '🎨' },
  ];

  rows: MatrixRow[] = [
    { category: 'rendimiento', feature: 'Carga PDF < 10MB', pwa: { rating: 'good', detail: 'PDF.js ~2s' }, native: { rating: 'excellent', detail: 'Nativo <1s' } },
    { category: 'rendimiento', feature: 'Carga PDF > 50MB', pwa: { rating: 'fair', detail: 'PDF.js ~8-12s' }, native: { rating: 'good', detail: 'Nativo ~3-4s' } },
    { category: 'rendimiento', feature: 'Uso de RAM', pwa: { rating: 'fair', detail: '~180MB (50MB PDF)' }, native: { rating: 'excellent', detail: '~80MB (50MB PDF)' } },
    { category: 'rendimiento', feature: 'Velocidad de scroll', pwa: { rating: 'good', detail: '60fps en navegador' }, native: { rating: 'excellent', detail: '60fps nativo' } },
    { category: 'rendimiento', feature: 'Tiempo de inicio de app', pwa: { rating: 'good', detail: '< 2s (CDN cached)' }, native: { rating: 'fair', detail: '~3s (cold start)' } },
    { category: 'despliegue', feature: 'Ciclo de actualización', pwa: { rating: 'excellent', detail: 'Inmediato' }, native: { rating: 'fair', detail: '1-3 días (Play Store)' } },
    { category: 'despliegue', feature: 'Costo de distribución', pwa: { rating: 'excellent', detail: '$0/mes' }, native: { rating: 'good', detail: '$25 registro único' } },
    { category: 'despliegue', feature: 'Compatibilidad de plataforma', pwa: { rating: 'excellent', detail: 'iOS, Android, Desktop' }, native: { rating: 'fair', detail: 'Solo Android' } },
    { category: 'despliegue', feature: 'Instalación requerida', pwa: { rating: 'excellent', detail: 'Opcional (Add to Home)' }, native: { rating: 'fair', detail: 'Obligatoria' } },
    { category: 'funciones', feature: 'Modo offline', pwa: { rating: 'good', detail: 'Service Worker parcial' }, native: { rating: 'excellent', detail: 'Completo (SQLite)' } },
    { category: 'funciones', feature: 'Notificaciones push', pwa: { rating: 'good', detail: 'Web Push API' }, native: { rating: 'excellent', detail: 'FCM Nativo' } },
    { category: 'funciones', feature: 'Acceso a filesystem', pwa: { rating: 'fair', detail: 'File System Access API' }, native: { rating: 'excellent', detail: 'Acceso completo' } },
    { category: 'funciones', feature: 'Deep linking', pwa: { rating: 'excellent', detail: 'URL nativo' }, native: { rating: 'good', detail: 'App Links' } },
    { category: 'ux', feature: 'Anotaciones en PDF', pwa: { rating: 'good', detail: 'PDF.js + Canvas' }, native: { rating: 'excellent', detail: 'API de anotación nativa' } },
    { category: 'ux', feature: 'Búsqueda en texto', pwa: { rating: 'good', detail: 'PDF.js TextLayer' }, native: { rating: 'excellent', detail: 'Nativo del SO' } },
    { category: 'ux', feature: 'Gestos táctiles', pwa: { rating: 'good', detail: 'Touch events' }, native: { rating: 'excellent', detail: 'Gestos nativos' } },
    { category: 'ux', feature: 'Personalización de UI', pwa: { rating: 'excellent', detail: 'Control total CSS' }, native: { rating: 'good', detail: 'Material Design' } },
  ];

  visibleCategories(): string[] {
    const cat = this.activeCategory();
    if (cat === 'all') return ['rendimiento', 'despliegue', 'funciones', 'ux'];
    return [cat];
  }

  getRowsByCategory(category: string): MatrixRow[] {
    return this.rows.filter(r => r.category === category);
  }

  getCategoryLabel(id: string): string {
    return this.categories.find(c => c.id === id)?.label ?? id;
  }

  getRatingIcon(rating: Rating): string {
    const icons: Record<Rating, string> = {
      excellent: '<span class="text-emerald-400 text-base">●●●</span>',
      good: '<span class="text-sky-400 text-base">●●<span class="text-slate-600">●</span></span>',
      fair: '<span class="text-amber-400 text-base">●<span class="text-slate-600">●●</span></span>',
      poor: '<span class="text-rose-400 text-base"><span class="text-slate-600">●●</span>●</span>',
    };
    return icons[rating];
  }

  getRatingLabel(rating: Rating): string {
    const labels: Record<Rating, string> = {
      excellent: 'Excelente', good: 'Bueno', fair: 'Aceptable', poor: 'Limitado'
    };
    return labels[rating];
  }

  getRatingClass(rating: Rating): string {
    const classes: Record<Rating, string> = {
      excellent: 'text-emerald-400', good: 'text-sky-400', fair: 'text-amber-400', poor: 'text-rose-400'
    };
    return classes[rating];
  }
}
