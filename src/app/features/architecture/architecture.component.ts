import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { ArchDiagramComponent } from './arch-diagram/arch-diagram.component';
import { ScalabilityPhasesComponent } from './scalability-phases/scalability-phases.component';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [SectionHeaderComponent, ArchDiagramComponent, ScalabilityPhasesComponent],
  template: `
    <section id="arquitectura" class="relative py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16">

      <div class="absolute inset-0"
           style="background: radial-gradient(ellipse at 20% 80%, rgba(125,28,58,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(42,184,176,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(200,146,26,0.07) 0%, transparent 45%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="🏗️"
          iconBg="rgba(245,158,11,0.15)"
          badge="Módulo 03 — Arquitectura"
          title="Arquitectura Cloud del Marketplace"
          subtitle="Topología Azure para el Marketplace Caribe Artesanal: capa de pagos (MercadoPago/PSE), media para reels y CDN para el catálogo de artesanos."/>

        <!-- Architecture principle banner -->
        <div class="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          @for (principle of principles; track principle.title) {
            <div class="glass-card rounded-xl p-4 flex gap-3 items-start">
              <span class="text-2xl flex-shrink-0">{{ principle.icon }}</span>
              <div>
                <div class="text-white text-sm font-semibold mb-1">{{ principle.title }}</div>
                <div class="text-slate-400 text-xs leading-relaxed">{{ principle.text }}</div>
              </div>
            </div>
          }
        </div>

        <!-- Architecture diagram -->
        <div class="mb-8">
          <app-arch-diagram/>
        </div>

        <!-- Scalability phases -->
        <app-scalability-phases/>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-800 py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
              </svg>
            </div>
            <div>
              <span class="text-white font-bold text-sm">Marketplace Caribe Artesanal</span>
              <span class="text-slate-500 text-xs ml-2">— Propuesta Ejecutiva v1.0</span>
            </div>
          </div>
          <div class="flex items-center gap-6 text-slate-500 text-xs">
            <span>Angular 21 + Azure Cloud</span>
            <span class="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>FilSMar · Unimagdalena · Santa Marta</span>
            <span class="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class ArchitectureComponent {
  principles = [
    {
      icon: '�',
      title: 'Acceso Abierto a Productores',
      text: 'Cualquier artesano o editorial de Santa Marta puede registrarse y vender desde el día 1 sin instalar nada, solo con un navegador.'
    },
    {
      icon: '�',
      title: 'Pagos Seguros Colombianos',
      text: 'MercadoPago Colombia integrado desde Fase 1: PSE, Nequi, Daviplata y tarjeta. La capa de pagos es independiente de la infraestructura.'
    },
    {
      icon: '💸',
      title: 'Autosostenible con Patrocinadores',
      text: 'Año 1 cubierto por Unimagdalena y aliados. Desde el mes 8, las comisiones de venta superan el costo operativo de Azure.'
    },
  ];
}
