import { Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { PRODUCTOS, CATEGORIAS, REGIONES } from '../../data/marketplace-data';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  styles: [`
    .buscar-layout {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }
    .buscar-aside {
      width: 240px;
      flex-shrink: 0;
      position: sticky;
      top: 140px;
    }
    .buscar-filtros-toggle {
      display: none;
    }
    @media (max-width: 860px) {
      .buscar-layout {
        flex-direction: column;
      }
      .buscar-aside {
        width: 100%;
        position: static;
        display: none;
      }
      .buscar-aside.abierto {
        display: block;
      }
      .buscar-filtros-toggle {
        display: flex;
      }
    }
  `],
  template: `
    <!-- Header de búsqueda -->
    <div style="background:#2C7350; padding:32px 16px;">
      <div style="max-width:700px; margin:0 auto; text-align:center;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#fff; font-size:1.8rem; font-weight:900; margin:0 0 16px;">
          Buscar Artesanías
        </h1>
        <div style="display:flex; background:#fff; border-radius:10px; overflow:hidden; border:3px solid #FFCD00;">
          <input [(ngModel)]="query" placeholder="Mochilas wayúu, sombreros vueltiao, cerámica Tayrona..."
                 style="flex:1; border:none; outline:none; padding:12px 16px; font-size:0.95rem; color:#1F2A22;">
          <button style="padding:12px 20px; background:#FFCD00; border:none; cursor:pointer; color:#295440; font-size:1.1rem; font-weight:700;">
            🔍
          </button>
        </div>
        <p style="color:rgba(255,255,255,0.65); font-size:0.85rem; margin:10px 0 0;">
          {{ resultados().length }} resultados encontrados
        </p>
      </div>
    </div>

    <div style="max-width:1200px; margin:0 auto; padding:28px 16px;" class="buscar-layout">

      <!-- Toggle de filtros (solo mobile) -->
      <button (click)="filtrosAbiertos.set(!filtrosAbiertos())" class="buscar-filtros-toggle"
              style="width:100%; align-items:center; justify-content:space-between; padding:12px 16px; background:#fff;
                     border:1.5px solid #C6D7CD; border-radius:10px; font-weight:700; color:#295440; font-size:0.9rem; cursor:pointer;">
        <span>Filtros {{ categoriasSeleccionadas().length || regionesSeleccionadas().length ? '(activos)' : '' }}</span>
        <span class="material-symbols-outlined">{{ filtrosAbiertos() ? 'expand_less' : 'expand_more' }}</span>
      </button>

      <!-- Panel de filtros -->
      <aside class="buscar-aside" [class.abierto]="filtrosAbiertos()"
             style="background:#fff; border-left:4px solid #FFCD00; border-radius:10px; padding:20px; box-shadow:0 2px 12px rgba(41,84,64,0.09);">
        <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.1rem; font-weight:700; margin:0 0 16px;">
          Filtros
        </h3>

        <!-- Categoría -->
        <div style="margin-bottom:20px;">
          <p style="font-size:0.82rem; font-weight:700; color:#1F2A22; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px;">Categoría</p>
          @for (cat of categorias; track cat) {
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 0;">
              <input type="checkbox" [checked]="categoriasSeleccionadas().includes(cat)"
                     (change)="toggleCategoria(cat)"
                     style="accent-color:#295440; width:15px; height:15px;">
              <span style="font-size:0.85rem; color:#1F2A22;">{{ cat }}</span>
            </label>
          }
        </div>

        <!-- Precio -->
        <div style="margin-bottom:20px;">
          <p style="font-size:0.82rem; font-weight:700; color:#1F2A22; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px;">
            Precio máx: <span style="color:#295440;">{{ fmtPrice(precioMax()) }}</span>
          </p>
          <input type="range" class="range-thumb" [ngModel]="precioMax()"
                 (ngModelChange)="precioMax.set($event)"
                 min="10000" max="500000" step="5000"
                 style="width:100%;">
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#57685c; margin-top:4px;">
            <span>$10.000</span><span>$500.000</span>
          </div>
        </div>

        <!-- Región -->
        <div style="margin-bottom:20px;">
          <p style="font-size:0.82rem; font-weight:700; color:#1F2A22; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px;">Región</p>
          @for (reg of regiones; track reg) {
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 0;">
              <input type="checkbox" [checked]="regionesSeleccionadas().includes(reg)"
                     (change)="toggleRegion(reg)"
                     style="accent-color:#295440; width:15px; height:15px;">
              <span style="font-size:0.85rem; color:#1F2A22;">{{ reg }}</span>
            </label>
          }
        </div>

        <!-- Calificación mínima -->
        <div style="margin-bottom:20px;">
          <p style="font-size:0.82rem; font-weight:700; color:#1F2A22; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px;">Calificación mínima</p>
          @for (r of [5,4,3]; track r) {
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 0;">
              <input type="radio" [value]="r" [checked]="ratingMin() === r"
                     (change)="ratingMin.set(r)"
                     style="accent-color:#295440; width:15px; height:15px;">
              <span style="color:#FFCD00;">{{ '★'.repeat(r) }}</span>
              <span style="font-size:0.8rem; color:#57685c;">{{ r }}+ estrellas</span>
            </label>
          }
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:4px 0;">
            <input type="radio" [value]="0" [checked]="ratingMin() === 0"
                   (change)="ratingMin.set(0)"
                   style="accent-color:#295440; width:15px; height:15px;">
            <span style="font-size:0.8rem; color:#57685c;">Todas</span>
          </label>
        </div>

        <button (click)="limpiarFiltros()"
                style="width:100%; padding:8px; background:transparent; border:2px solid #d4b87a; border-radius:8px; color:#57685c; font-size:0.82rem; font-weight:600; cursor:pointer;">
          Limpiar filtros
        </button>
      </aside>

      <!-- Resultados -->
      <div style="flex:1; min-width:0;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <p style="color:#5a3820; font-size:0.9rem;">
            <strong style="color:#295440;">{{ resultados().length }}</strong> artesanías encontradas
          </p>
          <select style="padding:6px 12px; border:1px solid #d4b87a; border-radius:8px; background:#fff; font-size:0.82rem; color:#1F2A22;">
            <option>Más relevantes</option>
            <option>Precio: menor a mayor</option>
            <option>Precio: mayor a menor</option>
            <option>Mejor calificados</option>
          </select>
        </div>
        @if (resultados().length > 0) {
          <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:16px;">
            @for (p of resultados(); track p.id) {
              <app-product-card [producto]="p"/>
            }
          </div>
        } @else {
          <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border-left:4px solid #FFCD00;">
            <p style="font-size:2rem; margin:0 0 12px;">🔍</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.2rem; font-weight:700; margin:0 0 6px;">Sin resultados</p>
            <p style="color:#57685c; font-size:0.9rem;">Intenta con otros filtros o términos de búsqueda.</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class BuscarComponent {
  query                  = '';
  precioMax              = signal(500000);
  ratingMin              = signal(0);
  categoriasSeleccionadas = signal<string[]>([]);
  regionesSeleccionadas  = signal<string[]>([]);
  filtrosAbiertos        = signal(false);

  categorias = CATEGORIAS.filter(c => c !== 'Todos');
  regiones   = REGIONES;

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const categoria = params.get('categoria');
        if (categoria && this.categorias.includes(categoria)) {
          this.categoriasSeleccionadas.set([categoria]);
        }
      });
  }

  resultados = computed(() => {
    const q      = this.query.toLowerCase();
    const cats   = this.categoriasSeleccionadas();
    const regs   = this.regionesSeleccionadas();
    const maxP   = this.precioMax();
    const minR   = this.ratingMin();
    return PRODUCTOS.filter(p =>
      (!q || p.nombre.toLowerCase().includes(q) || p.artesano.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)) &&
      (!cats.length || cats.includes(p.categoria)) &&
      (!regs.length || regs.some(r => p.region.includes(r))) &&
      p.precio <= maxP &&
      p.rating >= minR
    );
  });

  toggleCategoria(cat: string) {
    this.categoriasSeleccionadas.update(cs =>
      cs.includes(cat) ? cs.filter(c => c !== cat) : [...cs, cat]
    );
  }

  toggleRegion(reg: string) {
    this.regionesSeleccionadas.update(rs =>
      rs.includes(reg) ? rs.filter(r => r !== reg) : [...rs, reg]
    );
  }

  limpiarFiltros() {
    this.query = '';
    this.precioMax.set(500000);
    this.ratingMin.set(0);
    this.categoriasSeleccionadas.set([]);
    this.regionesSeleccionadas.set([]);
  }

  fmtPrice(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
