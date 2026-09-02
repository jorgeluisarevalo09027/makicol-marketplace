import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-artesano-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    .art-nav-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      font-size: 0.86rem;
      font-weight: 600;
      white-space: nowrap;
      text-decoration: none;
      border-radius: 8px;
      color: #295440;
      transition: background 0.15s, color 0.15s;
    }
    .art-nav-link:hover {
      background: rgba(41,84,64,0.08);
    }
    .art-nav-link.active {
      background: #2C7350;
      color: #fff;
    }
    @media (max-width: 700px) {
      .art-fila-inner {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .art-nav-links {
        justify-content: center;
        flex-wrap: wrap;
      }
      .art-actions {
        justify-content: center;
      }
    }
  `],
  template: `
    <header style="background:#fff; position:sticky; top:0; z-index:50; box-shadow:0 1px 3px rgba(0,0,0,0.08);">

      <!-- ── Barra decorativa superior ── -->
      <div style="background:#2C7350;">
        <div style="max-width:1200px; margin:0 auto; padding:6px 1rem;
                    display:flex; align-items:center; justify-content:space-between;
                    gap:12px; font-size:0.78rem; color:#fff; flex-wrap:wrap;">
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:16px; color:#FFCD00;">storefront</span>
            Panel de artesanos Makicol
          </span>
          <a routerLink="/marketplace/comprador/catalogo"
             style="color:#DCEFE4; text-decoration:none; font-weight:600;">
            ¿Buscas comprar? Ir al marketplace →
          </a>
        </div>
      </div>

      <div style="height:3px; background:linear-gradient(90deg,#FFCD00,#003893,#C8102E);"></div>

      <!-- ── Fila: Logo · Navegación · Acciones ── -->
      <div style="background:#FDFBF3;">
        <div class="art-fila-inner" style="max-width:1200px; margin:0 auto; padding:14px 1rem;
                    display:flex; align-items:center; justify-content:space-between; gap:16px;">

          <a routerLink="/marketplace/artesano/panel" style="display:flex; align-items:center; text-decoration:none; flex-shrink:0;">
            <span class="sr-only">Makicol Marketplace — Artesanos</span>
            <img src="/assets/makicol-logo-header.svg" alt="Makicol Marketplace"
                 style="height:34px; width:auto; object-fit:contain;">
          </a>

          @if (sesionIniciada()) {
            <nav class="art-nav-links" style="display:flex; align-items:center; gap:4px;">
              <a routerLink="/marketplace/artesano/panel" class="art-nav-link" routerLinkActive="active">
                <span class="material-symbols-outlined" style="font-size:1.1rem;">dashboard</span>
                Panel de ventas
              </a>
              <a routerLink="/marketplace/artesano/mis-productos" class="art-nav-link" routerLinkActive="active">
                <span class="material-symbols-outlined" style="font-size:1.1rem;">inventory_2</span>
                Mis productos
              </a>
              <a routerLink="/marketplace/artesano/ayuda" class="art-nav-link" routerLinkActive="active">
                <span class="material-symbols-outlined" style="font-size:1.1rem;">support_agent</span>
                Ayuda
              </a>
            </nav>
          }

          <div class="art-actions" style="display:flex; align-items:center; gap:10px; flex-shrink:0;">
            @if (!sesionIniciada()) {
              <a routerLink="/marketplace/artesano/registro" class="art-nav-link" style="color:#8a6040;">
                Quiero registrarme
              </a>
              <button (click)="sesionIniciada.set(true)"
                      style="background:#FFCD00; color:#295440; border:none; border-radius:8px;
                             padding:8px 16px; font-size:0.82rem; font-weight:700; cursor:pointer;
                             white-space:nowrap;">
                Ingresar
              </button>
            } @else {
              <span style="color:#57685c; font-size:0.82rem;">Hola, María 👋</span>
            }
          </div>

        </div>
      </div>
    </header>
  `,
})
export class ArtesanoNavbarComponent {
  sesionIniciada = signal(false);
}
