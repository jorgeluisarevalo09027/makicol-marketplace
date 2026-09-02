import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StarRatingComponent } from '../../../shared/star-rating/star-rating.component';
import { DiscoverySectionComponent } from '../../../shared/discovery-section/discovery-section.component';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { ARTESANOS, PRODUCTOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [RouterLink, StarRatingComponent, DiscoverySectionComponent, ProductCardComponent],
  styles: [`
    .pd-grid {
      display: grid;
      grid-template-columns: minmax(0,1fr) minmax(0,1fr);
      gap: 36px;
    }
    @media (max-width: 700px) {
      .pd-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `],
  template: `
    @if (producto(); as p) {
      <div style="max-width:1100px; margin:0 auto; padding:24px 16px 48px;">

        <a routerLink="/marketplace/comprador/buscar"
           style="display:inline-flex; align-items:center; gap:6px; color:#295440; font-size:0.85rem;
                  font-weight:600; text-decoration:none; margin-bottom:20px;">
          ← Volver a la búsqueda
        </a>

        <div class="pd-grid">

          <!-- Imagen -->
          <div style="border-radius:14px; overflow:hidden; box-shadow:0 4px 20px rgba(41,84,64,0.12); aspect-ratio:4/3;">
            <img [src]="p.imagen" [alt]="p.nombre" style="width:100%; height:100%; object-fit:cover;">
          </div>

          <!-- Info -->
          <div>
            <span style="display:inline-block; background:#2C7350; color:#fff; font-size:0.75rem; font-weight:700;
                         padding:4px 12px; border-radius:14px; margin-bottom:12px;">
              {{ p.categoria }}
            </span>
            <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.7rem; font-weight:900; margin:0 0 10px;">
              {{ p.nombre }}
            </h1>

            <div style="margin-bottom:14px;">
              <app-star-rating [rating]="p.rating" [count]="p.resenas"/>
            </div>

            <p style="font-size:0.9rem; color:#57685c; margin:0 0 20px;">
              Por
              @if (artesanoId(); as id) {
                <a [routerLink]="['/marketplace/comprador/creadores', id]" style="color:#295440; font-weight:700; text-decoration:none;">{{ p.artesano }}</a>
              } @else {
                <span style="color:#295440; font-weight:700;">{{ p.artesano }}</span>
              }
              · 📍 {{ p.region }}
            </p>

            <p style="font-size:2rem; font-weight:900; color:#295440; margin:0 0 4px;">{{ fmt(p.precio) }}</p>
            <p style="font-size:0.8rem; color:#8a6040; margin:0 0 24px;">COP · {{ p.vendidos }} vendidos</p>

            <button (click)="addedToCart.set(true)"
                    style="width:100%; padding:14px; border:none; border-radius:10px; font-size:0.95rem; font-weight:700;
                           color:#fff; cursor:pointer; margin-bottom:28px; transition:background 0.2s;"
                    [style.background]="addedToCart() ? '#2ECC71' : '#2C7350'">
              {{ addedToCart() ? '✓ Agregado al carrito' : 'Agregar al carrito' }}
            </button>

            <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:10px; padding:20px; box-shadow:0 2px 12px rgba(41,84,64,0.08);">
              <h2 style="font-family:'Playfair Display',serif; color:#295440; font-size:1.05rem; font-weight:700; margin:0 0 10px;">
                Descripción
              </h2>
              <p style="color:#4B5A50; font-size:0.9rem; line-height:1.6; margin:0;">{{ p.descripcion }}</p>
            </div>
          </div>
        </div>

        <!-- Relacionados -->
        @if (relacionados().length) {
          <div style="margin-top:48px;">
            <app-discovery-section titulo="Piezas relacionadas">
              @for (r of relacionados(); track r.id) {
                <div style="width:230px; flex-shrink:0;">
                  <app-product-card [producto]="r"/>
                </div>
              }
            </app-discovery-section>
          </div>
        }

      </div>
    } @else {
      <div style="max-width:600px; margin:0 auto; padding:80px 16px; text-align:center;">
        <p style="color:#57685c; font-size:0.95rem; margin:0 0 20px;">No encontramos este producto.</p>
        <a routerLink="/marketplace/comprador/buscar"
           style="display:inline-flex; align-items:center; gap:8px; background:#295440; color:#fff; padding:12px 22px;
                  border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
          Ver más productos
        </a>
      </div>
    }
  `,
})
export class ProductoDetalleComponent {
  private idParam = signal<number | null>(null);
  addedToCart = signal(false);

  constructor(private route: ActivatedRoute) {
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const id = Number(params.get('id'));
        this.idParam.set(Number.isNaN(id) ? null : id);
        this.addedToCart.set(false);
      });
  }

  producto = computed(() => PRODUCTOS.find(p => p.id === this.idParam()) ?? null);

  artesanoId(): number | null {
    const p = this.producto();
    return p ? ARTESANOS.find(a => a.nombre === p.artesano)?.id ?? null : null;
  }

  relacionados = computed(() => {
    const p = this.producto();
    if (!p) return [];
    return PRODUCTOS.filter(x => x.categoria === p.categoria && x.id !== p.id);
  });

  fmt(n: number): string {
    return '$\u00a0' + new Intl.NumberFormat('es-CO').format(n);
  }
}
