import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * §13 Detalles profundos — cierre del recorrido.
 * Agrupa los accesos a los apéndices (regla 8: detalles al final, sin interrumpir la narrativa).
 */
@Component({
  selector: 'app-deep-dives',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="detalles" class="mk-section mk-bg-green-deep scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow" style="background:rgba(255,255,255,0.15); color:#fff;">Detalles profundos</span>
          <h2 class="mk-title" style="color:#fff;">Para quien quiera entrar al detalle</h2>
          <p class="mk-subtitle" style="margin:0 auto; color:rgba(255,255,255,0.8);">
            El recorrido explica lo esencial. Aquí están los apéndices técnicos y de investigación, cada uno
            indicando si refleja el backend de hoy o una propuesta.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1rem;" class="dd-grid">
          @for (d of detalles; track d.ruta) {
            <a [routerLink]="d.ruta" class="dd-card">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
                <span style="font-size:1.6rem;">{{ d.icon }}</span>
                <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.05rem; margin:0;">{{ d.titulo }}</h3>
              </div>
              <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.55; margin:0 0 0.6rem;">{{ d.desc }}</p>
              <span class="mk-badge" [class.mk-badge--today]="d.hoy" [class.mk-badge--target]="!d.hoy">{{ d.marca }}</span>
            </a>
          }
        </div>

        <div style="text-align:center; margin-top:2.5rem;">
          @if (demoUrl) {
            <a class="mk-btn" [href]="demoUrl" target="_blank" rel="noopener" style="text-decoration:none;">
              🛒 Explorar el demo funcional
            </a>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .dd-card {
      display:block; background:var(--mk-surface); border:1px solid var(--mk-sand);
      border-radius:16px; padding:1.5rem; text-decoration:none;
      box-shadow:0 2px 14px rgba(35,49,42,0.06); transition:transform 0.2s, box-shadow 0.2s;
    }
    .dd-card:hover { transform:translateY(-2px); box-shadow:0 6px 22px rgba(0,0,0,0.18); }
    @media (max-width: 760px) { .dd-grid { grid-template-columns: 1fr !important; } }
  `]
})
export class DeepDivesComponent {
  demoUrl = 'https://lively-sky-089458b10.4.azurestaticapps.net/';

  detalles = [
    { ruta: '/base-de-datos', icon: '🗄️', titulo: 'Diseño de base de datos', desc: 'El modelo de datos derivado del backend real: entidades, estados y lo propuesto para el piloto.', hoy: true, marca: 'espejo del backend hoy' },
    { ruta: '/contrato-api', icon: '🔌', titulo: 'Contrato de API', desc: 'Reglas del contrato que expone el servicio; enlaza al Swagger vigente del demo.', hoy: true, marca: 'espejo del backend hoy' },
    { ruta: '/evaluacion-backoffice', icon: '🏛️', titulo: 'Arquitectura: storefront vs. back-office', desc: 'Evaluación de separar las áreas de comprador/artesano de las de soporte/auditor.', hoy: false, marca: 'evaluación' },
    { ruta: '/plataforma-tecnica', icon: '📱', titulo: 'Plataforma: web vs. app nativa', desc: 'Comparación de opciones de plataforma y por qué la web es lo estratégico hoy.', hoy: false, marca: 'evaluación' },
    { ruta: '/envios-internacionales', icon: '🌎', titulo: 'Envíos internacionales', desc: 'Investigación del flujo de exportación. Fase futura, no ejecutada.', hoy: false, marca: 'fase futura' },
  ];
}
