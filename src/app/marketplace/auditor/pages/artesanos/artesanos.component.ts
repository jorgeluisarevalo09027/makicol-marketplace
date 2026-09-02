import { Component } from '@angular/core';
import { ARTESANOS, PRODUCTOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-auditor-artesanos',
  standalone: true,
  styles: [`
    .aa-kpis {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    @media (max-width: 700px) {
      .aa-kpis { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div style="max-width:1100px; margin:0 auto; padding:28px 16px 48px;">

      <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1.4rem; font-weight:900; margin:0 0 4px;">
        Salud de la oferta (artesanos)
      </h1>
      <p style="color:#5A6B8C; font-size:0.85rem; margin:0 0 20px;">
        Indicadores de actividad, calidad y concentración de la base de vendedores.
      </p>

      <div class="aa-kpis">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #003893; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">🧶</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#003893; margin:0 0 2px;">{{ artesanos.length }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Artesanos activos</p>
        </div>
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #2ECC71; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">⭐</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#2ECC71; margin:0 0 2px;">{{ ratingPromedio }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Rating promedio</p>
        </div>
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #FFCD00; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">📦</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#FFCD00; margin:0 0 2px;">{{ productosPromedio }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Productos por artesano (prom.)</p>
        </div>
      </div>

      <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
          Ranking de artesanos
        </h2>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="background:#F4F6FB;">
              <th style="padding:10px 14px; text-align:left; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Artesano</th>
              <th style="padding:10px 14px; text-align:left; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Oficio</th>
              <th style="padding:10px 14px; text-align:right; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Productos</th>
              <th style="padding:10px 14px; text-align:right; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Rating</th>
              <th style="padding:10px 14px; text-align:right; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Reseñas</th>
              <th style="padding:10px 14px; text-align:right; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Ingresos est.</th>
            </tr>
          </thead>
          <tbody>
            @for (a of ranking; track a.nombre; let even = $even) {
              <tr [style.background]="even ? '#FAFBFD' : '#fff'">
                <td style="padding:11px 14px; color:#1F2A44; font-weight:600;">{{ a.nombre }}</td>
                <td style="padding:11px 14px; color:#5A6B8C;">{{ a.tipo }}</td>
                <td style="padding:11px 14px; text-align:right; color:#1F2A44;">{{ a.productos }}</td>
                <td style="padding:11px 14px; text-align:right; color:#1F2A44;">⭐ {{ a.rating }}</td>
                <td style="padding:11px 14px; text-align:right; color:#5A6B8C;">{{ a.resenas }}</td>
                <td style="padding:11px 14px; text-align:right; color:#003893; font-weight:700;">{{ fmt(a.ingresos) }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ArtesanosReporteComponent {
  artesanos = ARTESANOS;

  ranking = ARTESANOS
    .map(a => ({
      ...a,
      ingresos: PRODUCTOS.filter(p => p.artesano === a.nombre).reduce((s, p) => s + p.vendidos * p.precio, 0),
    }))
    .sort((a, b) => b.ingresos - a.ingresos);

  ratingPromedio = (ARTESANOS.reduce((s, a) => s + a.rating, 0) / ARTESANOS.length).toFixed(1);
  productosPromedio = Math.round(ARTESANOS.reduce((s, a) => s + a.productos, 0) / ARTESANOS.length);

  fmt(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
