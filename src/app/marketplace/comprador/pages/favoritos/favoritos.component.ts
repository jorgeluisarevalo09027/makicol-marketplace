import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { FavoritosService } from '../../../shared/services/favoritos.service';
import { PRODUCTOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  template: `
    <div style="max-width:1100px; margin:0 auto; padding:32px 16px 48px;">

      <div style="margin-bottom:24px;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.5rem; font-weight:900; margin:0 0 4px;">
          Mis favoritos
        </h1>
        <p style="color:#57685c; font-size:0.9rem; margin:0;">
          Piezas que guardaste para revisar más tarde.
        </p>
      </div>

      @if (productosFavoritos().length) {
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:16px;">
          @for (p of productosFavoritos(); track p.id) {
            <app-product-card [producto]="p"/>
          }
        </div>
      } @else {
        <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border-left:4px solid #FFCD00;">
          <p style="font-size:2rem; margin:0 0 12px;">🤍</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.1rem; font-weight:700; margin:0 0 6px;">
            Aún no tienes favoritos
          </p>
          <p style="color:#57685c; font-size:0.9rem; margin:0 0 20px;">
            Toca el corazón en cualquier producto del catálogo para guardarlo aquí.
          </p>
          <a routerLink="/marketplace/comprador/catalogo"
             style="display:inline-flex; align-items:center; gap:8px; background:#295440; color:#fff; padding:12px 22px;
                    border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
            Ir al catálogo
          </a>
        </div>
      }
    </div>
  `,
})
export class FavoritosComponent {
  constructor(public favoritos: FavoritosService) {}

  productosFavoritos = computed(() => PRODUCTOS.filter(p => this.favoritos.ids().has(p.id)));
}
