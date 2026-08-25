import { Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-discovery-section',
  standalone: true,
  styles: [`
    .discovery-track {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      padding-bottom: 4px;
    }
    .discovery-track::-webkit-scrollbar {
      display: none;
    }
    .discovery-titulo {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #295440;
      font-size: 1.6rem;
      font-weight: 700;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
    @media (max-width: 600px) {
      .discovery-titulo {
        font-size: 1.2rem;
      }
    }
  `],
  template: `
    <div style="margin-bottom:48px;">
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
        <div style="flex:1; height:2px; max-width:60px; background:linear-gradient(to right,transparent,#FFCD00);"></div>
        <h2 class="discovery-titulo">
          {{ titulo() }}
        </h2>
        <div style="flex:1; height:2px; background:linear-gradient(to left,transparent,#FFCD00);"></div>
        <button (click)="siguiente()"
                title="Ver más piezas"
                style="flex-shrink:0; width:34px; height:34px; border-radius:50%; border:1.5px solid #C6D7CD;
                       background:#fff; color:#295440; display:flex; align-items:center; justify-content:center;
                       cursor:pointer; transition:background 0.15s, border-color 0.15s;">
          <span class="material-symbols-outlined" style="font-size:20px;">chevron_right</span>
        </button>
      </div>

      <div #track class="discovery-track">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class DiscoverySectionComponent {
  titulo = input.required<string>();
  track  = viewChild.required<ElementRef<HTMLDivElement>>('track');

  siguiente() {
    const el = this.track().nativeElement;
    const alFinal = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    el.scrollTo({
      left: alFinal ? 0 : el.scrollLeft + el.clientWidth * 0.9,
      behavior: 'smooth',
    });
  }
}
