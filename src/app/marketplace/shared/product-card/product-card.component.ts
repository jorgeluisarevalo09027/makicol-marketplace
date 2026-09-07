import { Component, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Producto, ARTESANOS } from '../../data/marketplace-data';
import { SesionCompradorService } from '../services/sesion-comprador.service';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [StarRatingComponent, RouterLink],
  template: `
    <div (click)="irADetalle()"
         class="bg-white rounded-xl overflow-hidden shadow-sm border-b-2 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
         style="border-bottom-color:#FFCD00; position:relative;">

      <!-- Image -->
      <div class="relative overflow-hidden" style="aspect-ratio:4/3;">
        <img [src]="producto().imagen" [alt]="producto().nombre"
             class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
        <span class="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style="background:#2C7350;">
          {{ producto().categoria }}
        </span>
        @if (producto().vendidos > 200) {
          <span class="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style="background:#FFCD00;">
            ⭐ Destacado
          </span>
        }
        @if (sesion.sesionIniciada()) {
          <button (click)="$event.stopPropagation(); favoritos.toggle(producto().id)"
                  class="absolute flex items-center justify-center transition-transform duration-150 hover:scale-110"
                  style="bottom:8px; right:8px; width:32px; height:32px; border-radius:50%; border:none; cursor:pointer;
                         background:rgba(255,255,255,0.92); box-shadow:0 2px 6px rgba(0,0,0,0.18);"
                  [attr.aria-label]="favoritos.esFavorito(producto().id) ? 'Quitar de favoritos' : 'Guardar en favoritos'">
            <span [style.color]="favoritos.esFavorito(producto().id) ? '#C8102E' : '#8a9099'" style="font-size:1.05rem;">
              {{ favoritos.esFavorito(producto().id) ? '♥' : '♡' }}
            </span>
          </button>
        }
      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1 gap-2">
        <h3 class="font-bold text-sm leading-snug" style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22;">
          {{ producto().nombre }}
        </h3>
        <div class="text-xs" style="color:#57685c;">
          @if (artesanoId(); as id) {
            <a [routerLink]="['/marketplace/comprador/creadores', id]" (click)="$event.stopPropagation()"
               class="font-semibold" style="color:#295440; text-decoration:none;">
              {{ producto().artesano }}
            </a>
          } @else {
            <span class="font-semibold" style="color:#295440;">{{ producto().artesano }}</span>
          }
          · {{ producto().region }}
        </div>
        <app-star-rating [rating]="producto().rating" [count]="producto().resenas"/>
        <div class="mt-auto pt-2 flex items-end justify-between gap-2">
          <div>
            <p class="text-lg font-black" style="color:#295440;">
              {{ fmt(producto().precio) }}
            </p>
            <p class="text-xs" style="color:#8a6040;">COP · {{ producto().vendidos }} vendidos</p>
          </div>
          <button (click)="$event.stopPropagation(); addedToCart.set(true)"
                  class="text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
                  [style.background]="addedToCart() ? '#2ECC71' : '#2C7350'"
                  style="color:#fff; white-space:nowrap;">
            {{ addedToCart() ? '✓ Agregado' : '+ Carrito' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  producto    = input.required<Producto>();
  addedToCart = signal(false);

  constructor(private router: Router, public sesion: SesionCompradorService, public favoritos: FavoritosService) {}

  artesanoId(): number | null {
    return ARTESANOS.find(a => a.nombre === this.producto().artesano)?.id ?? null;
  }

  irADetalle() {
    this.router.navigate(['/marketplace/comprador/productos', this.producto().id]);
  }

  fmt(n: number): string {
    return '$\u00a0' + new Intl.NumberFormat('es-CO').format(n);
  }
}
