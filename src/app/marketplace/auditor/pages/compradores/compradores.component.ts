import { Component } from '@angular/core';
import { PEDIDOS, RESENAS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-auditor-compradores',
  standalone: true,
  styles: [`
    .ac-kpis {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    .ac-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media (max-width: 900px) {
      .ac-kpis { grid-template-columns: 1fr; }
      .ac-layout { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div style="max-width:1100px; margin:0 auto; padding:28px 16px 48px;">

      <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1.4rem; font-weight:900; margin:0 0 4px;">
        Salud de la demanda (compradores)
      </h1>
      <p style="color:#5A6B8C; font-size:0.85rem; margin:0 0 20px;">
        Recompra, satisfacción y concentración geográfica de los compradores.
      </p>

      <div class="ac-kpis">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #003893; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">🔁</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#003893; margin:0 0 2px;">{{ tasaRecompra }}%</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Compradores con más de 1 pedido</p>
        </div>
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #FFCD00; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">⭐</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#FFCD00; margin:0 0 2px;">{{ ratingPromedio }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Calificación promedio de reseñas</p>
        </div>
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #2ECC71; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">🛍️</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#2ECC71; margin:0 0 2px;">{{ ticketPromedio }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Ticket promedio por pedido</p>
        </div>
      </div>

      <div class="ac-layout">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
            Compradores por gasto total
          </h2>
          <div style="display:flex; flex-direction:column; gap:10px;">
            @for (c of topCompradores; track c.nombre) {
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="width:120px; flex-shrink:0; font-size:0.82rem; color:#1F2A44; font-weight:600;">{{ c.nombre }}</span>
                <div style="flex:1; height:10px; border-radius:5px; background:#EEF1F8;">
                  <div style="height:100%; border-radius:5px; background:#003893;" [style.width]="(c.total / topCompradores[0].total * 100) + '%'"></div>
                </div>
                <span style="width:100px; text-align:right; font-size:0.78rem; color:#003893; font-weight:700;">{{ fmt(c.total) }}</span>
              </div>
            }
          </div>
        </div>

        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
            Distribución de calificaciones
          </h2>
          @for (bar of distribucionRating; track bar.stars) {
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span style="width:14px; font-size:0.78rem; color:#5A6B8C;">{{ bar.stars }}★</span>
              <div style="flex:1; height:10px; border-radius:5px; background:#EEF1F8;">
                <div style="height:100%; border-radius:5px; background:#FFCD00;" [style.width]="bar.pct + '%'"></div>
              </div>
              <span style="width:34px; text-align:right; font-size:0.76rem; color:#5A6B8C;">{{ bar.pct }}%</span>
            </div>
          }

          <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:0.9rem; font-weight:700; margin:20px 0 10px;">
            Ciudades con más pedidos
          </h3>
          @for (c of topCiudades; track c.ciudad) {
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; padding:6px 0; border-bottom:1px solid #F0F2F8;">
              <span style="color:#1F2A44;">{{ c.ciudad }}</span>
              <span style="color:#5A6B8C; font-weight:600;">{{ c.total }} pedidos</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class CompradoresReporteComponent {
  private conteoPorComprador = PEDIDOS.reduce<Record<string, number>>((acc, p) => {
    acc[p.comprador] = (acc[p.comprador] ?? 0) + 1;
    return acc;
  }, {});

  tasaRecompra = Math.round(
    (Object.values(this.conteoPorComprador).filter(n => n > 1).length /
      Object.keys(this.conteoPorComprador).length) * 100
  );

  ratingPromedio = (RESENAS.reduce((s, r) => s + r.rating, 0) / RESENAS.length).toFixed(1);

  ticketPromedio = this.fmt(Math.round(PEDIDOS.reduce((s, p) => s + p.total, 0) / PEDIDOS.length));

  topCompradores = Object.entries(
    PEDIDOS.reduce<Record<string, number>>((acc, p) => {
      acc[p.comprador] = (acc[p.comprador] ?? 0) + p.total;
      return acc;
    }, {})
  ).map(([nombre, total]) => ({ nombre, total })).sort((a, b) => b.total - a.total);

  topCiudades = Object.entries(
    PEDIDOS.reduce<Record<string, number>>((acc, p) => {
      acc[p.ciudad] = (acc[p.ciudad] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([ciudad, total]) => ({ ciudad, total })).sort((a, b) => b.total - a.total);

  distribucionRating = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    pct: Math.round((RESENAS.filter(r => r.rating === stars).length / RESENAS.length) * 100),
  }));

  fmt(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
