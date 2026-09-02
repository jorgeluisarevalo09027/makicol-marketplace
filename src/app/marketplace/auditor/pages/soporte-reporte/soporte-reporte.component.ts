import { Component, ElementRef, PLATFORM_ID, ViewChild, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CASOS, CASOS_MENSUALES, CATEGORIAS_CASO, VENTAS_MENSUALES } from '../../../data/marketplace-data';

@Component({
  selector: 'app-auditor-soporte',
  standalone: true,
  styles: [`
    .as-kpis {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    @media (max-width: 700px) {
      .as-kpis { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div style="max-width:1100px; margin:0 auto; padding:28px 16px 48px;">

      <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1.4rem; font-weight:900; margin:0 0 4px;">
        Impacto de la atención al cliente
      </h1>
      <p style="color:#5A6B8C; font-size:0.85rem; margin:0 0 20px;">
        Cruce entre volumen de ventas y volumen de casos de soporte, para detectar fricción operativa.
      </p>

      <div class="as-kpis">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #C8102E; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">📨</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#C8102E; margin:0 0 2px;">{{ casos.length }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Casos totales registrados</p>
        </div>
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #003893; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">📊</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#003893; margin:0 0 2px;">{{ casosPorCadaCienPedidos }}</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Casos por cada 100 pedidos (mes actual)</p>
        </div>
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid #FFCD00; padding:18px; text-align:center;">
          <p style="font-size:1.7rem; margin:0 0 4px;">⚖️</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; color:#FFCD00; margin:0 0 2px;">{{ pctDisputas }}%</p>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">Casos de disputa comprador-artesano</p>
        </div>
      </div>

      <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px; margin-bottom:20px;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
          Casos de soporte vs. pedidos completados por mes
        </h2>
        <div style="height:280px; position:relative;">
          <canvas #chartCombo></canvas>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
            Casos por categoría
          </h2>
          @for (cat of porCategoria; track cat.categoria) {
            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:#1F2A44; margin-bottom:4px;">
                <span>{{ cat.categoria }}</span>
                <span style="font-weight:700;">{{ cat.total }}</span>
              </div>
              <div style="height:8px; border-radius:4px; background:#EEF1F8;">
                <div style="height:100%; border-radius:4px; background:#C8102E;" [style.width]="(cat.total / casos.length * 100) + '%'"></div>
              </div>
            </div>
          }
        </div>

        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
            Origen de los casos
          </h2>
          <div style="display:flex; gap:16px;">
            <div style="flex:1; text-align:center; padding:16px; background:#F4F6FB; border-radius:10px;">
              <p style="font-size:1.6rem; margin:0 0 4px;">🛍️</p>
              <p style="font-weight:900; color:#1F2A44; font-size:1.3rem; margin:0;">{{ deCompradores }}</p>
              <p style="color:#5A6B8C; font-size:0.74rem; margin:0;">Compradores</p>
            </div>
            <div style="flex:1; text-align:center; padding:16px; background:#F4F6FB; border-radius:10px;">
              <p style="font-size:1.6rem; margin:0 0 4px;">🧶</p>
              <p style="font-weight:900; color:#1F2A44; font-size:1.3rem; margin:0;">{{ deArtesanos }}</p>
              <p style="color:#5A6B8C; font-size:0.74rem; margin:0;">Artesanos</p>
            </div>
          </div>
          <p style="color:#5A6B8C; font-size:0.78rem; margin:16px 0 0; line-height:1.5;">
            Un aumento sostenido de casos de "Pedido/envío" suele anticipar caídas en la tasa de recompra;
            revisar junto al informe de Compradores.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SoporteReporteComponent {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('chartCombo') chartCombo!: ElementRef<HTMLCanvasElement>;

  casos = CASOS;
  categorias = CATEGORIAS_CASO;
  ventasMensuales = VENTAS_MENSUALES;
  casosMensuales = CASOS_MENSUALES;

  deCompradores = CASOS.filter(c => c.rolSolicitante === 'comprador').length;
  deArtesanos = CASOS.filter(c => c.rolSolicitante === 'artesano').length;
  pctDisputas = Math.round((CASOS.filter(c => c.categoria === 'Disputa comprador-artesano').length / CASOS.length) * 100);

  casosPorCadaCienPedidos = (
    (this.casosMensuales[this.casosMensuales.length - 1].total /
      this.ventasMensuales[this.ventasMensuales.length - 1].pedidos) * 100
  ).toFixed(1);

  porCategoria = this.categorias.map(categoria => ({
    categoria,
    total: CASOS.filter(c => c.categoria === categoria).length,
  })).filter(c => c.total > 0);

  constructor() {
    afterNextRender(() => this.initChart());
  }

  private async initChart() {
    if (!isPlatformBrowser(this.platformId) || !this.chartCombo) return;
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const ctx = this.chartCombo.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      data: {
        labels: this.ventasMensuales.map(v => v.mes),
        datasets: [
          {
            type: 'bar',
            label: 'Pedidos completados',
            data: this.ventasMensuales.map(v => v.pedidos),
            backgroundColor: 'rgba(0,56,147,0.65)',
            borderRadius: 6,
            yAxisID: 'y',
          },
          {
            type: 'line',
            label: 'Casos de soporte',
            data: this.casosMensuales.map(c => c.total),
            borderColor: '#C8102E',
            backgroundColor: '#C8102E',
            borderWidth: 2.5,
            tension: 0.35,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: { position: 'left', title: { display: true, text: 'Pedidos' } },
          y1: { position: 'right', title: { display: true, text: 'Casos' }, grid: { drawOnChartArea: false } },
        },
      },
    });
  }
}
