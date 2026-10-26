import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { ComparisonCardsComponent } from './comparison-cards/comparison-cards.component';
import { FeatureMatrixComponent } from './feature-matrix/feature-matrix.component';

@Component({
  selector: 'app-technical',
  standalone: true,
  imports: [SectionHeaderComponent, ComparisonCardsComponent, FeatureMatrixComponent],
  template: `
    <section id="tecnico" class="relative py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16">

      <div class="absolute inset-0"
           style="background: radial-gradient(ellipse at 85% 40%, rgba(46,204,113,0.10) 0%, transparent 60%), radial-gradient(ellipse at 15% 60%, rgba(218,175,55,0.07) 0%, transparent 55%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="⚡"
          iconBg="rgba(46,204,113,0.15)"
          badge="Módulo 02 — Técnico"
          title="PWA Marketplace vs. App Nativa"
          subtitle="Comparación de opciones de plataforma. Hoy existe una aplicación web; la PWA, los pagos en línea y los videos cortos son opciones futuras, no funcionalidades del demo."/>

        <!-- Conclusion banner -->
        <div class="mb-8 p-5 rounded-xl" style="background:rgba(46,204,113,0.08); border:1px solid rgba(46,204,113,0.25);">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style="background:rgba(46,204,113,0.18);">🔬</div>
            <div>
              <h4 class="text-white font-semibold text-sm mb-1">Conclusión de la Investigación</h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Para <span class="text-white font-medium">Makicol Marketplace</span>, mantener la aplicación web (con PWA como posible mejora) es la opción estratégica:
                accesible desde cualquier dispositivo sin instalación, ideal para productores artesanales con acceso limitado a datos.
                La App Nativa queda como <span class="text-indigo-400 font-semibold">visión</span> si la base de compradores crece y se requieren notificaciones push avanzadas (umbral de 5,000 usuarios activos mensuales: supuesto sin sustento).
              </p>
            </div>
          </div>
        </div>

        <!-- Comparison Cards -->
        <div class="mb-8">
          <app-comparison-cards/>
        </div>

        <!-- Feature Matrix -->
        <app-feature-matrix/>
      </div>
    </section>
    <hr class="section-divider mx-auto max-w-4xl">
  `
})
export class TechnicalComponent {}
