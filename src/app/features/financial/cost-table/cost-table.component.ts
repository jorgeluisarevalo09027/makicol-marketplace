import { Component, input, computed } from '@angular/core';

interface AzureService {
  name: string;
  tier: string;
  icon: string;
  baseCost: number;
  scaledCost: number;
  description: string;
  category: 'compute' | 'data' | 'delivery' | 'security';
}

@Component({
  selector: 'app-cost-table',
  standalone: true,
  template: `
    <div class="glass-card rounded-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <h3 class="text-white font-bold text-lg">Infraestructura Azure — Marketplace</h3>
          <p class="text-slate-400 text-sm mt-0.5">Costos mensuales estimados por servicio (USD). Estimaciones propias sin cotización vigente; verificar en la calculadora de Azure.</p>
        </div>
        <div class="flex gap-2">
          <span class="px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-400 text-xs">Base</span>
          <span class="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 text-xs border border-sky-500/25">Escalado</span>
        </div>
      </div>

      <!-- Table header -->
      <div class="grid grid-cols-12 px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800/80">
        <div class="col-span-5">Servicio</div>
        <div class="col-span-3">Tier</div>
        <div class="col-span-2 text-right">Base</div>
        <div class="col-span-2 text-right">Escalado</div>
      </div>

      <!-- Rows -->
      @for (service of services(); track service.name) {
        <div class="grid grid-cols-12 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors duration-150 items-center">
          <div class="col-span-5 flex items-center gap-3">
            <span class="text-xl">{{ service.icon }}</span>
            <div>
              <div class="text-white text-sm font-medium">{{ service.name }}</div>
              <div class="text-slate-500 text-xs">{{ service.description }}</div>
            </div>
          </div>
          <div class="col-span-3">
            <span class="px-2 py-0.5 rounded-md text-xs font-medium"
                  [class]="tierClass(service.category)">
              {{ service.tier }}
            </span>
          </div>
          <div class="col-span-2 text-right">
            <span class="text-slate-400 text-sm font-mono">\${{ service.baseCost }}</span>
          </div>
          <div class="col-span-2 text-right">
            <span class="text-sky-400 text-sm font-mono font-semibold">\${{ service.scaledCost }}</span>
          </div>
        </div>
      }

      <!-- Total row -->
      <div class="px-6 py-5 bg-gradient-to-r from-sky-500/8 to-indigo-500/8 border-t border-sky-500/20">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-white font-bold text-base">Total Mensual Estimado</span>
            <p class="text-slate-400 text-xs mt-0.5">Sin incluir tráfico de excepciones</p>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-center">
              <div class="text-slate-400 text-xl font-bold font-mono">\${{ baseTotal() }}</div>
              <div class="text-slate-500 text-xs">50 productores</div>
            </div>
            <div class="w-px h-8 bg-slate-200"></div>
            <div class="text-center">
              <div class="text-sky-400 text-2xl font-bold font-mono">\${{ scaledTotal() }}</div>
              <div class="text-sky-600 text-xs">1,000 productores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CostTableComponent {
  users = input(300);

  services = computed<AzureService[]>(() => [
    {
      name: 'Azure App Service',
      tier: this.users() <= 100 ? 'B2 Basic' : this.users() <= 500 ? 'P1v3' : 'P2v3',
      icon: '⚙️',
      baseCost: 55,
      scaledCost: this.users() <= 100 ? 55 : this.users() <= 500 ? 140 : 260,
      description: 'Backend: API del marketplace (ASP.NET Core .NET)',
      category: 'compute'
    },
    {
      name: 'Azure SQL Database',
      tier: this.users() <= 100 ? 'S1 Standard' : this.users() <= 500 ? 'S3 Standard' : 'GP Gen5',
      icon: '🗄️',
      baseCost: 28,
      scaledCost: this.users() <= 100 ? 28 : this.users() <= 500 ? 70 : 180,
      description: 'Catálogo, pedidos, artesanos, soporte y auditoría',
      category: 'data'
    },
    {
      name: 'Azure Blob Storage',
      tier: 'LRS Standard',
      icon: '📦',
      baseCost: 6,
      scaledCost: Math.max(6, Math.round(this.users() * 0.04)),
      description: 'Fotos de productos, libros, artesanías',
      category: 'data'
    },
    {
      name: 'Azure Static Web Apps',
      tier: this.users() <= 100 ? 'Free' : 'Standard',
      icon: '🌐',
      baseCost: this.users() <= 100 ? 0 : 9,
      scaledCost: this.users() <= 100 ? 0 : 9,
      description: 'Hosting del front Angular: SSL, CDN y distribución global incluidos',
      category: 'delivery'
    },
  ]);

  baseTotal = computed(() => this.services().reduce((sum, s) => sum + s.baseCost, 0));
  scaledTotal = computed(() => this.services().reduce((sum, s) => sum + s.scaledCost, 0));

  tierClass(category: string): string {
    const map: Record<string, string> = {
      compute: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25',
      data: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
      delivery: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
      security: 'bg-rose-500/15 text-rose-400 border border-rose-500/25',
    };
    return map[category] ?? 'bg-slate-100 text-slate-600 border border-slate-200';
  }
}
