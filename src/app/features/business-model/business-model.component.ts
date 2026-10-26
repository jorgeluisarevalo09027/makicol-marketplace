import { Component } from '@angular/core';

/**
 * §6 Modelo de negocio — momento "A dónde vamos".
 * Fuente: analisis-plan-de-negocio.md (O3) y 04-secciones-narrativas.md. Decisiones del usuario.
 */
@Component({
  selector: 'app-business-model',
  standalone: true,
  template: `
    <section id="modelo" class="mk-section mk-bg-paper scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow mk-eyebrow--target">A dónde vamos · El modelo</span>
          <h2 class="mk-title">Modelo directo, sin comisión, financiado por patrocinio</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            El piloto arranca con el modelo B: el comprador paga al artesano y la plataforma registra el pedido.
            La primera fuente de financiación es el patrocinio; la comisión es una posibilidad, no el plan base.
          </p>
        </div>

        <!-- A vs B -->
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1.25rem; margin-bottom:2.5rem;" class="bm-grid">
          <div class="mk-card" style="border-top:4px solid var(--mk-green);">
            <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.75rem;">
              <span style="font-size:1.4rem;">🤝</span>
              <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-green-deep); font-size:1.15rem; margin:0;">Modelo B · directo</h3>
              <span class="mk-badge mk-badge--today">arranque del piloto</span>
            </div>
            <ul style="margin:0; padding-left:1.1rem; color:var(--mk-ink-soft); font-size:0.88rem; line-height:1.7;">
              <li>El comprador paga directo al artesano.</li>
              <li>La plataforma registra el pedido y su estado, no toca el dinero.</li>
              <li><strong>Sin comisión</strong> para artesano ni comprador.</li>
              <li>El estado de la compra lo manejan comprador y artesano entre sí.</li>
            </ul>
          </div>
          <div class="mk-card" style="border-top:4px solid var(--mk-terracotta); opacity:0.95;">
            <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.75rem;">
              <span style="font-size:1.4rem;">🏦</span>
              <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.15rem; margin:0;">Modelo A · por la plataforma</h3>
              <span class="mk-badge mk-badge--target">futuro</span>
            </div>
            <ul style="margin:0; padding-left:1.1rem; color:var(--mk-ink-soft); font-size:0.88rem; line-height:1.7;">
              <li>La plataforma cobra, retiene y libera al artesano tras la entrega.</li>
              <li>Descuenta una comisión.</li>
              <li>Requiere pasarela, conciliación y concepto legal (recaudo de terceros).</li>
              <li>Se diseña desde ya, se activa cuando el marco legal esté resuelto.</li>
            </ul>
          </div>
        </div>

        <!-- Financiación -->
        <div class="mk-card mk-card--accent">
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.1rem; margin:0 0 1rem;">
            Cómo se financia la plataforma
          </h3>
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;" class="bm-grid">
            @for (f of fuentes; track f.nombre) {
              <div style="text-align:left;">
                <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.3rem;">
                  <span style="font-size:1.2rem;">{{ f.icon }}</span>
                  <span class="mk-badge" [class.mk-badge--today]="f.base" [class.mk-badge--target]="!f.base">{{ f.base ? 'plan base' : 'posibilidad' }}</span>
                </div>
                <div style="font-family:var(--font-brand); font-weight:700; color:var(--mk-ink); font-size:0.92rem;">{{ f.nombre }}</div>
                <p style="color:var(--mk-ink-soft); font-size:0.8rem; line-height:1.5; margin:0.2rem 0 0;">{{ f.desc }}</p>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 820px) { .bm-grid { grid-template-columns: 1fr !important; } }
  `]
})
export class BusinessModelComponent {
  fuentes = [
    { icon: '🏛️', nombre: 'Patrocinio', base: true, desc: 'Primera fuente prevista; aún sin acuerdo firmado.' },
    { icon: '💳', nombre: 'Comisión (modelo A)', base: false, desc: 'Solo si un artesano adopta el cobro por la plataforma.' },
    { icon: '⭐', nombre: 'Destacados', base: false, desc: 'Visibilidad pagada para productos o artesanos.' },
    { icon: '🔑', nombre: 'Suscripción', base: false, desc: 'Plan para artesanos con funciones ampliadas.' },
  ];
}
