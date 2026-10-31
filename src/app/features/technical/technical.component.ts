import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComparisonCardsComponent } from './comparison-cards/comparison-cards.component';
import { FeatureMatrixComponent } from './feature-matrix/feature-matrix.component';

/**
 * Apéndice (§13): comparación PWA vs. app nativa. Accesible desde "Detalles profundos".
 * Es una evaluación técnica (estado objetivo), no una función del demo.
 */
@Component({
  selector: 'app-technical',
  standalone: true,
  imports: [RouterLink, ComparisonCardsComponent, FeatureMatrixComponent],
  template: `
    <div style="min-height:100vh; background:var(--mk-paper);">

      <header style="background:var(--mk-surface); border-bottom:1px solid var(--mk-sand); position:sticky; top:0; z-index:40;">
        <div style="max-width:1100px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <a routerLink="/propuesta" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:32px; height:32px; object-fit:contain;">
            <span style="color:var(--mk-green-deep); font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem;">Makicol · Propuesta Ejecutiva</span>
          </a>
          <a routerLink="/propuesta" style="color:var(--mk-ink-soft); font-size:0.82rem; text-decoration:none; font-weight:600;">← Volver a la propuesta</a>
        </div>
      </header>

      <section style="padding:56px 20px 32px; text-align:center; background:var(--mk-paper-alt);">
        <div style="max-width:760px; margin:0 auto;">
          <span class="mk-badge mk-badge--target" style="font-size:0.75rem;">Apéndice · evaluación</span>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:900; font-size:clamp(1.6rem, 5vw, 2.1rem); line-height:1.2; margin:14px 0;">
            Aplicación web vs. app nativa
          </h1>
          <p style="color:var(--mk-ink-soft); font-size:1rem; line-height:1.6; max-width:640px; margin:0 auto;">
            Comparación de opciones de plataforma. Hoy existe una aplicación web; la PWA, los pagos en línea y
            los videos cortos son opciones futuras, no funciones del demo.
          </p>
        </div>
      </section>

      <div style="max-width:1100px; margin:0 auto; padding:0 20px 56px;">

        <div class="mk-card mk-card--accent" style="margin:24px 0;">
          <h4 style="color:var(--mk-green-deep); font-weight:800; font-size:0.95rem; margin:0 0 8px;">Conclusión de la evaluación</h4>
          <p style="color:var(--mk-ink-soft); font-size:0.9rem; line-height:1.6; margin:0;">
            Para Makicol, mantener la aplicación web (con PWA como posible mejora) es lo estratégico: accesible
            desde cualquier dispositivo sin instalación, ideal para productores con acceso limitado a datos.
            La app nativa queda como visión si la base de compradores crece y se necesitan notificaciones push
            (umbral de 5.000 usuarios activos mensuales: supuesto sin sustento).
          </p>
        </div>

        <div style="margin-bottom:24px;"><app-comparison-cards/></div>
        <app-feature-matrix/>

        <div style="text-align:center; margin-top:40px;">
          <a routerLink="/propuesta" class="mk-btn" style="text-decoration:none;">← Volver a la propuesta</a>
        </div>
      </div>
    </div>
  `,
})
export class TechnicalComponent {}
