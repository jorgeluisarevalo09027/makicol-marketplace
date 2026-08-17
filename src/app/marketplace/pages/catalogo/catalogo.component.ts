import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { PRODUCTOS, ARTESANOS, CATEGORIAS } from '../../data/marketplace-data';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, StarRatingComponent, RouterLink],
  template: `
    <!-- Hero banner del catálogo -->
    <section style="position:relative; overflow:hidden; background:#2C7350; min-height:240px; display:flex; align-items:center;">
      <img src="/assets/artesanias.png" alt="Artesanías colombianas"
           style="position:absolute; right:0; top:0; height:100%; width:50%; object-fit:cover; object-position:center; opacity:0.35;">
      <img src="/assets/decoracion-esquina.png" alt=""
           style="position:absolute; left:0; top:0; height:100%; opacity:0.18; object-fit:cover; width:200px;">
      <div style="position:relative; z-index:2; padding:40px 32px; max-width:1200px; margin:0 auto; width:100%;">
        <p style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:400; font-size:1.1rem; color:#FFCD00; margin:0 0 4px; letter-spacing:0.3px;">
          Hecho a mano, hecho en Colombia
        </p>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2rem; color:#fff; font-weight:800; margin:0 0 8px;">
          Artesanías colombianas de todo el país
        </h1>
        <p style="color:rgba(255,255,255,0.75); font-size:0.95rem; margin:0 0 20px;">
          {{ productosFiltrados().length }} productos disponibles de artesanos verificados
        </p>
        <a routerLink="/marketplace/buscar"
           style="display:inline-flex; align-items:center; gap:8px; background:#FFCD00; color:#295440; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
          🔍 Explorar con filtros
        </a>
      </div>
    </section>

    <div style="max-width:1200px; margin:0 auto; padding:32px 16px;">

      <!-- Filtro por categoría -->
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px;">
        @for (cat of categorias; track cat) {
          <button (click)="categoriaActiva.set(cat)"
                  style="padding:7px 16px; border-radius:20px; border:2px solid; font-size:0.85rem; font-weight:600; cursor:pointer; transition:all 0.2s;"
                  [style.background]="categoriaActiva() === cat ? '#2C7350' : '#F2F6F4'"
                  [style.border-color]="categoriaActiva() === cat ? '#2C7350' : '#C6D7CD'"
                  [style.color]="categoriaActiva() === cat ? '#fff' : '#295440'">
            {{ cat }}
          </button>
        }
      </div>

      <!-- Grid de productos -->
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(230px, 1fr)); gap:20px; margin-bottom:48px;">
        @for (p of productosFiltrados(); track p.id) {
          <app-product-card [producto]="p"/>
        }
      </div>

      <!-- Separador dorado -->
      <hr style="border:none; height:2px; background:linear-gradient(90deg,transparent,#FFCD00 30%,#FFCD00 70%,transparent); opacity:0.5; margin:0 0 40px;">

      <!-- Artesanos destacados -->
      <div style="margin-bottom:48px;">
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
          <div style="flex:1; height:2px; max-width:120px; background:linear-gradient(to right,transparent,#FFCD00);"></div>
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.6rem; font-weight:700; margin:0; white-space:nowrap;">
            Artesanos Destacados
          </h2>
          <div style="flex:1; height:2px; max-width:120px; background:linear-gradient(to left,transparent,#FFCD00);"></div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:16px;">
          @for (a of artesanos; track a.id) {
            <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:10px; padding:20px; box-shadow:0 2px 12px rgba(41,84,64,0.09); display:flex; gap:14px; align-items:flex-start;">
              <div style="width:52px; height:52px; border-radius:50%; background:#FDFBF3; border:3px solid #FFCD00; display:flex; align-items:center; justify-content:center; font-size:1.6rem; flex-shrink:0;">
                {{ a.icono }}
              </div>
              <div style="flex:1; min-width:0;">
                <p style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; color:#1F2A22; margin:0 0 2px; font-size:0.95rem;">{{ a.nombre }}</p>
                <p style="color:#339496; font-size:0.78rem; font-weight:600; margin:0 0 4px;">{{ a.tipo }}</p>
                <p style="color:#57685c; font-size:0.75rem; margin:0 0 6px;">📍 {{ a.region }}</p>
                <app-star-rating [rating]="a.rating" [count]="a.resenas"/>
                <p style="color:#8a6040; font-size:0.72rem; margin:4px 0 0;">{{ a.productos }} productos activos</p>
              </div>
            </div>
          }
        </div>
      </div>

    </div>
  `,
})
export class CatalogoComponent {
  categorias        = CATEGORIAS;
  artesanos         = ARTESANOS;
  categoriaActiva   = signal('Todos');
  productosFiltrados = computed(() =>
    this.categoriaActiva() === 'Todos'
      ? PRODUCTOS
      : PRODUCTOS.filter(p => p.categoria === this.categoriaActiva())
  );
}
