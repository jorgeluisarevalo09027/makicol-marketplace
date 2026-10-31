import { Component } from '@angular/core';

/**
 * §8 Crecimiento + §11 Hitos y métricas — momento "A dónde vamos".
 * Fuente: 04-secciones-narrativas.md (§8, §11). Valores objetivo pendientes de decisión.
 */
@Component({
  selector: 'app-roadmap',
  standalone: true,
  template: `
    <section id="plan" class="mk-section mk-bg-paper scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow mk-eyebrow--target">A dónde vamos · El plan</span>
          <h2 class="mk-title">Del demo al piloto, y del Caribe al país</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            Cuatro fases. Arrancamos en el Caribe y crecemos por fases al resto del país. Las métricas del
            piloto están definidas; sus valores objetivo se fijan con el equipo.
          </p>
        </div>

        <!-- Fases -->
        <div style="display:flex; flex-direction:column; gap:0;">
          @for (f of fases; track f.num; let last = $last) {
            <div style="display:flex; gap:1rem;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <div style="width:2.5rem; height:2.5rem; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center;
                            font-family:var(--font-brand); font-weight:800; color:#fff;"
                     [style.background]="f.hoy ? 'var(--mk-green)' : 'var(--mk-terracotta)'">{{ f.num }}</div>
                @if (!last) { <div style="width:2px; flex:1; background:var(--mk-sand); min-height:1.5rem;"></div> }
              </div>
              <div class="mk-card" style="flex:1; margin-bottom:1rem;">
                <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.4rem;">
                  <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.05rem; margin:0;">{{ f.titulo }}</h3>
                  <span class="mk-badge" [class.mk-badge--today]="f.hoy" [class.mk-badge--target]="!f.hoy">{{ f.estado }}</span>
                </div>
                <p style="color:var(--mk-ink-soft); font-size:0.86rem; line-height:1.6; margin:0;">{{ f.texto }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Métricas del piloto -->
        <div class="mk-card mk-card--accent" style="margin-top:1.5rem;">
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-green-deep); font-size:1.1rem; margin:0 0 0.4rem;">
            Métricas de éxito del piloto
          </h3>
          <p style="color:var(--mk-ink-faint); font-size:0.78rem; margin:0 0 1rem;">Los valores objetivo se definen con el equipo (pendiente).</p>
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;" class="rm-grid rm-grid-4">
            @for (m of metricas; track m) {
              <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                <span style="color:var(--mk-green); font-weight:800;">◆</span>
                <span style="color:var(--mk-ink-soft); font-size:0.84rem; line-height:1.5;">{{ m }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Crecimiento -->
        <div class="mk-card" style="margin-top:1.5rem;">
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.05rem; margin:0 0 0.75rem;">
            Cómo crecemos (§8)
          </h3>
          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:0.7rem 1.5rem;" class="rm-grid">
            @for (g of crecimiento; track g) {
              <div style="display:flex; gap:0.6rem; align-items:flex-start;">
                <span style="color:var(--mk-terracotta); font-weight:800;">→</span>
                <span style="color:var(--mk-ink-soft); font-size:0.86rem; line-height:1.5;">{{ g }}</span>
              </div>
            }
          </div>
          <p style="color:var(--mk-ink-faint); font-size:0.78rem; margin:1rem 0 0;">
            Presupuesto y canales concretos de marketing: pendientes de definir.
          </p>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 820px) { .rm-grid { grid-template-columns: 1fr !important; } }
    /* La fila de 4 métricas pasa por un escalón de 2 columnas en tablet antes de colapsar.
       Se declara después de .rm-grid para ganar por orden de origen a igual especificidad. */
    @media (max-width: 900px) { .rm-grid-4 { grid-template-columns: repeat(2, 1fr) !important; } }
    @media (max-width: 560px) { .rm-grid-4 { grid-template-columns: 1fr !important; } }
  `]
})
export class RoadmapComponent {
  fases = [
    { num: 0, titulo: 'Demo construido', estado: 'hecho', hoy: true, texto: 'Backend, front y propuesta ya existen y están desplegados. Es la base verificable del proyecto.' },
    { num: 1, titulo: 'Preparación del piloto', estado: 'siguiente', hoy: false, texto: 'Migración de autenticación (Auth0, MFA), medios de pago por artesano, contra entrega con Servientrega y simulación en el backend.' },
    { num: 2, titulo: 'Piloto en el Caribe', estado: 'propuesta', hoy: false, texto: 'Operación real con un grupo acotado de artesanos y compradores de la región. Alcance y fecha por definir.' },
    { num: 3, titulo: 'Escala nacional', estado: 'futuro', hoy: false, texto: 'Expansión por fases fuera del Caribe, comisión opcional (modelo A) e internacionalización (fase futura).' },
  ];

  metricas = [
    'Artesanos activados con al menos una venta',
    'Pedidos cerrados (recaudo realizado)',
    'GMV del piloto (ya se agrega en el backend)',
    'Casos de soporte por pedido y tiempo de resolución',
  ];

  crecimiento = [
    'Alianzas con el ecosistema artesanal y académico del Caribe (Artesanías de Colombia, Unimagdalena).',
    'Contenido editorial: las historias de los artesanos son parte del producto.',
    'El patrocinador como altavoz de marca.',
    'Boca a boca entre artesanos: "vende sin comisión y con tu historia".',
  ];
}
