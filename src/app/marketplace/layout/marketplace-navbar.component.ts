import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marketplace-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  styles: [`
    .mkt-cat-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 600;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
      background: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.80);
    }
    .mkt-cat-pill:hover {
      background: rgba(255,255,255,0.22);
      color: #fff;
    }
    .mkt-cat-pill.active {
      background: #C8921A;
      color: #fff;
      box-shadow: 0 2px 10px rgba(200,146,26,0.40);
    }
    .mkt-nav-action {
      color: rgba(255,255,255,0.80);
      font-size: 0.78rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.3;
      padding: 4px 10px;
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
      gap: 1px;
    }
    .mkt-nav-action:hover, .mkt-nav-action.active-page {
      background: rgba(255,255,255,0.15);
      color: #fff;
    }
  `],
  template: `
    <header style="background:#7D1C3A; position:sticky; top:0; z-index:50; box-shadow:0 3px 16px rgba(0,0,0,0.30);">

      <!-- ── Fila 1: Logo · Búsqueda · Acciones ── -->
      <div style="max-width:1200px; margin:0 auto; padding:0 1rem;">
        <div style="display:flex; align-items:center; gap:1rem; height:62px;">

          <!-- Logo -->
          <a routerLink="/marketplace/catalogo"
             style="display:flex; align-items:center; gap:9px; text-decoration:none; flex-shrink:0;">
            <img src="/assets/logo-corazon.png" alt="Caribe Artesanal"
                 style="height:40px; width:auto; object-fit:contain; filter:drop-shadow(0 1px 4px rgba(0,0,0,0.35));">
            <div style="line-height:1.1;">
              <div style="color:#fff; font-weight:800; font-size:0.92rem;
                          font-family:'Playfair Display',Georgia,serif; letter-spacing:0.3px;">Caribe</div>
              <div style="color:#C8921A; font-weight:800; font-size:0.92rem;
                          font-family:'Playfair Display',Georgia,serif; letter-spacing:0.3px;">Artesanal</div>
            </div>
          </a>

          <!-- Barra de búsqueda -->
          <div style="flex:1; max-width:540px; margin:0 auto;">
            <div style="display:flex; align-items:center; background:#fff; border-radius:8px;
                        overflow:hidden; border:2px solid #C8921A; box-shadow:0 1px 6px rgba(200,146,26,0.25);">
              <input [(ngModel)]="searchQuery"
                     placeholder="Buscar artesanías, libros, tejidos..."
                     style="flex:1; border:none; outline:none; padding:8px 12px;
                            font-size:0.88rem; color:#3D1A10; background:transparent;">
              <button style="padding:8px 15px; background:#C8921A; border:none;
                             cursor:pointer; color:#fff; font-size:1rem; line-height:1;">
                🔍
              </button>
            </div>
          </div>

          <!-- Acciones: Pedidos · Vender · Carrito · Ingresar -->
          <div style="display:flex; align-items:center; gap:4px; flex-shrink:0;">

            <a routerLink="/marketplace/pedidos" class="mkt-nav-action"
               routerLinkActive="active-page">
              <span style="font-size:1.1rem; line-height:1;">📦</span>
              <span>Pedidos</span>
            </a>

            <a routerLink="/marketplace/registro" class="mkt-nav-action"
               routerLinkActive="active-page">
              <span style="font-size:1.1rem; line-height:1;">🏪</span>
              <span>Vender</span>
            </a>

            <!-- Carrito con badge -->
            <a routerLink="/marketplace/pago"
               style="position:relative; color:#fff; text-decoration:none; padding:7px 11px;
                      border-radius:8px; background:rgba(255,255,255,0.14);
                      border:1px solid rgba(200,146,26,0.55); margin-left:4px;">
              <span style="font-size:1.2rem; line-height:1;">🛒</span>
              <span style="position:absolute; top:-5px; right:-5px; background:#C8921A; color:#fff;
                           font-size:0.62rem; font-weight:800; min-width:18px; height:18px;
                           border-radius:9px; display:flex; align-items:center; justify-content:center;
                           padding:0 3px; border:2px solid #7D1C3A;">2</span>
            </a>

            <button style="background:#C8921A; color:#fff; border:none; border-radius:8px;
                           padding:7px 15px; font-size:0.8rem; font-weight:700; cursor:pointer;
                           white-space:nowrap; margin-left:4px; letter-spacing:0.2px;">
              Ingresar
            </button>

          </div>
        </div>
      </div>

      <!-- ── Fila 2: Categorías como pills ── -->
      <div style="background:rgba(0,0,0,0.22); border-top:1px solid rgba(255,255,255,0.08);">
        <div style="max-width:1200px; margin:0 auto; padding:8px 1rem;
                    display:flex; align-items:center; gap:6px;
                    overflow-x:auto; scrollbar-width:none;">

          <!-- Páginas principales — routerLink + routerLinkActive para highlight correcto -->
          <a routerLink="/marketplace/catalogo"
             class="mkt-cat-pill"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact:true}">
            🛍️ Catálogo
          </a>

          <!-- Separador visual -->
          <span style="width:1px; height:20px; background:rgba(255,255,255,0.20);
                       flex-shrink:0; margin:0 4px;"></span>

          <!-- Filtros de categoría — estado manejado por signal (misma ruta /buscar) -->
          @for (cat of filtros; track cat.label) {
            <button class="mkt-cat-pill"
                    [class.active]="categoriaActiva() === cat.label"
                    (click)="seleccionar(cat)">
              {{ cat.icono }} {{ cat.label }}
            </button>
          }

          <!-- Separador + Vender -->
          <span style="width:1px; height:20px; background:rgba(255,255,255,0.20);
                       flex-shrink:0; margin:0 4px;"></span>
          <a routerLink="/marketplace/registro"
             class="mkt-cat-pill"
             routerLinkActive="active">
            🏪 Vender aquí
          </a>

        </div>
      </div>

    </header>
  `,
})
export class MarketplaceNavbarComponent {
  searchQuery     = '';
  categoriaActiva = signal('Todos');

  filtros = [
    { label: 'Todos',      icono: '✨', ruta: '/marketplace/catalogo' },
    { label: 'Tejidos',    icono: '🧶', ruta: '/marketplace/buscar'   },
    { label: 'Sombreros',  icono: '👒', ruta: '/marketplace/buscar'   },
    { label: 'Joyería',    icono: '💍', ruta: '/marketplace/buscar'   },
    { label: 'Cerámica',   icono: '🏺', ruta: '/marketplace/buscar'   },
    { label: 'Libros',     icono: '📚', ruta: '/marketplace/buscar'   },
  ];

  seleccionar(cat: { label: string; ruta: string }) {
    this.categoriaActiva.set(cat.label);
  }
}
