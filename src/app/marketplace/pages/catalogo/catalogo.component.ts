import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { DiscoverySectionComponent } from '../../shared/discovery-section/discovery-section.component';
import { PromoBannerComponent } from '../../shared/promo-banner/promo-banner.component';
import { PRODUCTOS, ARTESANOS, Producto } from '../../data/marketplace-data';

type BloqueProductos = { tipo: 'productos'; titulo: string; items: Producto[] };
type BloqueArtesanos = { tipo: 'artesanos' };
type BloquePromo = {
  tipo: 'promo'; titulo: string; subtitulo: string; ctaTexto: string; ctaRuta: string;
  color: string; imagenes: string[];
};
type Bloque = BloqueProductos | BloqueArtesanos | BloquePromo;

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, StarRatingComponent, RouterLink, DiscoverySectionComponent, PromoBannerComponent],
  styles: [`
    .hero-titulo {
      font-family: 'Playfair Display', serif;
      font-size: 2.4rem;
      color: #295440;
      font-weight: 700;
      margin: 0 0 12px;
      max-width: 480px;
      line-height: 1.15;
    }
    .hero-scrim {
      display: none;
    }
    @media (max-width: 700px) {
      .hero-content {
        padding: 28px 20px !important;
      }
      .hero-titulo {
        font-size: 1.7rem;
      }
      .hero-scrim {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(100deg, #F0EAE0 45%, rgba(240,234,224,0.55) 70%, transparent 100%);
      }
    }
  `],
  template: `
    <!-- Hero banner del catálogo -->
    <section style="position:relative; overflow:hidden; min-height:280px; display:flex; align-items:center;
                    background-color:#F0EAE0; background-image:url('/assets/hero_banner_1.jpg'); background-size:cover; background-position:right center; background-repeat:no-repeat;">
      <div class="hero-scrim"></div>
      <div class="hero-content" style="position:relative; z-index:2; padding:40px 32px; max-width:1200px; margin:0 auto; width:100%;">
        <h1 class="hero-titulo">
          Hecho por manos de aquí<span style="color:#E8871E;">.</span>
        </h1>
        <p style="color:#4B5A50; font-size:1rem; margin:0 0 24px; max-width:380px; line-height:1.4;">
          Descubre piezas únicas creadas por manos colombianas.
        </p>
        <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
          <a routerLink="/marketplace/buscar"
             style="display:inline-flex; align-items:center; gap:8px; background:#295440; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
            Explorar piezas <span>→</span>
          </a>
          <a routerLink="/marketplace/buscar"
             style="color:#295440; font-size:0.9rem; font-weight:600; text-decoration:underline; text-decoration-color:#FFCD00;">
            Conoce a los creadores
          </a>
        </div>
      </div>
    </section>

    <div style="max-width:1200px; margin:0 auto; padding:32px 16px;">

      <!-- Bloques de descubrimiento: secciones de productos, artesanos y promociones intercaladas -->
      @for (bloque of bloques; track $index) {
        @switch (bloque.tipo) {
          @case ('productos') {
            <app-discovery-section [titulo]="bloque.titulo">
              @for (p of bloque.items; track p.id) {
                <div style="width:230px; flex-shrink:0;">
                  <app-product-card [producto]="p"/>
                </div>
              }
            </app-discovery-section>
          }
          @case ('artesanos') {
            <app-discovery-section titulo="Artesanos Destacados">
              @for (a of artesanos; track a.id) {
                <a [routerLink]="['/marketplace/creadores', a.id]"
                   style="width:280px; flex-shrink:0; background:#fff; border-left:4px solid #FFCD00; border-radius:10px; padding:20px;
                          box-shadow:0 2px 12px rgba(41,84,64,0.09); display:flex; gap:14px; align-items:flex-start; text-decoration:none;">
                  <img [src]="a.avatar" [alt]="a.nombre"
                       style="width:52px; height:52px; border-radius:50%; object-fit:cover; border:3px solid #FFCD00; flex-shrink:0;">
                  <div style="flex:1; min-width:0;">
                    <p style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; color:#1F2A22; margin:0 0 2px; font-size:0.95rem;">{{ a.nombre }}</p>
                    <p style="color:#339496; font-size:0.78rem; font-weight:600; margin:0 0 4px;">{{ a.tipo }}</p>
                    <p style="color:#57685c; font-size:0.75rem; margin:0 0 6px;">📍 {{ a.ciudad }}</p>
                    <app-star-rating [rating]="a.rating" [count]="a.resenas"/>
                    <p style="color:#8a6040; font-size:0.72rem; margin:4px 0 0;">{{ a.productos }} productos activos</p>
                  </div>
                </a>
              }
            </app-discovery-section>
          }
          @case ('promo') {
            <app-promo-banner [titulo]="bloque.titulo" [subtitulo]="bloque.subtitulo"
                               [ctaTexto]="bloque.ctaTexto" [ctaRuta]="bloque.ctaRuta"
                               [color]="bloque.color" [imagenes]="bloque.imagenes"/>
          }
        }
      }

    </div>
  `,
})
export class CatalogoComponent {
  artesanos = ARTESANOS;

  private rotarLista<T>(lista: T[], offset: number): T[] {
    const n = lista.length;
    return Array.from({ length: n }, (_, i) => lista[(i + offset) % n]);
  }

  private seccionesProductos: { titulo: string; items: Producto[] }[] = [
    { titulo: 'Piezas que encontramos para ti', items: this.rotarLista(PRODUCTOS, 0) },
    { titulo: 'Relacionado con tus visitas',    items: this.rotarLista(PRODUCTOS, 3) },
    { titulo: 'Inspirado en tus favoritos',     items: this.rotarLista(PRODUCTOS, 5) },
    { titulo: 'Ofertas del día',                items: [...PRODUCTOS].reverse() },
  ];

  private promosCopy = [
    {
      titulo: 'Hay mucho por descubrir.',
      subtitulo: 'Miles de creaciones únicas hechas por manos colombianas con historias increíbles.',
      color: '#2C7350',
    },
    {
      titulo: 'Cada pieza tiene una historia.',
      subtitulo: 'Conoce el proceso y las manos detrás de cada creación artesanal colombiana.',
      color: '#8a6040',
    },
  ];

  bloques: Bloque[] = this.construirBloques();

  private construirBloques(): Bloque[] {
    const base: Bloque[] = [
      { tipo: 'artesanos' as const },
      ...this.seccionesProductos.map(s => ({ tipo: 'productos' as const, ...s })),
    ];

    const resultado: Bloque[] = [];
    let promoIndex = 0;

    base.forEach((bloque, i) => {
      resultado.push(bloque);
      const esUltimo = i === base.length - 1;
      if ((i + 1) % 3 === 0 && !esUltimo) {
        const copy = this.promosCopy[promoIndex % this.promosCopy.length];
        resultado.push({
          tipo: 'promo',
          ...copy,
          ctaTexto: 'Descubrir más',
          ctaRuta: '/marketplace/buscar',
          imagenes: this.rotarLista(PRODUCTOS, promoIndex * 2 + 1).slice(0, 4).map(p => p.imagen),
        });
        promoIndex++;
      }
    });

    return resultado;
  }
}
