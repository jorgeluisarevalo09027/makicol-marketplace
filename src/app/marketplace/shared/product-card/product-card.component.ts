import { Component, input, signal } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Producto } from '../../data/marketplace-data';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [StarRatingComponent],
  template: `
    <div class="bg-white rounded-xl overflow-hidden shadow-sm border-b-2 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
         style="border-bottom-color:#C8921A;">

      <!-- Image -->
      <div class="relative overflow-hidden" style="aspect-ratio:4/3;">
        <img [src]="producto().imagen" [alt]="producto().nombre"
             class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
        <span class="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style="background:#7D1C3A;">
          {{ producto().categoria }}
        </span>
        @if (producto().vendidos > 200) {
          <span class="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style="background:#C8921A;">
            ⭐ Destacado
          </span>
        }
      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1 gap-2">
        <h3 class="font-bold text-sm leading-snug" style="font-family:'Playfair Display',Georgia,serif; color:#3D1A10;">
          {{ producto().nombre }}
        </h3>
        <div class="text-xs" style="color:#7a5030;">
          <span class="font-semibold" style="color:#7D1C3A;">{{ producto().artesano }}</span>
          · {{ producto().region }}
        </div>
        <app-star-rating [rating]="producto().rating" [count]="producto().resenas"/>
        <div class="mt-auto pt-2 flex items-end justify-between gap-2">
          <div>
            <p class="text-lg font-black" style="color:#7D1C3A;">
              {{ fmt(producto().precio) }}
            </p>
            <p class="text-xs" style="color:#8a6040;">COP · {{ producto().vendidos }} vendidos</p>
          </div>
          <button (click)="addedToCart.set(true)"
                  class="text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
                  [style.background]="addedToCart() ? '#2AB8B0' : '#7D1C3A'"
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

  fmt(n: number): string {
    return '$\u00a0' + new Intl.NumberFormat('es-CO').format(n);
  }
}
