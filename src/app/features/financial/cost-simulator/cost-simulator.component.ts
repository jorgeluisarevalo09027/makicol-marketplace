import {
  Component, PLATFORM_ID, ElementRef, ViewChild,
  afterNextRender, effect, signal, computed, inject
} from '@angular/core';
import { isPlatformBrowser, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cost-simulator',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  template: `
    <div class="glass-card rounded-2xl p-6 h-full flex flex-col gap-6">
      <div>
        <h3 class="text-white font-bold text-lg">Simulador de Costos Interactivo</h3>
        <p class="text-slate-400 text-sm mt-0.5">Ajusta los parámetros para estimar el impacto en costos</p>
      </div>

      <!-- Sliders -->
      <div class="space-y-6">
        <!-- Users slider -->
        <div>
          <div class="flex justify-between items-center mb-3">
            <label class="text-slate-300 text-sm font-semibold flex items-center gap-2">
              <span class="text-base">👥</span> Usuarios Activos Mensuales
            </label>
            <div class="flex items-center gap-1.5">
              <span class="text-sky-400 font-bold text-lg font-mono">{{ users() | number }}</span>
              <span class="text-slate-500 text-xs">usuarios</span>
            </div>
          </div>
          <input type="range" class="range-thumb w-full"
                 min="100" max="5000" step="50"
                 [value]="users()"
                 (input)="onUsersChange($event)">
          <div class="flex justify-between text-slate-600 text-xs mt-1.5">
            <span>100</span><span>1,000</span><span>2,500</span><span>5,000</span>
          </div>
        </div>

        <!-- GB slider -->
        <div>
          <div class="flex justify-between items-center mb-3">
            <label class="text-slate-300 text-sm font-semibold flex items-center gap-2">
              <span class="text-base">📊</span> Transferencia CDN Mensual
            </label>
            <div class="flex items-center gap-1.5">
              <span class="text-emerald-400 font-bold text-lg font-mono">{{ gbTransfer() }}</span>
              <span class="text-slate-500 text-xs">GB</span>
            </div>
          </div>
          <input type="range" class="range-thumb w-full"
                 min="10" max="1000" step="10"
                 [value]="gbTransfer()"
                 (input)="onGbChange($event)">
          <div class="flex justify-between text-slate-600 text-xs mt-1.5">
            <span>10 GB</span><span>250 GB</span><span>500 GB</span><span>1 TB</span>
          </div>
        </div>
      </div>

      <!-- Cost summary cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        @for (item of costItems(); track item.label) {
          <div class="rounded-xl p-3 border transition-all duration-300"
               [style.background]="item.bg"
               [style.borderColor]="item.border">
            <div class="text-xs text-slate-400 mb-1 font-medium">{{ item.label }}</div>
            <div class="text-base font-bold font-mono" [style.color]="item.color">
              \${{ item.cost }}
            </div>
            <div class="text-[10px] text-slate-500 mt-0.5">/ mes</div>
          </div>
        }
      </div>

      <!-- Chart -->
      <div class="flex-1 min-h-[220px] relative">
        <canvas #chartCanvas class="w-full"></canvas>
      </div>

      <!-- Total footer -->
      <div class="rounded-xl p-4 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 flex items-center justify-between">
        <div>
          <div class="text-slate-400 text-xs uppercase tracking-wider font-semibold">Costo Total Estimado</div>
          <div class="text-slate-400 text-xs mt-0.5">Infraestructura mensual Azure</div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-black text-white font-mono">\${{ totalCost() }}</div>
          <div class="text-sky-400 text-xs font-medium mt-0.5">USD / mes</div>
        </div>
      </div>
    </div>
  `
})
export class CostSimulatorComponent {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: any = null;

  users = signal(300);
  gbTransfer = signal(100);

  appServiceCost = computed(() => {
    const u = this.users();
    if (u <= 500) return 60;
    if (u <= 1500) return 150;
    if (u <= 3000) return 280;
    return 420;
  });

  sqlCost = computed(() => {
    const u = this.users();
    if (u <= 500) return 30;
    if (u <= 1500) return 75;
    if (u <= 3000) return 185;
    return 320;
  });

  blobCost = computed(() => Math.max(5, Math.round(this.gbTransfer() * 0.025)));

  cdnCost = computed(() => Math.max(5, Math.round(this.gbTransfer() * 0.087)));

  frontDoorCost = computed(() => 22);

  totalCost = computed(() =>
    this.appServiceCost() + this.sqlCost() + this.blobCost() + this.cdnCost() + this.frontDoorCost()
  );

  costItems = computed(() => [
    { label: 'App Service', cost: this.appServiceCost(), color: '#a5b4fc', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)' },
    { label: 'SQL Database', cost: this.sqlCost(), color: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
    { label: 'Blob Storage', cost: this.blobCost(), color: '#fcd34d', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
    { label: 'Azure CDN', cost: this.cdnCost(), color: '#f9a8d4', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.25)' },
  ]);

  constructor() {
    afterNextRender(() => {
      this.initChart();
    });

    effect(() => {
      const data = [
        this.appServiceCost(),
        this.sqlCost(),
        this.blobCost(),
        this.cdnCost(),
        this.frontDoorCost()
      ];
      if (this.chart) {
        this.chart.data.datasets[0].data = data;
        this.chart.update('active');
      }
    });
  }

  onUsersChange(event: Event) {
    this.users.set(Number((event.target as HTMLInputElement).value));
  }

  onGbChange(event: Event) {
    this.gbTransfer.set(Number((event.target as HTMLInputElement).value));
  }

  private async initChart() {
    if (!isPlatformBrowser(this.platformId) || !this.chartCanvas) return;
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['App Service', 'SQL Database', 'Blob Storage', 'Azure CDN', 'Front Door'],
        datasets: [{
          label: 'Costo (USD/mes)',
          data: [
            this.appServiceCost(),
            this.sqlCost(),
            this.blobCost(),
            this.cdnCost(),
            this.frontDoorCost()
          ],
          backgroundColor: [
            'rgba(99,102,241,0.75)',
            'rgba(16,185,129,0.75)',
            'rgba(245,158,11,0.75)',
            'rgba(236,72,153,0.75)',
            'rgba(239,68,68,0.75)',
          ],
          borderColor: [
            '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#ef4444'
          ],
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400, easing: 'easeInOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15,23,42,0.95)',
            borderColor: 'rgba(14,165,233,0.3)',
            borderWidth: 1,
            titleColor: '#94a3b8',
            bodyColor: '#f1f5f9',
            padding: 12,
            callbacks: {
              label: (ctx) => ` $${ctx.parsed.y} USD/mes`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(51,65,85,0.4)', lineWidth: 1 },
            ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } },
            border: { color: 'transparent' }
          },
          y: {
            grid: { color: 'rgba(51,65,85,0.4)', lineWidth: 1 },
            ticks: {
              color: '#64748b',
              font: { size: 10, family: 'Inter' },
              callback: (v) => `$${v}`
            },
            border: { color: 'transparent' }
          }
        }
      }
    });
  }
}
