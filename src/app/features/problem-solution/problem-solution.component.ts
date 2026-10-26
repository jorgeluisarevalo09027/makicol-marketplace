import { Component } from '@angular/core';

/**
 * §2 Descripción + §3 Problema y solución — momento "Qué buscamos".
 * Fuente: docs/plan-de-negocio/04-secciones-narrativas.md (§3) y analisis-plan-de-negocio.md (O3).
 */
@Component({
  selector: 'app-problem-solution',
  standalone: true,
  template: `
    <section id="problema" class="mk-section mk-bg-paper-alt scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow">Qué buscamos · El problema</span>
          <h2 class="mk-title">El artesano produce valor, pero no llega al mercado digital</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            Colombia tiene más de 25.000 artesanos caracterizados en los 32 departamentos. Su obra tiene
            demanda, pero su canal digital es limitado y las plataformas que existen le quitan margen e identidad.
          </p>
        </div>

        <!-- Problema: tres frenos -->
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; margin-bottom:3.5rem;" class="ps-grid">
          @for (p of frenos; track p.title) {
            <div class="mk-card">
              <div style="font-size:1.5rem; margin-bottom:0.5rem;">{{ p.icon }}</div>
              <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1rem; margin:0 0 0.4rem;">{{ p.title }}</h3>
              <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0;">{{ p.text }}</p>
            </div>
          }
        </div>

        <!-- Solución -->
        <div class="mk-card mk-card--accent" style="border-left-color:var(--mk-green);">
          <span class="mk-eyebrow" style="margin-bottom:0.75rem;">La solución · Makicol</span>
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-green-deep); font-size:1.4rem; margin:0.5rem 0 1rem;">
            Un marketplace regional, con alma y sin comisión al arranque
          </h3>
          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1rem;" class="ps-grid">
            @for (s of solucion; track s) {
              <div style="display:flex; gap:0.6rem; align-items:flex-start;">
                <span style="color:var(--mk-green); font-weight:800;">✓</span>
                <span style="color:var(--mk-ink-soft); font-size:0.9rem; line-height:1.6;">{{ s }}</span>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 820px) { .ps-grid { grid-template-columns: 1fr !important; } }
  `]
})
export class ProblemSolutionComponent {
  frenos = [
    { icon: '🧩', title: 'Canal digital limitado', text: 'La actividad es mayoritariamente rural y de predominio femenino (71,6 %), con brecha digital. Vender en línea es difícil sin apoyo.' },
    { icon: '💸', title: 'Las plataformas cobran y diluyen', text: 'En los marketplaces generalistas el artesano paga comisión y compite con todo el catálogo, sin relato propio.' },
    { icon: '📅', title: 'Las ferias son puntuales', text: 'Expoartesano batió récord con $4.606 millones en ventas, pero las ferias son estacionales y locales.' },
  ];

  solucion = [
    'Una vitrina con la historia de cada artesano: el backend ya gestiona contenido editorial.',
    'Modelo B directo: el comprador paga al artesano; la plataforma registra el pedido y su estado.',
    'Sin comisión al arranque; la financiación base es el patrocinio.',
    'Producto ya construido: demo funcional con cuatro roles y backend propio en Azure.',
  ];
}
