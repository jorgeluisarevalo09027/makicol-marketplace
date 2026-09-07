import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-backoffice-evaluation',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .be-table { width:100%; border-collapse:collapse; font-size:0.85rem; }
    .be-table th { padding:11px 14px; text-align:left; font-size:0.72rem; color:#57685c; text-transform:uppercase; letter-spacing:0.04em; background:#F2F6F4; }
    .be-table td { padding:12px 14px; border-bottom:1px solid #EFE9DD; color:#1F2A22; vertical-align:top; }
    .be-card { background:#fff; border-left:4px solid #FFCD00; border-radius:14px; padding:22px; box-shadow:0 2px 16px rgba(41,84,64,0.08); }
    .be-vs { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    @media (max-width:800px) {
      .be-vs { grid-template-columns:1fr; }
      .be-table { min-width:640px; }
    }
  `],
  template: `
    <div style="min-height:100vh; background:#FDFBF3;">

      <header style="background:#fff; border-bottom:1px solid #EFE9DD; position:sticky; top:0; z-index:40;">
        <div style="max-width:1100px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <a routerLink="/propuesta" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:32px; height:32px; object-fit:contain;">
            <span style="color:#295440; font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem;">Makicol · Propuesta Ejecutiva</span>
          </a>
          <div style="display:flex; gap:16px;">
            <a routerLink="/propuesta" style="color:#57685c; font-size:0.82rem; text-decoration:none; font-weight:600;">← Volver a la propuesta</a>
            <a routerLink="/base-de-datos" style="color:#295440; font-size:0.82rem; text-decoration:none; font-weight:700;">Diseño de base de datos →</a>
          </div>
        </div>
      </header>

      <section style="padding:56px 20px 40px; text-align:center; background:linear-gradient(180deg,#F2F6F4,#FDFBF3);">
        <div style="max-width:760px; margin:0 auto;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:7px 16px; border-radius:20px; background:#E3EBE7; margin-bottom:20px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#295440;"></span>
            <span style="color:#295440; font-size:0.82rem; font-weight:700;">Evaluación de arquitectura — Fase 1</span>
          </div>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:900; font-size:2.1rem; line-height:1.2; margin:0 0 14px;">
            ¿Separar Storefront y Back-office<br><span style="color:#295440;">en aplicaciones independientes?</span>
          </h1>
          <p style="color:#57685c; font-size:1rem; line-height:1.6; max-width:640px; margin:0 auto;">
            Evaluación de si conviene separar los roles Soporte y Auditor (internos/operativos) de
            Comprador y Artesano (públicos), manteniendo una sola base de datos y un solo servicio de API.
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:48px;">

        <!-- Estado actual -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#003893; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">📍 Estado actual</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Un monolito modular, con buenos límites
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              Hoy toda la aplicación vive en un solo proyecto Angular, con separación lógica por rutas —
              esta es la base correcta para decidir, más adelante, si vale la pena separar de verdad.
            </p>
          </div>
          <div class="be-card" style="border-left-color:#003893;">
            <div style="display:flex; flex-wrap:wrap; gap:16px;">
              <div style="flex:1; min-width:180px;">
                <p style="color:#1F2A22; font-weight:800; font-size:0.85rem; margin:0 0 4px;">🗄️ 1 base de datos</p>
                <p style="color:#57685c; font-size:0.8rem; margin:0;">Compartida entre los 4 roles</p>
              </div>
              <div style="flex:1; min-width:180px;">
                <p style="color:#1F2A22; font-weight:800; font-size:0.85rem; margin:0 0 4px;">⚙️ 1 servicio de API</p>
                <p style="color:#57685c; font-size:0.8rem; margin:0;">Sin planes de dividirlo por ahora</p>
              </div>
              <div style="flex:1; min-width:180px;">
                <p style="color:#1F2A22; font-weight:800; font-size:0.85rem; margin:0 0 4px;">🧭 4 rutas por rol</p>
                <p style="color:#57685c; font-size:0.8rem; margin:0;">/comprador · /artesano · /soporte · /auditor</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Checklist -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#6d3fae; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">✅ Checklist de decisión</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Señales que sí justifican separar (y cuáles no)
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              La señal correcta para separar frontends no es "cuántos módulos tengo" — es la audiencia, la seguridad y el ciclo de cambios.
            </p>
          </div>

          <div style="overflow-x:auto;">
            <table class="be-table">
              <thead>
                <tr><th>Criterio</th><th style="text-align:center;">¿Aplica hoy?</th><th>Explicación</th></tr>
              </thead>
              <tbody>
                @for (c of criterios; track c.criterio) {
                  <tr>
                    <td style="font-weight:700;">{{ c.criterio }}</td>
                    <td style="text-align:center;">
                      <span style="padding:3px 12px; border-radius:20px; font-size:0.74rem; font-weight:800;" [style.background]="c.bg" [style.color]="c.color">
                        {{ c.respuesta }}
                      </span>
                    </td>
                    <td style="color:#57685c; font-size:0.82rem;">{{ c.explicacion }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>

        <!-- Comparación -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#1EA03B; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">⚖️ Comparación</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Monolito modular vs. Storefront + Back-office
            </h2>
          </div>

          <div class="be-vs">
            <div class="be-card" style="border-left-color:#57685c;">
              <h4 style="color:#1F2A22; font-weight:800; font-size:0.95rem; margin:0 0 10px;">Hoy: 1 sola app Angular</h4>
              <ul style="color:#57685c; font-size:0.84rem; line-height:1.7; margin:0; padding-left:18px;">
                <li>Un solo build, un solo despliegue</li>
                <li>Código de Soporte/Auditor viaja en el mismo bundle que el público</li>
                <li>Más simple de mantener con un equipo pequeño</li>
                <li>Ya tiene límites claros por rutas — fácil de migrar después</li>
              </ul>
            </div>
            <div class="be-card" style="border-left-color:#295440;">
              <h4 style="color:#1F2A22; font-weight:800; font-size:0.95rem; margin:0 0 10px;">Propuesto: 2 apps, 1 backend</h4>
              <ul style="color:#57685c; font-size:0.84rem; line-height:1.7; margin:0; padding-left:18px;">
                <li><strong>makicol-storefront</strong>: Comprador + Artesano (público)</li>
                <li><strong>makicol-backoffice</strong>: Soporte + Auditor (interno)</li>
                <li>Misma base de datos y mismo API — solo cambia el frontend</li>
                <li>Reduce superficie de ataque: el código interno no se descarga en el navegador de un comprador</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Recomendación -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#B08900; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">💡 Recomendación</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Separar el frontend, no la base de datos ni el API
            </h2>
          </div>
          <div class="be-card" style="border-left-color:#FFCD00;">
            <p style="color:#3d4a41; font-size:0.9rem; line-height:1.65; margin:0 0 12px;">
              Recomiendo migrar a mediano plazo hacia <strong>2 aplicaciones frontend</strong> — Storefront (Comprador + Artesano) y
              Back-office (Soporte + Auditor) — manteniendo <strong>1 sola base de datos y 1 solo servicio de API</strong>, tal como
              ya lo planteas. No es una migración a microservicios ni a microfrontends por equipo (eso solo se justifica con 4+ equipos
              trabajando en paralelo) — es una separación por <strong>audiencia y seguridad</strong>, mucho más simple y de bajo riesgo
              porque ya contamos con los límites de rutas/roles bien definidos en el prototipo actual.
            </p>
            <p style="color:#57685c; font-size:0.85rem; margin:0;">
              Próximo paso sugerido: mantener el monolito modular mientras el equipo es pequeño, y ejecutar la separación cuando
              Soporte/Auditor necesiten autenticación propia o un ciclo de despliegue distinto al de Comprador/Artesano.
            </p>
          </div>
        </section>

      </div>

      <footer style="padding:48px 20px; text-align:center; border-top:3px solid #DAAF37; background:#fff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
          <a routerLink="/propuesta"
             style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none;
                    background:#F2F6F4; border:1.5px solid #C6D7CD; color:#295440;">
            ← Volver a la propuesta ejecutiva
          </a>
          <a routerLink="/base-de-datos"
             style="padding:12px 24px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none;
                    background:linear-gradient(135deg,#FFCD00,#C8102E); color:#fff;">
            Ver diseño de base de datos →
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class BackofficeEvaluationComponent {
  criterios = [
    { criterio: '¿Auth/roles distintos para Soporte-Auditor vs. Comprador-Artesano?', respuesta: 'Sí (futuro)', bg: '#E3F6E8', color: '#1EA03B', explicacion: 'Aún no implementado, pero es la señal más fuerte a favor de separar cuando exista autenticación real.' },
    { criterio: '¿El código interno debe excluirse del bundle público?', respuesta: 'Sí (futuro)', bg: '#E3F6E8', color: '#1EA03B', explicacion: 'Hoy no es crítico porque no hay datos sensibles reales, pero en producción sí importa por seguridad y tamaño de descarga.' },
    { criterio: '¿Equipos/ciclos de despliegue distintos por rol?', respuesta: 'No, hoy', bg: '#FDF3D6', color: '#B08900', explicacion: 'Un solo equipo trabaja en todo — no hay presión de coordinación que justifique separar todavía.' },
    { criterio: '¿Cambia la base de datos o el API si separamos el frontend?', respuesta: 'No', bg: '#E3F6E8', color: '#1EA03B', explicacion: 'La separación es solo de la capa de presentación — el modelo de datos permanece único y compartido.' },
  ];
}
