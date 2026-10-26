import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-backoffice-evaluation',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .be-card { background:var(--mk-surface); border:1px solid var(--mk-sand); border-left:4px solid var(--mk-gold); border-radius:14px; padding:22px; box-shadow:0 2px 14px rgba(35,49,42,0.06); }
  `],
  template: `
    <div style="min-height:100vh; background:var(--mk-paper);">

      <header style="background:var(--mk-surface); border-bottom:1px solid var(--mk-sand); position:sticky; top:0; z-index:40;">
        <div style="max-width:1100px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <a routerLink="/propuesta" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:32px; height:32px; object-fit:contain;">
            <span style="color:var(--mk-green-deep); font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem;">Makicol · Propuesta Ejecutiva</span>
          </a>
          <div style="display:flex; gap:16px;">
            <a routerLink="/propuesta" style="color:var(--mk-ink-soft); font-size:0.82rem; text-decoration:none; font-weight:600;">← Volver a la propuesta</a>
            <a routerLink="/base-de-datos" style="color:var(--mk-green-deep); font-size:0.82rem; text-decoration:none; font-weight:700;">Diseño de base de datos →</a>
          </div>
        </div>
      </header>

      <section style="padding:56px 20px 40px; text-align:center; background:var(--mk-paper-alt);">
        <div style="max-width:760px; margin:0 auto;">
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:900; font-size:2.1rem; line-height:1.2; margin:0 0 14px;">
            Storefront y back-office:<br><span style="color:var(--mk-green-deep);">el demo ya separa por rol</span>
          </h1>
          <p style="color:var(--mk-ink-soft); font-size:1rem; line-height:1.6; max-width:640px; margin:0 auto;">
            Resumen de la evaluación sobre separar los roles internos (soporte y auditor) de los públicos (comprador y artesano).
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:24px;">
        <div class="be-card" style="border-left-color:#003893;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:800; font-size:1.2rem; margin:0 0 10px;">Hoy</h2>
          <ul style="color:var(--mk-ink-soft); font-size:0.88rem; line-height:1.7; margin:0; padding-left:18px;">
            @for (item of hoy; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>

        <div class="be-card">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:800; font-size:1.2rem; margin:0 0 10px;">Opción futura (no decidida)</h2>
          <p style="color:#3d4a41; font-size:0.9rem; line-height:1.65; margin:0 0 10px;">
            Separar en dos aplicaciones frontend, manteniendo una sola base de datos y un solo servicio de API: una pública
            (comprador y artesano) y una interna (soporte y auditor). Se justificaría por audiencia y seguridad, no por
            tamaño del equipo.
          </p>
          <p style="color:var(--mk-ink-soft); font-size:0.85rem; margin:0;">
            Mientras el equipo sea pequeño conviene mantener el monorepo con límites por rol y revisar la separación cuando
            el back-office necesite un ciclo de despliegue propio.
          </p>
        </div>
      </div>

      <footer style="padding:48px 20px; text-align:center; border-top:3px solid var(--mk-gold); background:#fff;">
        <a routerLink="/propuesta"
           style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none;
                  background:var(--mk-paper-alt); border:1.5px solid var(--mk-sand); color:var(--mk-green-deep);">
          ← Volver a la propuesta ejecutiva
        </a>
      </footer>
    </div>
  `,
})
export class BackofficeEvaluationComponent {
  hoy = [
    'Un monorepo Nx con 43 proyectos y límites por capa y por rol aplicados con lint.',
    'Una sola aplicación web con rutas por rol: /comprador, /artesano, /soporte y /auditor.',
    'Carga diferida por rol: el código de soporte y auditor no se descarga en la primera carga pública.',
    'Autenticación propia con JWT; la migración a un proveedor externo con MFA para soporte y auditor se propone antes del piloto.',
    'Una base de datos y un servicio de API compartidos por los cuatro roles.',
  ];
}
