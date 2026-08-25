import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ARTESANOS, PRODUCTOS } from '../../data/marketplace-data';

@Component({
  selector: 'app-creador-detalle',
  standalone: true,
  imports: [RouterLink, StarRatingComponent, ProductCardComponent],
  template: `
    @if (artesano(); as a) {
      <!-- Portada -->
      <div style="height:220px; background-size:cover; background-position:center; position:relative;"
           [style.background-image]="'url(' + a.portada + ')'">
        <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35));"></div>
      </div>

      <div style="max-width:900px; margin:0 auto; padding:0 16px 48px;">

        <!-- Header perfil -->
        <div style="display:flex; gap:20px; align-items:flex-end; margin-top:-56px; margin-bottom:24px; flex-wrap:wrap; position:relative; z-index:1;">
          <img [src]="a.avatar" [alt]="a.nombre"
               style="width:112px; height:112px; border-radius:50%; object-fit:cover; border:4px solid #fff; box-shadow:0 4px 16px rgba(0,0,0,0.2); flex-shrink:0;">
          <div style="flex:1; min-width:220px; padding-bottom:6px;">
            <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.6rem; font-weight:900; margin:0 0 2px;">
              {{ a.nombre }}
            </h1>
            <p style="color:#339496; font-size:0.9rem; font-weight:700; margin:0 0 4px;">{{ a.tipo }} · 📍 {{ a.ciudad }}</p>
            <app-star-rating [rating]="a.rating" [count]="a.resenas"/>
          </div>
          <a routerLink="/marketplace/creadores"
             style="padding:9px 16px; background:#F2F6F4; color:#295440; border:1.5px solid #C6D7CD; border-radius:8px;
                    text-decoration:none; font-weight:700; font-size:0.82rem; white-space:nowrap;">
            ← Todos los creadores
          </a>
        </div>

        <!-- Estadísticas -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:12px; margin-bottom:28px;">
          <div style="background:#fff; border-radius:10px; padding:14px; text-align:center; box-shadow:0 2px 10px rgba(41,84,64,0.08);">
            <p style="font-size:1.3rem; font-weight:900; color:#295440; margin:0;">{{ a.anioInicio }}</p>
            <p style="font-size:0.72rem; color:#57685c; margin:2px 0 0;">Desde</p>
          </div>
          <div style="background:#fff; border-radius:10px; padding:14px; text-align:center; box-shadow:0 2px 10px rgba(41,84,64,0.08);">
            <p style="font-size:1.3rem; font-weight:900; color:#295440; margin:0;">{{ a.productos }}</p>
            <p style="font-size:0.72rem; color:#57685c; margin:2px 0 0;">Productos activos</p>
          </div>
          <div style="background:#fff; border-radius:10px; padding:14px; text-align:center; box-shadow:0 2px 10px rgba(41,84,64,0.08);">
            <p style="font-size:1.3rem; font-weight:900; color:#295440; margin:0;">{{ a.rating }}★</p>
            <p style="font-size:0.72rem; color:#57685c; margin:2px 0 0;">{{ a.resenas }} reseñas</p>
          </div>
        </div>

        <!-- Historia -->
        <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:10px; padding:24px; margin-bottom:28px; box-shadow:0 2px 12px rgba(41,84,64,0.08);">
          <h2 style="font-family:'Playfair Display',serif; color:#295440; font-size:1.2rem; font-weight:700; margin:0 0 12px;">
            Nuestra historia
          </h2>
          <p style="color:#4B5A50; font-size:0.92rem; line-height:1.6; margin:0 0 16px;">{{ a.bio }}</p>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            @for (m of a.materiales; track m) {
              <span style="background:#F2F6F4; color:#295440; font-size:0.75rem; font-weight:600; padding:5px 12px; border-radius:14px;">
                {{ m }}
              </span>
            }
          </div>
        </div>

        <!-- Piezas del artesano -->
        <div>
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.3rem; font-weight:700; margin:0 0 18px;">
            Piezas de {{ a.nombre }}
          </h2>
          @if (productosDelArtesano().length) {
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:18px;">
              @for (p of productosDelArtesano(); track p.id) {
                <app-product-card [producto]="p"/>
              }
            </div>
          } @else {
            <p style="color:#57685c; font-size:0.88rem;">Este creador aún no tiene productos publicados.</p>
          }
        </div>

      </div>
    } @else {
      <div style="max-width:600px; margin:0 auto; padding:80px 16px; text-align:center;">
        <p style="color:#57685c; font-size:0.95rem; margin:0 0 20px;">No encontramos este creador.</p>
        <a routerLink="/marketplace/creadores"
           style="display:inline-flex; align-items:center; gap:8px; background:#295440; color:#fff; padding:12px 22px;
                  border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
          Ver todos los creadores
        </a>
      </div>
    }
  `,
})
export class CreadorDetalleComponent {
  private idParam = signal<number | null>(null);

  constructor(private route: ActivatedRoute) {
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const id = Number(params.get('id'));
        this.idParam.set(Number.isNaN(id) ? null : id);
      });
  }

  artesano = computed(() => ARTESANOS.find(a => a.id === this.idParam()) ?? null);

  productosDelArtesano = computed(() => {
    const a = this.artesano();
    return a ? PRODUCTOS.filter(p => p.artesano === a.nombre) : [];
  });
}
