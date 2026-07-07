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

      <div class="absolute inset-0 opacity-20"
           style="background: radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.12) 0%, transparent 60%);">
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          icon="⚡"
          iconBg="rgba(99,102,241,0.15)"
          badge="Módulo 02 — Técnico"
          title="Análisis Comparativo de Plataforma"
          subtitle="Investigación técnica sobre el rendimiento de lectura de PDFs: Progressive Web App vs. Aplicación Nativa Android con Capacitor."/>

        <!-- Conclusion banner -->
        <div class="mb-8 p-5 rounded-xl bg-indigo-500/8 border border-indigo-500/25">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0 text-xl">🔬</div>
            <div>
              <h4 class="text-white font-semibold text-sm mb-1">Conclusión de la Investigación</h4>
              <p class="text-slate-400 text-sm leading-relaxed">
                Para la <span class="text-white font-medium">Fase 1 (MVP)</span>, la PWA es la opción óptima:
                costo operativo $0, despliegue inmediato y compatibilidad universal.
                La App Nativa con Capacitor se recomienda solo si más del
                <span class="text-indigo-400 font-semibold">60% de usuarios trabajan con PDFs mayores a 30MB</span>
                o requieren funcionalidad offline crítica.
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
