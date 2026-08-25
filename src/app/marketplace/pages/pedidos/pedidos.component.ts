import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';
import { PEDIDOS, RESENAS } from '../../data/marketplace-data';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterLink, StarRatingComponent],
  styles: [`
    .ped-metricas {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .ped-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;
      align-items: flex-start;
    }
    .ped-table-wrap {
      overflow-x: auto;
    }
    @media (max-width: 700px) {
      .ped-metricas {
        grid-template-columns: repeat(2, 1fr);
      }
      .ped-layout {
        grid-template-columns: 1fr;
      }
    }
  `],
  template: `
    <div style="max-width:1100px; margin:0 auto; padding:32px 16px 48px;">

      <!-- Header artesano -->
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:32px; padding:24px; background:#fff; border-left:4px solid #FFCD00; border-radius:12px; box-shadow:0 2px 12px rgba(41,84,64,0.09); flex-wrap:wrap;">
        <div style="width:68px; height:68px; border-radius:50%; background:#FDFBF3; border:4px solid #FFCD00; display:flex; align-items:center; justify-content:center; font-size:2.2rem; flex-shrink:0;">
          🧶
        </div>
        <div style="flex:1;">
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.4rem; font-weight:900; margin:0 0 2px;">
            Bienvenida, María Pushaina
          </h1>
          <p style="color:#295440; font-size:0.85rem; font-weight:600; margin:0 0 4px;">🧶 Tejidos Wayúu · Riohacha, Guajira</p>
          <app-star-rating [rating]="4.8" [count]="234"/>
        </div>
        <a routerLink="/marketplace/catalogo"
           style="padding:8px 18px; background:#2C7350; color:#fff; border-radius:8px; text-decoration:none; font-size:0.85rem; font-weight:700;">
          + Agregar producto
        </a>
      </div>

      <!-- Métricas -->
      <div class="ped-metricas">
        @for (m of metricas; track m.label) {
          <div style="background:#fff; border-left:4px solid; border-radius:12px; padding:20px; box-shadow:0 2px 12px rgba(41,84,64,0.09); text-align:center;"
               [style.border-left-color]="m.color">
            <p style="font-size:2rem; margin:0 0 6px;">{{ m.icono }}</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; margin:0 0 2px;"
               [style.color]="m.color">
              {{ m.valor }}
            </p>
            <p style="color:#57685c; font-size:0.75rem; margin:0;">{{ m.label }}</p>
          </div>
        }
      </div>

      <div class="ped-layout">

        <!-- Tabla de pedidos -->
        <div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
            <div style="flex:1; height:2px; max-width:80px; background:linear-gradient(to right,transparent,#FFCD00);"></div>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.2rem; font-weight:700; margin:0; white-space:nowrap;">
              Pedidos Recientes
            </h2>
            <div style="flex:1; height:2px; max-width:80px; background:linear-gradient(to left,transparent,#FFCD00);"></div>
          </div>

          <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:12px; box-shadow:0 2px 12px rgba(41,84,64,0.09);" class="ped-table-wrap">
            <table style="width:100%; min-width:520px; border-collapse:collapse; font-size:0.85rem;">
              <thead>
                <tr style="background:#E3EBE7;">
                  <th style="padding:12px 16px; text-align:left; font-weight:700; color:#295440; font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;">Pedido</th>
                  <th style="padding:12px 16px; text-align:left; font-weight:700; color:#295440; font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;">Producto</th>
                  <th style="padding:12px 16px; text-align:left; font-weight:700; color:#295440; font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;">Comprador</th>
                  <th style="padding:12px 16px; text-align:right; font-weight:700; color:#295440; font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;">Total</th>
                  <th style="padding:12px 16px; text-align:center; font-weight:700; color:#295440; font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;">Estado</th>
                </tr>
              </thead>
              <tbody>
                @for (p of pedidos; track p.id; let even = $even) {
                  <tr [style.background]="even ? '#F2F6F4' : '#fff'">
                    <td style="padding:14px 16px; color:#295440; font-weight:700; font-size:0.8rem;">{{ p.id }}</td>
                    <td style="padding:14px 16px; color:#1F2A22;">{{ p.producto }}</td>
                    <td style="padding:14px 16px;">
                      <p style="color:#1F2A22; margin:0 0 2px; font-weight:600;">{{ p.comprador }}</p>
                      <p style="color:#57685c; font-size:0.75rem; margin:0;">{{ p.ciudad }}</p>
                    </td>
                    <td style="padding:14px 16px; text-align:right; font-weight:700; color:#295440;">{{ fmtCOP(p.total) }}</td>
                    <td style="padding:14px 16px; text-align:center;">
                      <span style="padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;"
                            [style.background]="estadoColor(p.estado).bg"
                            [style.color]="estadoColor(p.estado).color">
                        {{ p.estado }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Panel de reputación -->
        <div>
          <!-- Rating general -->
          <div style="background:#2C7350; border-radius:12px; padding:24px; margin-bottom:16px; text-align:center;">
            <p style="color:rgba(255,255,255,0.7); font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px;">Tu reputación</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:3.5rem; font-weight:900; color:#fff; margin:0 0 4px; line-height:1;">4.8</p>
            <div style="display:flex; justify-content:center; gap:4px; margin-bottom:6px;">
              @for (s of [1,2,3,4,5]; track s) {
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" [style.color]="s <= 5 ? '#FFCD00' : '#57685c'">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              }
            </div>
            <p style="color:rgba(255,255,255,0.65); font-size:0.82rem; margin:0;">Basado en 234 reseñas</p>

            <!-- Barras de distribución -->
            <div style="margin-top:16px; text-align:left;">
              @for (bar of distribucion; track bar.stars) {
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span style="color:rgba(255,255,255,0.7); font-size:0.75rem; width:12px; text-align:right;">{{ bar.stars }}</span>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="#FFCD00">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <div style="flex:1; height:6px; border-radius:3px; background:rgba(255,255,255,0.2);">
                    <div style="height:100%; border-radius:3px; background:#FFCD00; transition:width 0.5s;"
                         [style.width]="bar.pct + '%'"></div>
                  </div>
                  <span style="color:rgba(255,255,255,0.65); font-size:0.72rem; width:28px;">{{ bar.pct }}%</span>
                </div>
              }
            </div>
          </div>

          <!-- Reseñas recientes -->
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <div style="flex:1; height:2px; background:linear-gradient(to right,transparent,#FFCD00);"></div>
            <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1rem; font-weight:700; margin:0; white-space:nowrap;">Reseñas recientes</h3>
            <div style="flex:1; height:2px; background:linear-gradient(to left,transparent,#FFCD00);"></div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            @for (r of resenas; track r.autor) {
              <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:10px; padding:14px; box-shadow:0 2px 8px rgba(41,84,64,0.07);">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                  <p style="font-weight:700; color:#1F2A22; font-size:0.85rem; margin:0;">{{ r.autor }}</p>
                  <div style="display:flex; gap:2px;">
                    @for (s of [1,2,3,4,5]; track s) {
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"
                           [style.color]="s <= r.rating ? '#FFCD00' : '#d4b87a'">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    }
                  </div>
                </div>
                <p style="color:#5a3820; font-size:0.8rem; margin:0 0 5px; line-height:1.45;">{{ r.comentario }}</p>
                <p style="color:#8a6040; font-size:0.72rem; margin:0;">{{ r.producto }} · {{ r.fecha }}</p>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `,
})
export class PedidosComponent {
  pedidos = PEDIDOS;
  resenas = RESENAS;

  metricas = [
    { icono: '💰', valor: '$645.000', label: 'Ventas del mes', color: '#FFCD00' },
    { icono: '📦', valor: '5',        label: 'Pedidos activos', color: '#295440' },
    { icono: '🛍️', valor: '12',       label: 'Productos activos', color: '#2ECC71' },
    { icono: '⭐', valor: '4.8/5',    label: 'Calificación promedio', color: '#FFCD00' },
  ];

  distribucion = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 7  },
    { stars: 2, pct: 2  },
    { stars: 1, pct: 1  },
  ];

  estadoColor(estado: string): { bg: string; color: string } {
    const mapa: Record<string, { bg: string; color: string }> = {
      'Recibido':      { bg: '#E3EBE7', color: '#295440'  },
      'En preparación':{ bg: '#fff3cd', color: '#856404'  },
      'Enviado':       { bg: '#cff4fc', color: '#0c5460'  },
      'Entregado':     { bg: '#d1e7dd', color: '#0a3622'  },
    };
    return mapa[estado] ?? { bg: '#f8f9fa', color: '#1F2A22' };
  }

  fmtCOP(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
