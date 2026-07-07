import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-2xl"
           [style.background]="iconBg()">
        {{ icon() }}
      </div>
      <div class="flex items-center justify-center gap-3 mb-3">
        <div class="h-px w-12 bg-gradient-to-r from-transparent to-sky-500/60"></div>
        <span class="text-sky-400 text-xs font-semibold tracking-widest uppercase">{{ badge() }}</span>
        <div class="h-px w-12 bg-gradient-to-l from-transparent to-sky-500/60"></div>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{{ title() }}</h2>
      <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{{ subtitle() }}</p>
    </div>
  `
})
export class SectionHeaderComponent {
  icon = input('🔧');
  iconBg = input('rgba(14, 165, 233, 0.15)');
  badge = input('Módulo');
  title = input('Título del Módulo');
  subtitle = input('Descripción del módulo.');
}
