import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  styles: [`
    /* Filetes dorados: casi invisibles en móvil para no robar ancho al título. */
    .sh-rule { max-width: 32px; }
    /* El título fluye en varias líneas en móvil; solo evita el salto desde md hacia arriba. */
    @media (min-width: 768px) {
      .sh-rule { max-width: 140px; }
      .sh-title { white-space: nowrap; }
    }
  `],
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
              [style.background]="onDark() ? 'rgba(255,255,255,0.15)' : 'rgba(41,84,64,0.10)'"
              [style.color]="onDark() ? 'rgba(255,255,255,0.9)' : '#295440'">
          {{ badge() }}
        </span>
      </div>

      <!-- Título flanqueado por líneas doradas — igual que .lp-section-header de la feria -->
      <div class="flex items-center justify-center gap-2 sm:gap-4 mb-5">
        <div class="sh-rule flex-1 h-0.5" style="background: linear-gradient(to right, transparent, #FFCD00);"></div>
        <h2 class="sh-title text-3xl sm:text-4xl font-bold leading-tight px-2"
            style="font-family: 'Plus Jakarta Sans', sans-serif;"
            [style.color]="onDark() ? '#ffffff' : '#295440'">
          {{ title() }}
        </h2>
        <div class="sh-rule flex-1 h-0.5" style="background: linear-gradient(to left, transparent, #FFCD00);"></div>
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
  iconBg   = input('rgba(41,84,64, 0.12)');
  badge    = input('Módulo');
  title    = input('Título del Módulo');
  subtitle = input('Descripción del módulo.');
  onDark   = input(false);
}
