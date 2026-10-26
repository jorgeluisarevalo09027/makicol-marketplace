import { Component } from '@angular/core';

/**
 * §9 Operaciones — momento "A dónde vamos".
 * Pagos, envíos (Servientrega), identidad (Auth0), simulación en backend.
 * Fuente: analisis-plan-de-negocio.md (O1–O12, A1–A8). Todo requiere BR + autorización.
 */
@Component({
  selector: 'app-operations',
  standalone: true,
  template: `
    <section id="operaciones" class="mk-section mk-bg-paper-alt scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow mk-eyebrow--target">A dónde vamos · Operaciones</span>
          <h2 class="mk-title">Cómo funcionará pagar, enviar y entrar al piloto</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            Son propuestas para el piloto, no funciones de hoy. Cada una implica cambios en el backend que se
            aprueban por separado. Lo que ya existe en el demo se marca aparte.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem;" class="ops-grid">
          @for (b of bloques; track b.titulo) {
            <div class="mk-card">
              <div style="font-size:1.6rem; margin-bottom:0.5rem;">{{ b.icon }}</div>
              <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1.05rem; margin:0 0 0.6rem;">{{ b.titulo }}</h3>
              <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0 0 0.8rem;">{{ b.texto }}</p>
              <div style="display:flex; flex-direction:column; gap:0.35rem;">
                @for (p of b.puntos; track p.t) {
                  <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                    <span class="mk-badge" [class.mk-badge--today]="p.hoy" [class.mk-badge--target]="!p.hoy" style="flex-shrink:0;">{{ p.hoy ? 'hoy' : 'propuesta' }}</span>
                    <span style="color:var(--mk-ink-soft); font-size:0.8rem; line-height:1.45;">{{ p.t }}</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <p style="text-align:center; color:var(--mk-ink-faint); font-size:0.82rem; margin-top:2rem;">
          El detalle completo (estados de pedido, contra entrega, casos límite y opciones de identidad)
          está en <strong>Detalles profundos</strong>.
        </p>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 900px) { .ops-grid { grid-template-columns: 1fr !important; } }
  `]
})
export class OperationsComponent {
  bloques = [
    {
      icon: '💳', titulo: 'Pagos',
      texto: 'Cada artesano declara qué medios acepta; en el pago el comprador elige por artesano, no uno para todo el carrito.',
      puntos: [
        { t: 'Cada artesano declara los medios de pago que acepta.', hoy: true },
        { t: 'El comprador elige el medio por artesano (un pedido ya es por artesano).', hoy: true },
        { t: 'Contra entrega por transportadora como medio del modelo B.', hoy: false },
      ],
    },
    {
      icon: '🚚', titulo: 'Envíos',
      texto: 'El piloto usa Servientrega: la plataforma genera la guía con recaudo y sigue el rastreo.',
      puntos: [
        { t: 'Estados de pedido movidos a mano por artesano y comprador.', hoy: true },
        { t: 'Guía con valor a recaudar (contra entrega).', hoy: false },
        { t: 'La venta se cierra cuando se realiza el recaudo.', hoy: false },
      ],
    },
    {
      icon: '🔐', titulo: 'Identidad',
      texto: 'Se migra la autenticación a un proveedor externo antes del piloto, con MFA para roles sensibles.',
      puntos: [
        { t: 'Autenticación propia (JWT + refresh), cuatro roles.', hoy: true },
        { t: 'Migración a Auth0 (por confirmar) antes del piloto.', hoy: false },
        { t: 'MFA obligatorio para soporte y auditor.', hoy: false },
      ],
    },
  ];
}
