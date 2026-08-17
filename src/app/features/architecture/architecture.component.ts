import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { ArchDiagramComponent } from './arch-diagram/arch-diagram.component';
import { ScalabilityPhasesComponent } from './scalability-phases/scalability-phases.component';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [SectionHeaderComponent, ArchDiagramComponent, ScalabilityPhasesComponent],
  template: `
    <section id="arquitectura" class="relative py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 section-borgona">

      <div class="absolute inset-0"
           style="background: radial-gradient(ellipse at 20% 80%, rgba(41,84,64,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(46,204,113,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(218,175,55,0.07) 0%, transparent 45%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="🏗️"
          iconBg="rgba(255,255,255,0.15)"
          badge="Módulo 03 — Arquitectura"
          title="Arquitectura Cloud del Marketplace"
          subtitle="Topología Azure para Makicol Marketplace: capa de pagos (Wompi/PSE/Efecty), media para reels y CDN para el catálogo de artesanos."
          [onDark]="true"/>

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
    <!-- Footer — azul institucional Makicol -->
    <footer class="section-navy py-10 px-4 text-center">
      <div class="max-w-7xl mx-auto">
        <img src="/assets/makicol-icono-base.svg" alt="Makicol" class="mx-auto mb-3" style="height:32px; opacity:0.85;">
        <p class="font-bold text-base mb-1" style="color:rgba(255,255,255,0.92); font-family:'Plus Jakarta Sans',sans-serif;">
          Makicol Marketplace
        </p>
        <p style="color:rgba(255,255,255,0.55); font-size:0.82rem; margin:3px 0;">
          Artesanías y emprendimiento colombiano · Vende y compra en todo el país
        </p>
        <p style="color:rgba(255,255,255,0.38); font-size:0.72rem; margin-top:6px;">
          Propuesta Ejecutiva v1.0 · Angular 21 + Azure Cloud
        </p>
      </div>
    </footer>
  `
})
export class ArchitectureComponent {
  principles = [
    {
      icon: '�',
      title: 'Acceso Abierto a Productores',
      text: 'Cualquier artesano o emprendedor de Colombia puede registrarse y vender desde el día 1 sin instalar nada, solo con un navegador.'
    },
    {
      icon: '�',
      title: 'Pagos Seguros Colombianos',
      text: 'Wompi (Bancolombia) integrado desde Fase 1: PSE, Nequi, Daviplata, tarjeta y Efecty en efectivo. La capa de pagos es independiente de la infraestructura.'
    },
    {
      icon: '💸',
      title: 'Autosostenible con Patrocinadores',
      text: 'Año 1 cubierto por inversión inicial y aliados estratégicos. Desde el mes 8, las comisiones de venta superan el costo operativo de Azure.'
    },
  ];
}
