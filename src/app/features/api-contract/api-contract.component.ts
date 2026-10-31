import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-api-contract',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="min-height:100vh; background:var(--mk-paper);">

      <header style="background:#fff; border-bottom:1px solid var(--mk-sand); position:sticky; top:0; z-index:40;">
        <div style="max-width:1100px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <a routerLink="/propuesta" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:32px; height:32px; object-fit:contain;">
            <span style="color:var(--mk-green-deep); font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem;">Makicol · Propuesta Ejecutiva</span>
          </a>
          <div style="display:flex; gap:16px;">
            <a routerLink="/base-de-datos" style="color:var(--mk-ink-soft); font-size:0.82rem; text-decoration:none; font-weight:600;">← Diseño de base de datos</a>
            <a routerLink="/propuesta" style="color:var(--mk-green-deep); font-size:0.82rem; text-decoration:none; font-weight:700;">Propuesta →</a>
          </div>
        </div>
      </header>

      <section style="padding:48px 20px 32px; text-align:center; background:linear-gradient(180deg,var(--mk-paper-alt),var(--mk-paper));">
        <div style="max-width:760px; margin:0 auto;">
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:900; font-size:2.1rem; line-height:1.2; margin:0 0 14px;">
            Contrato de API<br><span style="color:var(--mk-green-deep);">del demo</span>
          </h1>
          <p style="color:var(--mk-ink-soft); font-size:1rem; line-height:1.6; max-width:680px; margin:0 auto;">
            El contrato vigente es el que publica el servicio del demo en su Swagger. Esta página ya no lo duplica:
            conserva solo las reglas de diseño que el servicio cumple.
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:28px;">

        <section style="background:#fff; border-left:4px solid #003893; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
          <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 10px;">Contrato vigente</h4>
          <p style="color:var(--mk-ink-soft); font-size:0.88rem; line-height:1.7; margin:0;">
            Las rutas del demo cuelgan de <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px;">/api/...</code>
            (sin prefijo <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px;">makicol</code>) y se documentan en
            <a [href]="swaggerUrl" target="_blank" rel="noopener" style="color:var(--mk-green-deep); font-weight:700;">el Swagger del servicio</a>.
          </p>
        </section>

        <section style="background:#fff; border-left:4px solid var(--mk-gold); border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
          <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 10px;">Reglas de diseño</h4>
          <ul style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.7; margin:0; padding-left:18px;">
            @for (regla of reglas; track regla) {
              <li>{{ regla }}</li>
            }
          </ul>
        </section>

        <section style="background:#fff; border-left:4px solid #6d3fae; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
          <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 10px;">Autenticación hoy y prevista</h4>
          <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.7; margin:0;">
            Hoy el servicio emite su propio JWT (30 minutos) y un token de renovación que se rota en cada uso. Para el piloto
            se propone migrar a un proveedor externo (Auth0, por confirmar) con MFA obligatorio para soporte y auditor; la API
            validaría entonces el token del proveedor. Es una propuesta, no un cambio hecho.
          </p>
        </section>

      </div>

      <footer style="padding:48px 20px; text-align:center; border-top:3px solid var(--mk-gold); background:#fff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
          <a routerLink="/base-de-datos"
             style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none; background:var(--mk-paper-alt); border:1.5px solid var(--mk-sand); color:var(--mk-green-deep);">
            ← Diseño de base de datos
          </a>
          <a routerLink="/propuesta"
             style="padding:12px 24px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none; background:var(--mk-green); color:#fff;">
            Volver a la propuesta ejecutiva →
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class ApiContractComponent {
  swaggerUrl = 'https://makicol-api-dev-gjewcybdh0abhsef.centralus-01.azurewebsites.net/swagger/index.html';

  reglas = [
    'Fechas en ISO 8601 con offset.',
    'Estados devueltos como objeto con id y nombre, desde tablas de catálogo.',
    'Listados paginados.',
    'Roles: buyer, artisan, support y auditor.',
    'Propuesta (feature 007, no desplegada): endpoints publicos con degradacion en /api/discovery — vista personalizada con token de comprador, vista por defecto sin token, nunca 401.',
  ];
}
