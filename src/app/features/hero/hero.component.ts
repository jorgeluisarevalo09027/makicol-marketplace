import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * §1 Resumen ejecutivo — primer bloque del recorrido "Qué buscamos".
 * Estilo: artesanal cálido y editorial (ver docs/plan-de-negocio/06-sistema-de-diseno.md).
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="mk-section mk-bg-paper scroll-mt-16" style="padding-top:7rem; position:relative; overflow:hidden;">

      <!-- Filete dorado superior, único adorno -->
      <div style="position:absolute; top:0; left:0; right:0; height:4px;
                  background:linear-gradient(90deg, var(--mk-green), var(--mk-gold), var(--mk-terracotta));"></div>

      <div class="mk-section-inner" style="text-align:center;">

        <span class="mk-eyebrow animate-fade-in">Qué buscamos · Propuesta ejecutiva</span>

        <h1 class="animate-fade-in" style="animation-delay:0.1s; font-family:var(--font-brand); font-weight:800;
                   color:var(--mk-ink); line-height:1.1; margin:1.25rem 0 0.75rem;
                   font-size:clamp(2.2rem, 5.5vw, 3.6rem);">
          Marketplace de artesanías
          <span style="color:var(--mk-green-deep);">del Caribe colombiano</span>
        </h1>

        <p class="animate-fade-in" style="animation-delay:0.15s; font-family:var(--font-brand); font-weight:400;
                  color:var(--mk-terracotta); font-size:clamp(1.3rem, 2.5vw, 1.8rem); margin:0 0 1.25rem;">
          Hecho a mano, hecho en Colombia
        </p>

        <p class="mk-subtitle animate-fade-in" style="animation-delay:0.2s; margin:0 auto 2.5rem;">
          Makicol conecta a los artesanos del Caribe con compradores de todo el país. El piloto arranca
          <strong style="color:var(--mk-ink);">sin comisión</strong>: el pago se coordina directo entre comprador
          y artesano, y la plataforma registra el pedido, su estado y la historia de cada creador.
        </p>

        <!-- Tres claves del proyecto -->
        <div class="animate-fade-in" style="animation-delay:0.3s; display:grid; grid-template-columns:repeat(3,1fr);
                    gap:1rem; max-width:760px; margin:0 auto 2.5rem;">
          @for (c of claves; track c.label) {
            <div class="mk-card" style="text-align:left;">
              <div style="font-size:1.6rem; margin-bottom:0.4rem;">{{ c.icon }}</div>
              <div style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.05rem;">{{ c.value }}</div>
              <div style="color:var(--mk-ink-soft); font-size:0.82rem; line-height:1.4; margin-top:0.2rem;">{{ c.label }}</div>
            </div>
          }
        </div>

        <!-- CTAs del recorrido -->
        <div class="animate-fade-in" style="animation-delay:0.4s; display:flex; flex-wrap:wrap; gap:0.9rem; justify-content:center; margin-bottom:1.5rem;">
          <button class="mk-btn" (click)="scrollTo('mercado')">
            Recorrer la propuesta
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          @if (demoUrl) {
            <a class="mk-btn-ghost" [href]="demoUrl" target="_blank" rel="noopener" style="text-decoration:none;">
              🛒 Ver el demo funcional
            </a>
          }
        </div>
        <p style="color:var(--mk-ink-faint); font-size:0.8rem;">
          Qué buscamos → qué tenemos hoy → a dónde vamos
        </p>
      </div>
    </section>
  `
})
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);

  demoUrl = 'https://lively-sky-089458b10.4.azurestaticapps.net/';

  claves = [
    { icon: '🧶', value: 'Artesanos del Caribe', label: 'Arranque regional, con expansión nacional por fases' },
    { icon: '🤝', value: 'Sin comisión', label: 'En el piloto el pago se coordina directo entre comprador y artesano' },
    { icon: '🏛️', value: 'Patrocinio', label: 'Primera fuente de financiación prevista; aún sin acuerdo' },
  ];

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
