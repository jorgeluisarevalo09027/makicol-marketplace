import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AGENTE_ACTUAL, CASOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-soporte-panel',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .sp-kpis {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }
    .sp-layout {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
    }
    @media (max-width: 900px) {
      .sp-kpis { grid-template-columns: repeat(2, 1fr); }
      .sp-layout { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div style="max-width:1200px; margin:0 auto; padding:28px 16px 48px;">

      <div style="margin-bottom:24px;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.5rem; font-weight:900; margin:0 0 4px;">
          Panel de soporte
        </h1>
        <p style="color:#5A6472; font-size:0.88rem; margin:0;">Hola {{ agente.nombre }} · {{ agente.rol }}</p>
      </div>

      <div class="sp-kpis">
        @for (k of kpis; track k.label) {
          <div style="background:#fff; border-radius:12px; border:1px solid #E1E4E8; border-left:4px solid; padding:18px; text-align:center;"
               [style.border-left-color]="k.color">
            <p style="font-size:1.7rem; margin:0 0 4px;">{{ k.icono }}</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.4rem; font-weight:900; margin:0 0 2px;" [style.color]="k.color">
              {{ k.valor }}
            </p>
            <p style="color:#5A6472; font-size:0.75rem; margin:0;">{{ k.label }}</p>
          </div>
        }
      </div>

      <div class="sp-layout">

        <div>
          <div style="background:#fff; border-radius:12px; border:1px solid #E1E4E8; padding:20px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
              <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.05rem; font-weight:700; margin:0;">
                Casos que requieren atención
              </h2>
              <a routerLink="/marketplace/soporte/casos" style="color:#3A4148; font-size:0.82rem; font-weight:700; text-decoration:none;">
                Ver bandeja completa →
              </a>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
              @for (c of casosPrioritarios; track c.id) {
                <a [routerLink]="['/marketplace/soporte/casos', c.id]"
                   style="display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 14px;
                          border:1px solid #E1E4E8; border-radius:10px; text-decoration:none; transition:background 0.15s;">
                  <div style="min-width:0;">
                    <p style="color:#1F2A22; font-weight:700; font-size:0.86rem; margin:0 0 2px;">{{ c.asunto }}</p>
                    <p style="color:#5A6472; font-size:0.76rem; margin:0;">
                      {{ c.id }} · {{ c.solicitante }} ({{ c.rolSolicitante }}) · {{ c.categoria }}
                    </p>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                    <span style="padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:700;"
                          [style.background]="prioridadColor(c.prioridad).bg" [style.color]="prioridadColor(c.prioridad).color">
                      {{ c.prioridad }}
                    </span>
                    <span style="padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:700; background:#ECEEF0; color:#3A4148;">
                      {{ c.estado }}
                    </span>
                  </div>
                </a>
              }
            </div>
          </div>
        </div>

        <div>
          <div style="background:#fff; border-radius:12px; border:1px solid #E1E4E8; padding:20px; margin-bottom:16px;">
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1rem; font-weight:700; margin:0 0 14px;">
              Casos por categoría
            </h2>
            @for (cat of porCategoria; track cat.categoria) {
              <div style="margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:#3A4148; margin-bottom:4px;">
                  <span>{{ cat.categoria }}</span>
                  <span style="font-weight:700;">{{ cat.total }}</span>
                </div>
                <div style="height:6px; border-radius:3px; background:#ECEEF0;">
                  <div style="height:100%; border-radius:3px; background:#3A4148;" [style.width]="(cat.total / totalCasos * 100) + '%'"></div>
                </div>
              </div>
            }
          </div>

          <div style="background:#fff; border-radius:12px; border:1px solid #E1E4E8; padding:20px;">
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1rem; font-weight:700; margin:0 0 14px;">
              Origen de los casos
            </h2>
            <div style="display:flex; gap:16px;">
              <div style="flex:1; text-align:center; padding:14px; background:#F4F5F6; border-radius:10px;">
                <p style="font-size:1.5rem; margin:0 0 2px;">🛍️</p>
                <p style="font-weight:900; color:#1F2A22; font-size:1.2rem; margin:0;">{{ deCompradores }}</p>
                <p style="color:#5A6472; font-size:0.72rem; margin:0;">Compradores</p>
              </div>
              <div style="flex:1; text-align:center; padding:14px; background:#F4F5F6; border-radius:10px;">
                <p style="font-size:1.5rem; margin:0 0 2px;">🧶</p>
                <p style="font-weight:900; color:#1F2A22; font-size:1.2rem; margin:0;">{{ deArtesanos }}</p>
                <p style="color:#5A6472; font-size:0.72rem; margin:0;">Artesanos</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class SoportePanelComponent {
  agente = AGENTE_ACTUAL;
  casos = CASOS;

  totalCasos = CASOS.length;
  abiertos = CASOS.filter(c => c.estado === 'Abierto' || c.estado === 'En proceso').length;
  deCompradores = CASOS.filter(c => c.rolSolicitante === 'comprador').length;
  deArtesanos = CASOS.filter(c => c.rolSolicitante === 'artesano').length;

  casosPrioritarios = CASOS
    .filter(c => c.estado === 'Abierto' || c.estado === 'En proceso')
    .sort((a, b) => (a.prioridad === 'Alta' ? -1 : 1))
    .slice(0, 4);

  porCategoria = Array.from(new Set(CASOS.map(c => c.categoria))).map(categoria => ({
    categoria,
    total: CASOS.filter(c => c.categoria === categoria).length,
  }));

  kpis = [
    { icono: '📨', valor: this.abiertos, label: 'Casos abiertos/en proceso', color: '#C8102E' },
    { icono: '✅', valor: '92%', label: 'SLA cumplido (24h)', color: '#2ECC71' },
    { icono: '⏱️', valor: '3.2h', label: 'Tiempo de respuesta promedio', color: '#3A4148' },
    { icono: '⭐', valor: '4.6/5', label: 'Satisfacción post-caso', color: '#FFCD00' },
  ];

  prioridadColor(p: string): { bg: string; color: string } {
    const mapa: Record<string, { bg: string; color: string }> = {
      'Alta': { bg: '#fde2e2', color: '#C8102E' },
      'Media': { bg: '#fff3cd', color: '#856404' },
      'Baja': { bg: '#e3ebe7', color: '#295440' },
    };
    return mapa[p] ?? { bg: '#ECEEF0', color: '#3A4148' };
  }
}
