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
                ? 'bg-sky-400 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200'"
              (click)="activeCategory.set('all')">
              Todas
            </button>
            @for (cat of categories; track cat.id) {
              <button
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                [class]="activeCategory() === cat.id
                  ? 'bg-sky-400 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200'"
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
    { id: 'comercio', label: 'Comercio', icon: '🛒' },
    { id: 'pagos', label: 'Pagos', icon: '�' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'ux', label: 'UX Productores', icon: '🎨' },
  ];

  rows: MatrixRow[] = [
    { category: 'comercio', feature: 'Catálogo de productos', pwa: { rating: 'excellent', detail: 'SEO + carga instantánea' }, native: { rating: 'good', detail: 'App Store discovery' } },
    { category: 'comercio', feature: 'Búsqueda y filtros', pwa: { rating: 'excellent', detail: 'URL compartible por filtro' }, native: { rating: 'good', detail: 'Búsqueda nativa rápida' } },
    { category: 'comercio', feature: 'Carrito de compras', pwa: { rating: 'excellent', detail: 'LocalStorage + sincronización' }, native: { rating: 'excellent', detail: 'Persistencia nativa' } },
    { category: 'comercio', feature: 'Acceso de productores', pwa: { rating: 'excellent', detail: 'Sin instalación requerida' }, native: { rating: 'fair', detail: 'Barrera de instalación' } },
    { category: 'comercio', feature: 'SEO y descubribilidad', pwa: { rating: 'excellent', detail: 'Indexado por Google' }, native: { rating: 'poor', detail: 'No indexable por buscadores' } },
    { category: 'pagos', feature: 'PSE / Transferencia', pwa: { rating: 'excellent', detail: 'Futuro: pasarela web' }, native: { rating: 'excellent', detail: 'Futuro: SDK móvil' } },
    { category: 'pagos', feature: 'Nequi / Daviplata', pwa: { rating: 'excellent', detail: 'Futuro: en checkout' }, native: { rating: 'excellent', detail: 'Futuro: deep link' } },
    { category: 'pagos', feature: 'Tarjeta crédito/débito', pwa: { rating: 'excellent', detail: 'Futuro: pasarela + 3DS' }, native: { rating: 'excellent', detail: 'Token nativo cifrado' } },
    { category: 'pagos', feature: 'Historial de ventas', pwa: { rating: 'excellent', detail: 'Dashboard web para productores' }, native: { rating: 'good', detail: 'Notificación en tiempo real' } },
    { category: 'videos', feature: 'Videos cortos (futuro)', pwa: { rating: 'excellent', detail: 'HTML5 Video (no existe hoy)' }, native: { rating: 'excellent', detail: 'ExoPlayer nativo' } },
    { category: 'videos', feature: 'Subir video desde dispositivo', pwa: { rating: 'good', detail: 'File API (upload manual)' }, native: { rating: 'excellent', detail: 'Cámara + galería nativos' } },
    { category: 'videos', feature: 'Reproducción en feed', pwa: { rating: 'good', detail: 'Intersection Observer API' }, native: { rating: 'excellent', detail: 'RecyclerView optimizado' } },
    { category: 'videos', feature: 'Comprar desde el reel', pwa: { rating: 'excellent', detail: 'Botón overlay en video' }, native: { rating: 'excellent', detail: 'Tap to buy nativo' } },
    { category: 'ux', feature: 'Registro de artesano', pwa: { rating: 'excellent', detail: 'Form web con validación' }, native: { rating: 'fair', detail: 'Requiere instalación previa' } },
    { category: 'ux', feature: 'Subir fotos de productos', pwa: { rating: 'good', detail: 'File input + crop en browser' }, native: { rating: 'excellent', detail: 'Cámara nativa + edición' } },
    { category: 'ux', feature: 'Notificaciones de pedidos', pwa: { rating: 'good', detail: 'Web Push API (Android)' }, native: { rating: 'excellent', detail: 'FCM push inmediato' } },
    { category: 'ux', feature: 'Acceso desde zonas rurales', pwa: { rating: 'excellent', detail: 'Sin descarga previa, 3G ok' }, native: { rating: 'fair', detail: 'Descarga inicial pesada' } },
  ];

  visibleCategories(): string[] {
    const cat = this.activeCategory();
    if (cat === 'all') return ['comercio', 'pagos', 'videos', 'ux'];
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
