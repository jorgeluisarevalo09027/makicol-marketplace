import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SesionCompradorService } from '../../shared/services/sesion-comprador.service';

@Component({
  selector: 'app-comprador-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  styles: [`
    .mkt-cat-link {
      display: inline-flex;
      align-items: center;
      padding: 6px 10px;
      font-size: 0.86rem;
      font-weight: 600;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      border: none;
      background: transparent;
      color: #295440;
      transition: color 0.15s;
    }
    .mkt-cat-link:hover {
      color: #2C7350;
    }
    .mkt-cat-link.active {
      color: #2C7350;
      font-weight: 800;
    }
    .mkt-dropdown-item:hover {
      background: #F2F6F4;
    }
    .mkt-nav-action {
      color: #295440;
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
      background: rgba(41,84,64,0.08);
    }
    .mkt-promo-banner {
      height: 44px; width: auto; max-width: 260px; object-fit: contain;
      border-radius: 22px; flex-shrink: 0;
    }
    .mkt-search-wrap {
      flex: 1; min-width: 0; max-width: 540px; margin: 0 auto;
    }
    .mkt-promo-mobile-row {
      display: none;
    }
    @media (max-width: 700px) {
      .mkt-promo-banner {
        display: none;
      }
      .mkt-promo-mobile-row {
        display: flex;
        justify-content: center;
        padding: 8px 1rem 10px;
        background: #fff;
        border-top: 1px solid rgba(41,84,64,0.06);
      }
      .mkt-promo-mobile-row img {
        max-width: 100%;
        height: 42px;
        width: auto;
        object-fit: contain;
        border-radius: 21px;
      }
      .mkt-fila2-inner {
        flex-direction: column;
        align-items: stretch;
      }
      .mkt-nav-links {
        order: 2;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
      }
      .mkt-actions {
        order: 1;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        border-bottom: 1px solid rgba(41,84,64,0.08);
        padding-bottom: 8px;
      }
    }
  `],
  template: `
    <header style="background:#fff; position:sticky; top:0; z-index:50; box-shadow:0 1px 3px rgba(0,0,0,0.08);">

      <!-- ── Barra decorativa superior ── -->
      <div style="background:#295440;">
        <div style="max-width:1200px; margin:0 auto; padding:6px 1rem;
                    display:flex; align-items:center; justify-content:space-between;
                    gap:12px; font-size:0.78rem; color:#fff; flex-wrap:wrap;">
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:16px; color:#FFCD00;">local_shipping</span>
            Envíos a toda Colombia
          </span>
          <a routerLink="/marketplace/artesano/panel"
             style="color:#DCEFE4; text-decoration:none; font-weight:600;">
            ¿Eres artesano? Vende aquí →
          </a>
        </div>
      </div>

      <div style="height:3px; background:linear-gradient(90deg,#FFCD00,#003893,#C8102E);"></div>

      <!-- ── Fila 1: Logo · Búsqueda · Acciones ── -->
      <div style="max-width:1200px; margin:0 auto; padding:0 1rem;">
        <div style="display:flex; align-items:center; gap:1rem; height:66px;">

          <!-- Logo oficial — imagen real del lockup horizontal, fondo blanco = máxima fidelidad de color.
               El span sr-only aporta el nombre como texto real (SEO/lectores de pantalla) sin duplicarlo
               visualmente ni competir con el <h1> propio de cada página (evitamos múltiples h1 por página). -->
          <a routerLink="/marketplace/comprador/catalogo" style="display:flex; align-items:center; text-decoration:none; flex-shrink:0;">
            <span class="sr-only">Makicol Marketplace</span>
            <img src="/assets/makicol-logo-header.svg" alt="Makicol Marketplace"
                 style="height:38px; width:auto; object-fit:contain;">
          </a>

          <!-- Barra de búsqueda -->
          <div class="mkt-search-wrap">
            <div style="display:flex; align-items:center; background:#FDFBF3; border-radius:8px;
                        overflow:hidden; border:2px solid #DAAF37;">
              <input [(ngModel)]="searchQuery"
                     placeholder="Buscar artesanías, libros, tejidos..."
                     style="flex:1; min-width:0; border:none; outline:none; padding:8px 12px;
                            font-size:0.88rem; color:#1F2A22; background:transparent;">
              <button style="padding:8px 15px; background:#FFCD00; border:none;
                             cursor:pointer; color:#295440; font-size:1rem; line-height:1; flex-shrink:0;">
                🔍
              </button>
            </div>
          </div>

          <!-- Banner promocional -->
          <img src="/assets/D_NQ_629384-MLA115900532115_082026-OO.webp" alt="Promoción meli+"
               class="mkt-promo-banner">

        </div>
      </div>

      <!-- ── Fila publicidad (solo mobile) ── -->
      <div class="mkt-promo-mobile-row">
        <img src="/assets/D_NQ_629384-MLA115900532115_082026-OO.webp" alt="Promoción meli+">
      </div>

      <!-- ── Fila 2: Categorías + Acciones ── -->
      <div style="background:#FDFBF3; border-top:1px solid rgba(41,84,64,0.08);">
        <div class="mkt-fila2-inner" style="max-width:1200px; margin:0 auto; padding:8px 1rem;
                    display:flex; align-items:center; justify-content:space-between;
                    gap:12px; flex-wrap:wrap;">

          <!-- Navegación principal -->
          <div class="mkt-nav-links" style="display:flex; align-items:center; gap:2px; flex-shrink:0; position:relative;">
            <a routerLink="/marketplace/comprador/catalogo"
               class="mkt-cat-link"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact:true}">
              Catálogo
            </a>

            <!-- Dropdown Categorías -->
            <div style="position:relative;">
              <button class="mkt-cat-link"
                      [class.active]="categoriasMenuAbierto()"
                      (click)="$event.stopPropagation(); categoriasMenuAbierto.set(!categoriasMenuAbierto())"
                      style="display:inline-flex; align-items:center; gap:2px;">
                Categorías
                <span class="material-symbols-outlined" style="font-size:18px;">
                  {{ categoriasMenuAbierto() ? 'expand_less' : 'expand_more' }}
                </span>
              </button>

              @if (categoriasMenuAbierto()) {
                <div (click)="$event.stopPropagation()"
                     style="position:absolute; top:calc(100% + 8px); left:0; background:#fff; border-radius:10px;
                            box-shadow:0 8px 24px rgba(0,0,0,0.15); border:1px solid #EFE9DD; min-width:180px;
                            padding:6px; z-index:60;">
                  @for (cat of filtros; track cat) {
                    <a routerLink="/marketplace/comprador/buscar"
                       [queryParams]="{ categoria: cat }"
                       (click)="categoriasMenuAbierto.set(false)"
                       class="mkt-dropdown-item"
                       style="display:block; padding:9px 14px; border-radius:6px; text-decoration:none;
                              color:#1F2A22; font-size:0.85rem; font-weight:600; transition:background 0.15s;">
                      {{ cat }}
                    </a>
                  }
                </div>
              }
            </div>

            <a routerLink="/marketplace/comprador/creadores" class="mkt-cat-link" routerLinkActive="active">Creadores</a>
            <a routerLink="/marketplace/comprador/historias" class="mkt-cat-link" routerLinkActive="active">Historias</a>
            <a routerLink="/marketplace/comprador/sobre-maki" class="mkt-cat-link" routerLinkActive="active">Sobre Maki</a>
          </div>

          <!-- Acciones: Ingresar → (Mis pedidos · Carrito · Dirección) -->
          <div class="mkt-actions" style="display:flex; align-items:center; gap:4px; flex-shrink:0;">

            @if (!sesion.sesionIniciada()) {
              <button (click)="sesion.iniciarSesion()"
                      style="background:#FFCD00; color:#295440; border:none; border-radius:8px;
                             padding:7px 15px; font-size:0.8rem; font-weight:700; cursor:pointer;
                             white-space:nowrap; letter-spacing:0.2px;">
                Ingresar
              </button>
            } @else {
              <a routerLink="/marketplace/comprador/mis-pedidos" class="mkt-nav-action"
                 routerLinkActive="active-page">
                <span class="material-symbols-outlined" style="font-size:1.1rem; line-height:1;">inventory_2</span>
                <span>Mis pedidos</span>
              </a>

              <a routerLink="/marketplace/comprador/favoritos" class="mkt-nav-action"
                 routerLinkActive="active-page">
                <span class="material-symbols-outlined" style="font-size:1.1rem; line-height:1;">favorite</span>
                <span>Favoritos</span>
              </a>

              <a routerLink="/marketplace/comprador/ayuda" class="mkt-nav-action"
                 routerLinkActive="active-page">
                <span class="material-symbols-outlined" style="font-size:1.1rem; line-height:1;">support_agent</span>
                <span>Ayuda</span>
              </a>

              <!-- Carrito con badge -->
              <a routerLink="/marketplace/comprador/pago"
                 style="position:relative; color:#295440; text-decoration:none; padding:7px 11px;
                        border-radius:8px; background:rgba(41,84,64,0.06);
                        border:1px solid rgba(41,84,64,0.18); margin-left:4px;">
                <span class="material-symbols-outlined" style="font-size:1.2rem; line-height:1;">shopping_cart</span>
                <span style="position:absolute; top:-5px; right:-5px; background:#C8102E; color:#fff;
                             font-size:0.62rem; font-weight:800; min-width:18px; height:18px;
                             border-radius:9px; display:flex; align-items:center; justify-content:center;
                             padding:0 3px; border:2px solid #fff;">2</span>
              </a>

              <!-- Pill de dirección de entrega -->
              <button (click)="modalDireccionAbierto.set(true)"
                      style="display:flex; align-items:center; gap:6px;  color:#295440;
                             border:none; border-radius:8px; padding:5px 12px; margin-left:4px;
                             cursor:pointer; text-align:left; line-height:1.2;">
                <span class="material-symbols-outlined" style="font-size:1.3rem;">location_on</span>
                <span>
                  <span style="display:block; font-size:0.68rem; opacity:0.75;">Enviar a Ana</span>
                  <span style="display:block; font-size:0.78rem; font-weight:700; max-width:150px;
                               overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">San Lucas La Quinta ...</span>
                </span>
              </button>
            }

          </div>

        </div>
      </div>

      <!-- ── Modal: seleccionar dirección de entrega ── -->
      @if (modalDireccionAbierto()) {
        <div (click)="modalDireccionAbierto.set(false)"
             style="position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:100;
                    display:flex; align-items:center; justify-content:center;">
          <div (click)="$event.stopPropagation()"
               style="background:#fff; border-radius:12px; padding:24px; width:100%; max-width:380px;
                      box-shadow:0 12px 40px rgba(0,0,0,0.25);">
            <h3 style="margin:0 0 16px; font-size:1.05rem; color:#1F2A22; font-weight:700;">
              Elegir dirección de entrega
            </h3>

            @for (dir of direcciones; track dir.id) {
              <label style="display:flex; align-items:flex-start; gap:10px; padding:10px 0;
                             border-bottom:1px solid #F0EAE0; cursor:pointer;">
                <input type="radio" name="direccion" [checked]="dir.id === direccionSeleccionada()"
                       (change)="direccionSeleccionada.set(dir.id)"
                       style="margin-top:3px;">
                <span>
                  <span style="display:block; font-weight:600; font-size:0.9rem; color:#1F2A22;">{{ dir.titulo }}</span>
                  <span style="display:block; font-size:0.8rem; color:#57685c;">{{ dir.detalle }}</span>
                </span>
              </label>
            }

            <div style="display:flex; gap:10px; margin-top:20px;">
              <button (click)="modalDireccionAbierto.set(false)"
                      style="flex:1; background:#295440; color:#fff; border:none; border-radius:8px;
                             padding:10px; font-size:0.85rem; font-weight:700; cursor:pointer;">
                Confirmar
              </button>
              <button (click)="modalDireccionAbierto.set(false)"
                      style="flex:1; background:#F2F6F4; color:#295440; border:1.5px solid #C6D7CD; border-radius:8px;
                             padding:10px; font-size:0.85rem; font-weight:700; cursor:pointer;">
                + Agregar dirección
              </button>
            </div>
          </div>
        </div>
      }

    </header>
  `,
})
export class CompradorNavbarComponent {
  searchQuery = '';

  categoriasMenuAbierto = signal(false);

  modalDireccionAbierto = signal(false);
  direccionSeleccionada = signal(1);

  constructor(public sesion: SesionCompradorService) {}

  @HostListener('document:click')
  cerrarCategoriasMenu() {
    this.categoriasMenuAbierto.set(false);
  }

  direcciones = [
    { id: 1, titulo: 'Casa',    detalle: 'San Lucas La Quinta, Bogotá' },
    { id: 2, titulo: 'Trabajo', detalle: 'Cra 45 #12-34, Medellín' },
    { id: 3, titulo: 'Otra',    detalle: 'Calle 10 #5-67, Cali' },
  ];

  filtros = ['Todos', 'Tejidos', 'Sombreros', 'Joyería', 'Cerámica', 'Libros'];
}
