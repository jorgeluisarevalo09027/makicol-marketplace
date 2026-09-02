import { Component, ElementRef, PLATFORM_ID, ViewChild, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ARTESANOS, CATEGORIAS, PRODUCTOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-auditor-ventas',
  standalone: true,
  styles: [`
    .av-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    @media (max-width: 900px) {
      .av-layout { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div style="max-width:1200px; margin:0 auto; padding:28px 16px 48px;">

      <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1.4rem; font-weight:900; margin:0 0 18px;">
        Ventas y desempeño comercial
      </h1>

      <div class="av-layout">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
            Ingresos estimados por categoría
          </h2>
          <div style="height:260px; position:relative;">
            <canvas #chartCategorias></canvas>
          </div>
        </div>

        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
            Ingresos estimados por región
          </h2>
          <div style="height:260px; position:relative;">
            <canvas #chartRegiones></canvas>
          </div>
        </div>
      </div>

      <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px; margin-bottom:20px;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
          Top 5 productos por ingresos estimados
        </h2>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="background:#F4F6FB;">
              <th style="padding:10px 14px; text-align:left; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Producto</th>
              <th style="padding:10px 14px; text-align:left; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Artesano</th>
              <th style="padding:10px 14px; text-align:right; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Vendidos</th>
              <th style="padding:10px 14px; text-align:right; font-size:0.75rem; color:#5A6B8C; text-transform:uppercase;">Ingresos est.</th>
            </tr>
          </thead>
          <tbody>
            @for (p of topProductos; track p.id; let even = $even) {
              <tr [style.background]="even ? '#FAFBFD' : '#fff'">
                <td style="padding:11px 14px; color:#1F2A44; font-weight:600;">{{ p.nombre }}</td>
                <td style="padding:11px 14px; color:#5A6B8C;">{{ p.artesano }}</td>
                <td style="padding:11px 14px; text-align:right; color:#1F2A44;">{{ p.vendidos }}</td>
                <td style="padding:11px 14px; text-align:right; color:#003893; font-weight:700;">{{ fmt(p.vendidos * p.precio) }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
          Top artesanos por ingresos generados
        </h2>
        <div style="display:flex; flex-direction:column; gap:10px;">
          @for (a of topArtesanos; track a.nombre) {
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="width:130px; flex-shrink:0; font-size:0.82rem; color:#1F2A44; font-weight:600;">{{ a.nombre }}</span>
              <div style="flex:1; height:10px; border-radius:5px; background:#EEF1F8;">
                <div style="height:100%; border-radius:5px; background:#003893;" [style.width]="(a.total / topArtesanos[0].total * 100) + '%'"></div>
              </div>
              <span style="width:110px; text-align:right; font-size:0.82rem; color:#003893; font-weight:700;">{{ fmt(a.total) }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class VentasComponent {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('chartCategorias') chartCategorias!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartRegiones') chartRegiones!: ElementRef<HTMLCanvasElement>;

  categorias = CATEGORIAS.filter(c => c !== 'Todos');

  topProductos = [...PRODUCTOS].sort((a, b) => (b.vendidos * b.precio) - (a.vendidos * a.precio)).slice(0, 5);

  topArtesanos = ARTESANOS
    .map(a => ({
      nombre: a.nombre,
      total: PRODUCTOS.filter(p => p.artesano === a.nombre).reduce((s, p) => s + p.vendidos * p.precio, 0),
    }))
    .sort((a, b) => b.total - a.total);

  private ingresosPorCategoria = this.categorias.map(cat => ({
    categoria: cat,
    total: PRODUCTOS.filter(p => p.categoria === cat).reduce((s, p) => s + p.vendidos * p.precio, 0),
  }));

  private ingresosPorRegion = Array.from(new Set(PRODUCTOS.map(p => p.region))).map(region => ({
    region,
    total: PRODUCTOS.filter(p => p.region === region).reduce((s, p) => s + p.vendidos * p.precio, 0),
  }));

  constructor() {
    afterNextRender(() => this.initCharts());
  }

  private async initCharts() {
    if (!isPlatformBrowser(this.platformId)) return;
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const palette = ['#003893', '#2C7350', '#FFCD00', '#C8102E', '#8a6040', '#57685c'];

    const ctxCat = this.chartCategorias?.nativeElement.getContext('2d');
    if (ctxCat) {
      new Chart(ctxCat, {
        type: 'doughnut',
        data: {
          labels: this.ingresosPorCategoria.map(c => c.categoria),
          datasets: [{ data: this.ingresosPorCategoria.map(c => c.total), backgroundColor: palette, borderWidth: 0 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } } },
      });
    }

    const ctxReg = this.chartRegiones?.nativeElement.getContext('2d');
    if (ctxReg) {
      new Chart(ctxReg, {
        type: 'bar',
        data: {
          labels: this.ingresosPorRegion.map(r => r.region),
          datasets: [{ data: this.ingresosPorRegion.map(r => r.total), backgroundColor: '#2C7350', borderRadius: 6 }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          scales: { x: { ticks: { callback: (v) => '$' + (Number(v) / 1000000).toFixed(1) + 'M' } } },
        },
      });
    }
  }

  fmt(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
