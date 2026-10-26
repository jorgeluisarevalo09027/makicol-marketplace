import { Component } from '@angular/core';

/**
 * §4 Análisis de mercado + §5 Competencia — momento "Qué buscamos".
 * Fuente: docs/plan-de-negocio/04-secciones-narrativas.md (§4, §5). Datos con fuente citada.
 */
@Component({
  selector: 'app-market',
  standalone: true,
  template: `
    <section id="mercado" class="mk-section mk-bg-paper scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow">Qué buscamos · El mercado</span>
          <h2 class="mk-title">Un sector grande, en crecimiento y poco digitalizado</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            Las cifras provienen de fuentes públicas (Artesanías de Colombia, ProColombia, MinCIT). Las de
            comercio electrónico son secundarias y se verificarán con la fuente primaria antes de usarse como meta.
          </p>
        </div>

        <!-- Cifras clave -->
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:3.5rem;" class="mk-stats">
          @for (s of cifras; track s.label) {
            <div class="mk-card" style="text-align:center;">
              <div style="font-family:var(--font-brand); font-weight:800; color:var(--mk-green-deep); font-size:1.6rem;">{{ s.value }}</div>
              <div style="color:var(--mk-ink-soft); font-size:0.78rem; line-height:1.4; margin:0.3rem 0;">{{ s.label }}</div>
              <div style="color:var(--mk-ink-faint); font-size:0.68rem;">{{ s.source }}</div>
            </div>
          }
        </div>

        <!-- Competencia -->
        <div style="text-align:center; margin-bottom:2rem;">
          <span class="mk-eyebrow">Qué buscamos · La competencia</span>
          <h2 class="mk-title" style="font-size:clamp(1.5rem,3vw,2rem);">Con qué compite Makicol y qué lo diferencia</h2>
        </div>

        <div class="mk-card" style="padding:0; overflow:hidden;">
          <div class="comp-row comp-head">
            <div style="padding:0.85rem 1rem;">Canal</div>
            <div style="padding:0.85rem 1rem;">Qué es</div>
            <div style="padding:0.85rem 1rem;">Límite para el artesano</div>
          </div>
          @for (row of competencia; track row.canal; let i = $index) {
            <div class="comp-row" [class.comp-alt]="i % 2 !== 0">
              <div style="padding:0.8rem 1rem; font-weight:700; color:var(--mk-ink);">{{ row.canal }}</div>
              <div style="padding:0.8rem 1rem; color:var(--mk-ink-soft);">{{ row.que }}</div>
              <div style="padding:0.8rem 1rem; color:var(--mk-ink-soft);">{{ row.limite }}</div>
            </div>
          }
        </div>

        <!-- Ventaja -->
        <div class="mk-card mk-card--accent" style="margin-top:1.5rem; border-left-color:var(--mk-terracotta);">
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.1rem; margin:0 0 0.75rem;">
            La ventaja de Makicol
          </h3>
          <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
            @for (v of ventajas; track v) {
              <span class="mk-badge mk-badge--today" style="font-size:0.78rem; padding:0.4rem 0.8rem;">{{ v }}</span>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .comp-row { display:grid; grid-template-columns:1.2fr 1fr 1.3fr; font-size:0.82rem; line-height:1.5; background:var(--mk-surface); }
    .comp-head { background:var(--mk-green); color:#fff; font-weight:700; font-size:0.8rem; }
    .comp-alt { background:var(--mk-green-tint); }
    @media (max-width: 900px) { .mk-stats { grid-template-columns: repeat(2,1fr) !important; } }
    @media (max-width: 760px) { .comp-row { grid-template-columns: 1fr; } .comp-head { display:none; } }
  `]
})
export class MarketComponent {
  cifras = [
    { value: '+25.000', label: 'Artesanos caracterizados (SIEAA)', source: 'Artesanías de Colombia' },
    { value: '32.597', label: 'Participantes Expoartesanías 2025 (+56 % vs 2024)', source: 'ProColombia' },
    { value: '71,6 %', label: 'Son mujeres (predominio femenino)', source: 'Artesanías de Colombia' },
    { value: '$4.606 M', label: 'Ventas de una sola feria (Expoartesano)', source: 'Artesanías de Colombia' },
  ];

  competencia = [
    { canal: 'Mercado Libre', que: 'Marketplace generalista con tienda oficial del sector', limite: 'Comisión; compite con todo el catálogo; sin relato propio' },
    { canal: 'Tiendanube / Shopify', que: 'Plataformas para montar tienda propia', limite: 'El artesano asume costo, montaje y tráfico; no hay demanda agregada' },
    { canal: 'Ferias (Expoartesanías)', que: 'Canales presenciales de alto impacto', limite: 'Puntuales, estacionales y locales' },
    { canal: 'Redes sociales / WhatsApp', que: 'Canal informal dominante', limite: 'Sin catálogo, trazabilidad, soporte ni auditoría' },
  ];

  ventajas = [
    'Modelo B sin comisión al arranque',
    'Historia e identidad del creador',
    'Producto construido y verificable',
    'Enfoque regional del Caribe',
  ];
}
