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

      <div class="absolute inset-0 opacity-20"
           style="background: radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.08) 0%, transparent 50%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="🏗️"
          iconBg="rgba(245,158,11,0.15)"
          badge="Módulo 03 — Arquitectura"
          title="Arquitectura Cloud y Escalabilidad"
          subtitle="Topología completa de la plataforma en Azure con plan de escalabilidad evolutivo en 3 fases independientes."/>

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
              <span class="text-white font-bold text-sm">AzurePlatform</span>
              <span class="text-slate-500 text-xs ml-2">— Propuesta Ejecutiva v1.0</span>
            </div>
          </div>
          <div class="flex items-center gap-6 text-slate-500 text-xs">
            <span>Angular 21 + Azure Cloud</span>
            <span class="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>Dashboard de Investigación Técnica</span>
            <span class="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>2025</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class ArchitectureComponent {
  principles = [
    {
      icon: '🧱',
      title: 'Núcleo Inmutable',
      text: 'La capa API y datos permanece sin cambios al añadir módulos. Cada fase es un añadido, no una reescritura.'
    },
    {
      icon: '📐',
      title: 'Separación de Responsabilidades',
      text: 'Cada capa (cliente, gateway, API, datos, entrega) tiene una responsabilidad única y puede escalarse independientemente.'
    },
    {
      icon: '💸',
      title: 'Costo Progresivo',
      text: 'El costo escala proporcionalmente al valor entregado. La Fase 1 es viable desde el día 1 con mínima inversión.'
    },
  ];
}
