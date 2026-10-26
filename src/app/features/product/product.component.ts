import { Component } from '@angular/core';

/**
 * §7 Producto y plataforma — momento "Qué tenemos hoy".
 * Verificado contra el backend (Controllers + Domain). Lo que existe en el demo, no promesas.
 */
@Component({
  selector: 'app-product',
  standalone: true,
  template: `
    <section id="producto" class="mk-section mk-bg-paper-alt scroll-mt-16">
      <div class="mk-section-inner">

        <div style="text-align:center; margin-bottom:3rem;">
          <span class="mk-eyebrow">
            <span>✓</span> Qué tenemos hoy · El demo construido
          </span>
          <h2 class="mk-title">No es una idea: es un producto funcional</h2>
          <p class="mk-subtitle" style="margin:0 auto;">
            Makicol ya existe como demo navegable con backend propio desplegado en Azure: cuatro roles,
            catálogo, pedidos, reseñas, soporte y auditoría. Todo lo de abajo está verificado en el código.
          </p>
        </div>

        <!-- Cuatro roles -->
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:2.5rem;" class="prod-grid">
          @for (r of roles; track r.nombre) {
            <div class="mk-card" style="text-align:left;">
              <div style="font-size:1.7rem; margin-bottom:0.5rem;">{{ r.icon }}</div>
              <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-ink); font-size:1rem; margin:0 0 0.3rem;">{{ r.nombre }}</h3>
              <p style="color:var(--mk-ink-soft); font-size:0.82rem; line-height:1.5; margin:0;">{{ r.desc }}</p>
            </div>
          }
        </div>

        <!-- Qué hace el demo -->
        <div class="mk-card">
          <h3 style="font-family:var(--font-brand); font-weight:800; color:var(--mk-green-deep); font-size:1.1rem; margin:0 0 1rem;">
            Lo que el demo ya hace
          </h3>
          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:0.7rem 1.5rem;" class="prod-grid">
            @for (f of funciones; track f) {
              <div style="display:flex; gap:0.6rem; align-items:flex-start;">
                <span class="mk-badge mk-badge--today" style="flex-shrink:0;">hoy</span>
                <span style="color:var(--mk-ink-soft); font-size:0.88rem; line-height:1.5;">{{ f }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Nota de pagos: lo que NO hace, sin ambigüedad -->
        <div class="mk-card mk-card--accent" style="margin-top:1.5rem; border-left-color:var(--mk-terracotta);">
          <div style="display:flex; gap:0.75rem; align-items:flex-start;">
            <span class="mk-badge mk-badge--target" style="flex-shrink:0;">a dónde vamos</span>
            <p style="color:var(--mk-ink-soft); font-size:0.88rem; line-height:1.6; margin:0;">
              Hoy el pago se coordina fuera de la plataforma (la preferencia de pago es informativa) y el envío
              lo marca el artesano a mano. El cobro en línea, los medios por artesano y la guía con transportadora
              son propuestas para el piloto, no funciones actuales. Se explican en <strong>A dónde vamos</strong>.
            </p>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    @media (max-width: 900px) { .prod-grid { grid-template-columns: repeat(2,1fr) !important; } }
    @media (max-width: 560px) { .prod-grid { grid-template-columns: 1fr !important; } }
  `]
})
export class ProductComponent {
  roles = [
    { icon: '🛍️', nombre: 'Comprador', desc: 'Explora el catálogo sin cuenta, compra, sigue sus pedidos, reseña y guarda favoritos.' },
    { icon: '🧶', nombre: 'Artesano', desc: 'Publica productos con galería, gestiona su perfil e historia y avanza el estado de sus pedidos.' },
    { icon: '🎧', nombre: 'Soporte', desc: 'Atiende casos, verifica artesanos y gestiona el contenido editorial (historias).' },
    { icon: '🕵️', nombre: 'Auditor', desc: 'Consulta métricas mensuales (GMV, pedidos, casos) y la trazabilidad de cada cambio.' },
  ];

  funciones = [
    'Catálogo público con filtros, categorías y búsqueda',
    'Carrito que revalida precio y stock antes de confirmar',
    'Un pedido por artesano, con estados y transiciones por rol',
    'Reseñas de producto (una por comprador y producto)',
    'Lista de deseos (wishlist)',
    'Casos de soporte ligados a pedidos y asignados a agentes',
    'Verificación de artesanos (solo "Verificado" puede publicar)',
    'Auditoría append-only de cada cambio de estado',
    'Historias editoriales con imágenes para dar identidad',
    'Autenticación propia (JWT + refresh) con cuatro roles',
  ];
}
