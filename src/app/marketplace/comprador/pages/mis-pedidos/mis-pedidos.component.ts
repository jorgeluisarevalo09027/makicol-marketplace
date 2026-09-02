import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PEDIDOS, COMPRADOR_ACTUAL } from '../../../data/marketplace-data';

const PASOS_ESTADO = ['Recibido', 'En preparación', 'Enviado', 'Entregado'] as const;

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .mp-tracker {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .mp-tracker-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: 0;
    }
    .mp-tracker-dot {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .mp-tracker-line {
      flex: 1;
      height: 2px;
    }
  `],
  template: `
    <div style="max-width:820px; margin:0 auto; padding:32px 16px 48px;">

      <div style="margin-bottom:24px;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.6rem; font-weight:900; margin:0 0 4px;">
          Mis pedidos
        </h1>
        <p style="color:#57685c; font-size:0.9rem; margin:0;">
          Hola {{ comprador }}, aquí puedes seguir el estado de tus compras.
        </p>
      </div>

      @if (pedidos.length) {
        <div style="display:flex; flex-direction:column; gap:16px;">
          @for (p of pedidos; track p.id) {
            <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:12px; padding:20px 22px; box-shadow:0 2px 12px rgba(41,84,64,0.09);">

              <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
                <div>
                  <p style="color:#295440; font-weight:800; font-size:0.9rem; margin:0 0 2px;">{{ p.id }}</p>
                  <p style="color:#1F2A22; font-size:0.95rem; font-weight:600; margin:0;">{{ p.producto }}</p>
                  <p style="color:#57685c; font-size:0.78rem; margin:4px 0 0;">Pedido el {{ p.fecha }} · {{ p.ciudad }}</p>
                </div>
                <p style="color:#295440; font-weight:900; font-size:1.05rem; margin:0; white-space:nowrap;">{{ fmtCOP(p.total) }}</p>
              </div>

              <!-- Tracker de estado -->
              <div class="mp-tracker">
                @for (paso of pasos; track paso; let last = $last) {
                  <div class="mp-tracker-step">
                    <div class="mp-tracker-dot"
                         [style.background]="pasoIndex(p.estado) >= $index ? '#2C7350' : '#E3EBE7'"
                         [style.color]="pasoIndex(p.estado) >= $index ? '#fff' : '#8a9a92'">
                      {{ pasoIndex(p.estado) > $index ? '✓' : $index + 1 }}
                    </div>
                    <span style="font-size:0.68rem; margin-top:4px; text-align:center; white-space:nowrap;"
                          [style.color]="pasoIndex(p.estado) >= $index ? '#295440' : '#8a9a92'"
                          [style.font-weight]="pasoIndex(p.estado) === $index ? '700' : '400'">
                      {{ paso }}
                    </span>
                  </div>
                  @if (!last) {
                    <div class="mp-tracker-line" style="margin-bottom:16px;"
                         [style.background]="pasoIndex(p.estado) > $index ? '#2C7350' : '#E3EBE7'"></div>
                  }
                }
              </div>

            </div>
          }
        </div>
      } @else {
        <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border-left:4px solid #FFCD00;">
          <p style="font-size:2rem; margin:0 0 12px;">📦</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.1rem; font-weight:700; margin:0 0 6px;">
            Aún no tienes pedidos
          </p>
          <p style="color:#57685c; font-size:0.9rem; margin:0 0 20px;">Explora el catálogo y encuentra tu primera pieza artesanal.</p>
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
export class MisPedidosComponent {
  comprador = COMPRADOR_ACTUAL;
  pedidos = PEDIDOS.filter(p => p.comprador === COMPRADOR_ACTUAL);
  pasos: readonly string[] = PASOS_ESTADO;

  pasoIndex(estado: string): number {
    return PASOS_ESTADO.indexOf(estado as typeof PASOS_ESTADO[number]);
  }

  fmtCOP(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
