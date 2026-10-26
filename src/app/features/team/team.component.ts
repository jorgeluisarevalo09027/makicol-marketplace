import { Component } from '@angular/core';

/**
 * §10 Equipo y aliados — momento "Qué buscamos" (quiénes están detrás).
 * Datos aportados por el usuario (26-oct-2026).
 */
@Component({
  selector: 'app-team',
  standalone: true,
  template: `
    <section id="equipo" class="mk-section mk-bg-paper scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow">Quiénes somos · El equipo</span>
          <h2 class="mk-title">Un dúo que une desarrollo y territorio</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            Makicol nace del cruce entre software y conocimiento del terreno artesanal y turístico del Caribe.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem; margin-bottom:2.5rem;" class="team-grid">
          @for (p of personas; track p.nombre) {
            <div class="mk-card" style="display:flex; gap:1.25rem; align-items:flex-start;">
              <img [src]="p.foto" [alt]="p.nombre"
                   style="width:84px; height:84px; border-radius:50%; object-fit:cover; flex-shrink:0; border:3px solid var(--mk-green-tint);">
              <div>
                <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.1rem; margin:0 0 0.15rem;">{{ p.nombre }}</h3>
                <div style="color:var(--mk-green-deep); font-weight:700; font-size:0.85rem; margin-bottom:0.5rem;">{{ p.rol }}</div>
                <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.55; margin:0;">{{ p.bio }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Aliados / apoyo -->
        <div class="mk-card mk-card--accent">
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.05rem; margin:0 0 0.75rem;">
            Aliados y apoyos del proyecto
          </h3>
          <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
            @for (a of aliados; track a) {
              <span class="mk-badge mk-badge--today" style="font-size:0.78rem; padding:0.4rem 0.8rem;">{{ a }}</span>
            }
          </div>
          <p style="color:var(--mk-ink-faint); font-size:0.78rem; margin:1rem 0 0;">
            El proyecto reconoce que necesita asesoría legal para los términos, el tratamiento de datos y el
            recaudo; ese rol está previsto y presupuestado (por cotizar).
          </p>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 760px) { .team-grid { grid-template-columns: 1fr !important; } }
  `]
})
export class TeamComponent {
  personas = [
    {
      nombre: 'Jorge Luis Arévalo Murcia',
      rol: 'Desarrollo · Producto técnico',
      foto: '/assets/equipo/jorge-arevalo.jpeg',
      bio: 'Desarrollador full stack con más de 5 años de experiencia. Actualmente estudia Análisis y Desarrollo de Software en el SENA. Responsable del backend, el frontend y la arquitectura de Makicol.',
    },
    {
      nombre: 'Rafael José Granados Avendaño',
      rol: 'Producto · Turismo y artesanos',
      foto: '/assets/equipo/rafael-granados.jpeg',
      bio: 'Guía turístico con más de 12 años de experiencia y tecnólogo en Guianza Turística egresado del SENA. Aporta el conocimiento del territorio, el turismo y la relación con los artesanos del Caribe.',
    },
  ];

  aliados = [
    'FilSMar / Unimagdalena (Santa Marta)',
    'Ecosistema artesanal del Caribe',
    'SENA',
  ];
}
