import { Component, signal } from '@angular/core';
import { PRODUCTOS, ARTESANO_ACTUAL } from '../../../data/marketplace-data';

@Component({
  selector: 'app-mis-productos',
  standalone: true,
  imports: [],
  styles: [`
    .mprod-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 18px;
    }
  `],
  template: `
    <div style="max-width:1100px; margin:0 auto; padding:32px 16px 48px;">

      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:28px; flex-wrap:wrap;">
        <div>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.6rem; font-weight:900; margin:0 0 4px;">
            Mis productos
          </h1>
          <p style="color:#57685c; font-size:0.9rem; margin:0;">
            Gestiona el catálogo de {{ artesano.nombre }} · {{ productos.length }} productos publicados
          </p>
        </div>
        <button (click)="mostrarFormulario.set(true)"
                style="padding:10px 20px; background:#2C7350; color:#fff; border:none; border-radius:8px;
                       font-size:0.88rem; font-weight:700; cursor:pointer; white-space:nowrap;">
          + Agregar producto
        </button>
      </div>

      @if (mostrarFormulario()) {
        <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:12px; padding:24px; margin-bottom:28px; box-shadow:0 2px 12px rgba(41,84,64,0.09);">
          <p style="color:#295440; font-weight:700; font-size:0.95rem; margin:0 0 6px;">📸 Nuevo producto (demo visual)</p>
          <p style="color:#57685c; font-size:0.85rem; margin:0 0 16px;">
            En la versión final aquí irá el formulario de alta de producto (fotos, precio, categoría, stock).
          </p>
          <button (click)="mostrarFormulario.set(false)"
                  style="padding:8px 18px; background:#F2F6F4; color:#295440; border:1.5px solid #C6D7CD; border-radius:8px; font-size:0.85rem; font-weight:700; cursor:pointer;">
            Cerrar
          </button>
        </div>
      }

      @if (productos.length) {
        <div class="mprod-grid">
          @for (p of productos; track p.id) {
            <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(41,84,64,0.09); display:flex; flex-direction:column;">
              <div style="position:relative; aspect-ratio:4/3;">
                <img [src]="p.imagen" [alt]="p.nombre" style="width:100%; height:100%; object-fit:cover;">
                <span style="position:absolute; top:8px; left:8px; padding:3px 10px; border-radius:12px; font-size:0.7rem; font-weight:700; color:#fff;"
                      [style.background]="activo(p.id) ? '#2ECC71' : '#8a9a92'">
                  {{ activo(p.id) ? 'Activo' : 'Pausado' }}
                </span>
              </div>
              <div style="padding:14px; display:flex; flex-direction:column; gap:6px; flex:1;">
                <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:0.92rem; font-weight:700; margin:0;">
                  {{ p.nombre }}
                </h3>
                <p style="color:#295440; font-weight:800; font-size:1rem; margin:0;">{{ fmt(p.precio) }}</p>
                <p style="color:#8a6040; font-size:0.75rem; margin:0 0 8px;">⭐ {{ p.rating }} · {{ p.vendidos }} vendidos</p>
                <div style="display:flex; gap:8px; margin-top:auto;">
                  <button style="flex:1; padding:7px; background:#F2F6F4; color:#295440; border:1.5px solid #C6D7CD; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                    Editar
                  </button>
                  <button (click)="toggleActivo(p.id)"
                          style="flex:1; padding:7px; background:transparent; color:#57685c; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer;">
                    {{ activo(p.id) ? 'Pausar' : 'Reactivar' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border-left:4px solid #FFCD00;">
          <p style="font-size:2rem; margin:0 0 12px;">🛍️</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.1rem; font-weight:700; margin:0 0 6px;">
            Aún no tienes productos publicados
          </p>
          <p style="color:#57685c; font-size:0.9rem; margin:0 0 20px;">Agrega tu primera pieza para empezar a vender en Makicol.</p>
        </div>
      }

    </div>
  `,
})
export class MisProductosComponent {
  artesano = ARTESANO_ACTUAL;
  productos = PRODUCTOS.filter(p => p.artesano === ARTESANO_ACTUAL.nombre);
  mostrarFormulario = signal(false);
  private pausados = signal<Set<number>>(new Set());

  activo(id: number): boolean {
    return !this.pausados().has(id);
  }

  toggleActivo(id: number) {
    this.pausados.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  fmt(n: number): string {
    return '$\u00a0' + new Intl.NumberFormat('es-CO').format(n);
  }
}
