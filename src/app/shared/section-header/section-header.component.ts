import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="text-center mb-12">

      <!-- Ícono decorativo -->
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-2xl"
           [style.background]="iconBg()">
        {{ icon() }}
      </div>

      <!-- Badge del módulo -->
      <div class="mb-4">
        <span class="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              [style.background]="onDark() ? 'rgba(255,255,255,0.15)' : 'rgba(125,28,58,0.10)'"
              [style.color]="onDark() ? 'rgba(255,255,255,0.9)' : '#7D1C3A'">
          {{ badge() }}
        </span>
      </div>

      <!-- Título flanqueado por líneas doradas — igual que .lp-section-header de la feria -->
      <div class="flex items-center justify-center gap-4 mb-5">
        <div class="flex-1 h-0.5" style="max-width:140px; background: linear-gradient(to right, transparent, #C8921A);"></div>
        <h2 class="text-3xl sm:text-4xl font-bold leading-tight px-2"
            style="font-family: 'Playfair Display', Georgia, serif; white-space: nowrap;"
            [style.color]="onDark() ? '#ffffff' : '#7D1C3A'">
          {{ title() }}
        </h2>
        <div class="flex-1 h-0.5" style="max-width:140px; background: linear-gradient(to left, transparent, #C8921A);"></div>
      </div>

      <!-- Subtítulo -->
      <p class="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
         [style.color]="onDark() ? 'rgba(255,255,255,0.78)' : '#5a3820'">
        {{ subtitle() }}
      </p>
    </div>
  `
})
export class SectionHeaderComponent {
  icon     = input('🔧');
  iconBg   = input('rgba(125, 28, 58, 0.12)');
  badge    = input('Módulo');
  title    = input('Título del Módulo');
  subtitle = input('Descripción del módulo.');
  onDark   = input(false);
}
