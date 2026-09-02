import { Component, ElementRef, PLATFORM_ID, ViewChild, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AUDITOR_ACTUAL, COMISION_PORCENTAJE, VENTAS_MENSUALES } from '../../../data/marketplace-data';

@Component({
  selector: 'app-auditor-resumen',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .au-kpis {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    .au-layout {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
    }
    @media (max-width: 900px) {
      .au-kpis { grid-template-columns: repeat(2, 1fr); }
      .au-layout { grid-template-columns: 1fr; }
    }
  `],
  template: `
    <div style="max-width:1200px; margin:0 auto; padding:28px 16px 48px;">

      <div style="margin-bottom:24px;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1.5rem; font-weight:900; margin:0 0 4px;">
          Resumen ejecutivo
        </h1>
        <p style="color:#5A6B8C; font-size:0.88rem; margin:0;">Hola {{ auditor.nombre }} · {{ auditor.rol }} · datos del último mes vs. el anterior</p>
      </div>

      <div class="au-kpis">
        @for (k of kpis; track k.label) {
          <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; border-left:4px solid; padding:18px;"
               [style.border-left-color]="k.color">
            <p style="color:#5A6B8C; font-size:0.74rem; margin:0 0 6px; text-transform:uppercase; letter-spacing:0.4px;">{{ k.label }}</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:900; margin:0 0 4px;" [style.color]="k.color">
              {{ k.valor }}
            </p>
            <p style="font-size:0.78rem; margin:0;" [style.color]="k.subeVsBaja ? '#2ECC71' : '#C8102E'">
              {{ k.subeVsBaja ? '▲' : '▼' }} {{ k.variacion }} vs. mes anterior
            </p>
          </div>
        }
      </div>

      <div class="au-layout">
        <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1.05rem; font-weight:700; margin:0 0 14px;">
            Tendencia de GMV (volumen transaccionado)
          </h2>
          <div style="height:280px; position:relative;">
            <canvas #chartCanvas></canvas>
          </div>
        </div>

        <div>
          <div style="background:#fff; border-radius:12px; border:1px solid #E1E6F0; padding:20px; margin-bottom:16px;">
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A44; font-size:1rem; font-weight:700; margin:0 0 14px;">
              Accesos a informes
            </h2>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a routerLink="/marketplace/auditor/ventas" style="padding:10px 14px; border:1px solid #E1E6F0; border-radius:8px; text-decoration:none; color:#1F2A44; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between;">
                Ventas y desempeño <span>→</span>
              </a>
              <a routerLink="/marketplace/auditor/artesanos" style="padding:10px 14px; border:1px solid #E1E6F0; border-radius:8px; text-decoration:none; color:#1F2A44; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between;">
                Salud de artesanos <span>→</span>
              </a>
              <a routerLink="/marketplace/auditor/compradores" style="padding:10px 14px; border:1px solid #E1E6F0; border-radius:8px; text-decoration:none; color:#1F2A44; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between;">
                Salud de compradores <span>→</span>
              </a>
              <a routerLink="/marketplace/auditor/soporte" style="padding:10px 14px; border:1px solid #E1E6F0; border-radius:8px; text-decoration:none; color:#1F2A44; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between;">
                Impacto de soporte <span>→</span>
              </a>
            </div>
          </div>

          <div style="background:#1F2A44; border-radius:12px; padding:20px; color:#fff;">
            <p style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px; opacity:0.7; margin:0 0 8px;">Take rate actual</p>
            <p style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.4rem; font-weight:900; margin:0 0 4px;">{{ comisionPct }}%</p>
            <p style="font-size:0.8rem; opacity:0.75; margin:0;">Comisión por venta completada, sin costo de publicación</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResumenComponent {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  auditor = AUDITOR_ACTUAL;
  ventas = VENTAS_MENSUALES;
  comisionPct = Math.round(COMISION_PORCENTAJE * 100);

  private gmvActual = this.ventas[this.ventas.length - 1].gmv;
  private gmvAnterior = this.ventas[this.ventas.length - 2].gmv;
  private pedidosActual = this.ventas[this.ventas.length - 1].pedidos;
  private pedidosAnterior = this.ventas[this.ventas.length - 2].pedidos;

  kpis = [
    {
      label: 'GMV del mes', valor: this.fmt(this.gmvActual), color: '#003893',
      variacion: this.pct(this.gmvActual, this.gmvAnterior), subeVsBaja: this.gmvActual >= this.gmvAnterior,
    },
    {
      label: 'Comisión generada', valor: this.fmt(this.gmvActual * COMISION_PORCENTAJE), color: '#2ECC71',
      variacion: this.pct(this.gmvActual, this.gmvAnterior), subeVsBaja: this.gmvActual >= this.gmvAnterior,
    },
    {
      label: 'Pedidos completados', valor: String(this.pedidosActual), color: '#FFCD00',
      variacion: this.pct(this.pedidosActual, this.pedidosAnterior), subeVsBaja: this.pedidosActual >= this.pedidosAnterior,
    },
    {
      label: 'Ticket promedio', valor: this.fmt(Math.round(this.gmvActual / this.pedidosActual)), color: '#C8102E',
      variacion: this.pct(this.gmvActual / this.pedidosActual, this.gmvAnterior / this.pedidosAnterior),
      subeVsBaja: (this.gmvActual / this.pedidosActual) >= (this.gmvAnterior / this.pedidosAnterior),
    },
  ];

  constructor() {
    afterNextRender(() => this.initChart());
  }

  private async initChart() {
    if (!isPlatformBrowser(this.platformId) || !this.chartCanvas) return;
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.ventas.map(v => v.mes),
        datasets: [{
          label: 'GMV (COP)',
          data: this.ventas.map(v => v.gmv),
          borderColor: '#003893',
          backgroundColor: 'rgba(0,56,147,0.10)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: '#FFCD00',
          pointBorderColor: '#003893',
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => ' ' + this.fmt(ctx.parsed.y as number) },
          },
        },
        scales: {
          y: { ticks: { callback: (v) => this.fmtShort(v as number) } },
        },
      },
    });
  }

  private fmt(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }

  private fmtShort(n: number): string {
    return '$' + (n / 1000000).toFixed(1) + 'M';
  }

  private pct(actual: number, anterior: number): string {
    if (!anterior) return '0%';
    return Math.abs(Math.round(((actual - anterior) / anterior) * 100)) + '%';
  }
}
