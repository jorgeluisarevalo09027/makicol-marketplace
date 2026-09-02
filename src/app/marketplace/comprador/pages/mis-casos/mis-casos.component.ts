import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASOS, COMPRADOR_ACTUAL, type EstadoCaso } from '../../../data/marketplace-data';

@Component({
  selector: 'app-mis-casos-comprador',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="max-width:760px; margin:0 auto; padding:32px 16px 48px;">

      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.4rem; font-weight:900; margin:0;">
          Mis casos
        </h1>
        <a routerLink="/marketplace/comprador/ayuda/nuevo"
           style="padding:9px 18px; background:#2C7350; color:#fff; border-radius:8px; text-decoration:none; font-size:0.85rem; font-weight:700;">
          + Crear caso
        </a>
      </div>

      @if (misCasos.length) {
        <div style="display:flex; flex-direction:column; gap:12px;">
          @for (c of misCasos; track c.id) {
            <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:12px; padding:18px 20px; box-shadow:0 2px 12px rgba(41,84,64,0.09);">
              <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap;">
                <div>
                  <p style="color:#295440; font-weight:800; font-size:0.82rem; margin:0 0 2px;">{{ c.id }} · {{ c.categoria }}</p>
                  <p style="color:#1F2A22; font-weight:700; font-size:0.95rem; margin:0;">{{ c.asunto }}</p>
                  <p style="color:#57685c; font-size:0.78rem; margin:6px 0 0;">Creado: {{ c.fechaCreacion }}</p>
                </div>
                <span style="padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:700;"
                      [style.background]="estadoColor(c.estado).bg" [style.color]="estadoColor(c.estado).color">
                  {{ c.estado }}
                </span>
              </div>
            </div>
          }
        </div>
      } @else {
        <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border-left:4px solid #FFCD00;">
          <p style="font-size:2rem; margin:0 0 12px;">📂</p>
          <p style="color:#57685c; font-size:0.9rem; margin:0;">Aún no has creado ningún caso de soporte.</p>
        </div>
      }
    </div>
  `,
})
export class MisCasosCompradorComponent {
  misCasos = CASOS.filter(c => c.rolSolicitante === 'comprador' && c.solicitante === COMPRADOR_ACTUAL);

  estadoColor(estado: EstadoCaso): { bg: string; color: string } {
    const mapa: Record<EstadoCaso, { bg: string; color: string }> = {
      'Abierto': { bg: '#fde2e2', color: '#C8102E' },
      'En proceso': { bg: '#fff3cd', color: '#856404' },
      'Resuelto': { bg: '#d1e7dd', color: '#0a3622' },
      'Cerrado': { bg: '#E3EBE7', color: '#295440' },
    };
    return mapa[estado];
  }
}
