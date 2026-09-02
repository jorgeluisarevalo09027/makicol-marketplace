import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../../shared/star-rating/star-rating.component';
import { ARTESANOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-creadores',
  standalone: true,
  imports: [RouterLink, StarRatingComponent],
  template: `
    <!-- Header -->
    <div style="background:#2C7350; padding:32px 16px;">
      <div style="max-width:900px; margin:0 auto; text-align:center;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#fff; font-size:1.8rem; font-weight:900; margin:0 0 8px;">
          Nuestros Creadores
        </h1>
        <p style="color:#DCEFE4; font-size:0.9rem; margin:0;">
          Conoce a las manos y las historias detrás de cada pieza artesanal.
        </p>
      </div>
    </div>

    <div style="max-width:1100px; margin:0 auto; padding:28px 16px 48px;">

      <!-- Filtros -->
      <div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-end; margin-bottom:28px;
                  background:#fff; padding:18px 20px; border-radius:12px; box-shadow:0 2px 12px rgba(41,84,64,0.08);">
        <div style="flex:1; min-width:180px;">
          <label style="display:block; font-size:0.75rem; font-weight:700; color:#295440; margin-bottom:6px;">Ciudad</label>
          <select [value]="ciudadActiva()" (change)="ciudadActiva.set($any($event.target).value)"
                  style="width:100%; padding:8px 10px; border-radius:8px; border:1.5px solid #C6D7CD; font-size:0.85rem; color:#1F2A22; background:#fff;">
            <option value="">Todas</option>
            @for (c of ciudades; track c) {
              <option [value]="c">{{ c }}</option>
            }
          </select>
        </div>

        <div style="flex:1; min-width:180px;">
          <label style="display:block; font-size:0.75rem; font-weight:700; color:#295440; margin-bottom:6px;">Oficio</label>
          <select [value]="oficioActivo()" (change)="oficioActivo.set($any($event.target).value)"
                  style="width:100%; padding:8px 10px; border-radius:8px; border:1.5px solid #C6D7CD; font-size:0.85rem; color:#1F2A22; background:#fff;">
            <option value="">Todos</option>
            @for (t of oficios; track t) {
              <option [value]="t">{{ t }}</option>
            }
          </select>
        </div>

        <div style="flex:1; min-width:180px;">
          <label style="display:block; font-size:0.75rem; font-weight:700; color:#295440; margin-bottom:6px;">Ordenar por</label>
          <select [value]="orden()" (change)="orden.set($any($event.target).value)"
                  style="width:100%; padding:8px 10px; border-radius:8px; border:1.5px solid #C6D7CD; font-size:0.85rem; color:#1F2A22; background:#fff;">
            <option value="rating">Mejor calificados</option>
            <option value="productos">Más productos</option>
            <option value="nombre">Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Grid de artesanos -->
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:20px;">
        @for (a of artesanosFiltrados(); track a.id) {
          <a [routerLink]="['/marketplace/comprador/creadores', a.id]"
             style="background:#fff; border-radius:12px; overflow:hidden; text-decoration:none;
                    box-shadow:0 2px 12px rgba(41,84,64,0.09); transition:transform 0.2s, box-shadow 0.2s; display:block;">
            <div style="height:90px; background-size:cover; background-position:center;"
                 [style.background-image]="'url(' + a.portada + ')'"></div>
            <div style="padding:16px; margin-top:-38px;">
              <img [src]="a.avatar" [alt]="a.nombre"
                   style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:3px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.15); display:block; margin-bottom:10px;">
              <p style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; color:#1F2A22; margin:0 0 2px; font-size:1rem;">{{ a.nombre }}</p>
              <p style="color:#339496; font-size:0.8rem; font-weight:600; margin:0 0 4px;">{{ a.tipo }}</p>
              <p style="color:#57685c; font-size:0.78rem; margin:0 0 8px;">📍 {{ a.ciudad }}</p>
              <app-star-rating [rating]="a.rating" [count]="a.resenas"/>
              <p style="color:#8a6040; font-size:0.75rem; margin:8px 0 0;">{{ a.productos }} productos activos</p>
            </div>
          </a>
        }
      </div>

      @if (!artesanosFiltrados().length) {
        <p style="text-align:center; color:#57685c; padding:40px 0;">No encontramos creadores con esos filtros.</p>
      }

    </div>
  `,
})
export class CreadoresComponent {
  private todos = ARTESANOS;

  ciudades = [...new Set(ARTESANOS.map(a => a.ciudad))];
  oficios  = [...new Set(ARTESANOS.map(a => a.tipo))];

  ciudadActiva = signal('');
  oficioActivo = signal('');
  orden        = signal<'rating' | 'productos' | 'nombre'>('rating');

  artesanosFiltrados = computed(() => {
    let lista = this.todos.filter(a =>
      (!this.ciudadActiva() || a.ciudad === this.ciudadActiva()) &&
      (!this.oficioActivo() || a.tipo === this.oficioActivo())
    );

    lista = [...lista].sort((a, b) => {
      switch (this.orden()) {
        case 'productos': return b.productos - a.productos;
        case 'nombre':    return a.nombre.localeCompare(b.nombre);
        default:          return b.rating - a.rating;
      }
    });

    return lista;
  });
}
