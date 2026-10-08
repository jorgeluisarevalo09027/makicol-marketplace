import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Endpoint {
  metodo: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  ruta: string;
  auth: 'Público' | 'buyer' | 'artisan' | 'support' | 'auditor' | 'Autenticado';
  descripcion: string;
  entidades: string;
}

interface Grupo {
  nombre: string;
  icono: string;
  color: string;
  roles: string[];
  endpoints: Endpoint[];
}

@Component({
  selector: 'app-api-contract',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .ep-table { width:100%; border-collapse:collapse; font-size:0.8rem; }
    .ep-table th { padding:9px 12px; text-align:left; font-size:0.68rem; color:#57685c; text-transform:uppercase; letter-spacing:0.04em; background:#F2F6F4; }
    .ep-table td { padding:10px 12px; border-bottom:1px solid #EFE9DD; color:#1F2A22; vertical-align:top; }
    .ep-table code { font-family:monospace; font-size:0.78rem; }
    .method { display:inline-block; min-width:52px; text-align:center; padding:2px 8px; border-radius:6px; font-weight:800; font-size:0.68rem; color:#fff; }
    .method.GET { background:#2C7350; } .method.POST { background:#003893; } .method.PUT, .method.PATCH { background:#B08900; } .method.DELETE { background:#C8102E; }
    .auth { padding:2px 9px; border-radius:10px; font-size:0.68rem; font-weight:700; white-space:nowrap; }
    @media (max-width:800px) { .ep-table { min-width:760px; } }
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
            <a routerLink="/base-de-datos" style="color:#57685c; font-size:0.82rem; text-decoration:none; font-weight:600;">← Diseño de base de datos</a>
            <a routerLink="/propuesta" style="color:#295440; font-size:0.82rem; text-decoration:none; font-weight:700;">Propuesta →</a>
          </div>
        </div>
      </header>

      <section style="padding:48px 20px 32px; text-align:center; background:linear-gradient(180deg,#F2F6F4,#FDFBF3);">
        <div style="max-width:760px; margin:0 auto;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:7px 16px; border-radius:20px; background:#FDF3D6; margin-bottom:18px;">
            <span style="font-size:0.9rem;">🚧</span>
            <span style="color:#856404; font-size:0.82rem; font-weight:800;">Trabajo en progreso — contrato v1, derivado del modelo de datos v6</span>
          </div>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:900; font-size:2.1rem; line-height:1.2; margin:0 0 14px;">
            Contrato de API<br><span style="color:#295440;">/api/makicol/*</span>
          </h1>
          <p style="color:#57685c; font-size:1rem; line-height:1.6; max-width:680px; margin:0 auto;">
            Endpoints que el servicio existente (<strong>feria-artesanal-api</strong>, .NET 8) expondrá bajo el prefijo
            <code style="background:#F2F6F4; padding:2px 6px; border-radius:4px;">/api/makicol</code>. El futuro proyecto Makicol
            consumirá exclusivamente estas rutas; nada de Feria Artesanal se modifica.
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:36px;">

        <!-- Reglas -->
        <section style="background:#fff; border-left:4px solid #003893; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
          <h4 style="color:#1F2A22; font-weight:800; font-size:0.9rem; margin:0 0 10px;">📜 Reglas del contrato</h4>
          <ul style="color:#57685c; font-size:0.85rem; line-height:1.7; margin:0; padding-left:18px;">
            <li><strong>Prefijo obligatorio</strong> <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">/api/makicol/</code> en todas las rutas. Separa Swagger, logs y auth de las rutas de Feria (<code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">/api/artesanos</code>, <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">/api/ediciones</code>…).</li>
            <li><strong>Autenticación propia</strong>: JWT emitido por <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">/api/makicol/auth/login</code> con claim <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">role</code> ∈ buyer | artisan | support | auditor. Issuer/audience distintos a los de Feria; misma librería JwtBearer.</li>
            <li><strong>Fechas</strong>: siempre ISO 8601 con offset (<code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">2026-09-12T18:00:00-05:00</code>), reflejo directo de <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">datetimeoffset</code>. El cliente formatea con <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">TimezoneService</code>.</li>
            <li><strong>Estados</strong>: se devuelven como objeto <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">{{ '{' }} id, name {{ '}' }}</code> desde las tablas semilla <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">Mk*Status</code>. Los cambios de estado son <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">PATCH .../status</code> y quedan en <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">MkActivityLog</code>.</li>
            <li><strong>Paginación</strong> en listados: <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">?page=1&amp;pageSize=20</code>, respuesta <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">{{ '{' }} items, total, page, pageSize {{ '}' }}</code>.</li>
            <li><strong>Mapeo con el prototipo</strong>: cada grupo indica qué archivo mock de <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px;">marketplace-data.ts</code> sustituye, para migrar el frontend por partes.</li>
          </ul>
        </section>

        <!-- Filtro por rol -->
        <section>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
            @for (f of filtros; track f) {
              <button (click)="filtroActivo.set(f)"
                      style="padding:6px 14px; border-radius:20px; font-size:0.78rem; font-weight:700; cursor:pointer; border:1.5px solid;"
                      [style.background]="filtroActivo() === f ? '#295440' : '#fff'"
                      [style.color]="filtroActivo() === f ? '#fff' : '#295440'"
                      [style.border-color]="filtroActivo() === f ? '#295440' : '#C6D7CD'">
                {{ f }}
              </button>
            }
          </div>

          <div style="display:flex; flex-direction:column; gap:22px;">
            @for (g of gruposFiltrados(); track g.nombre) {
              <div style="background:#fff; border-radius:14px; box-shadow:0 2px 16px rgba(41,84,64,0.08); overflow:hidden; border-left:4px solid;" [style.border-left-color]="g.color">
                <div style="padding:14px 18px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; border-bottom:1px solid #EFE9DD;">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:1.3rem;">{{ g.icono }}</span>
                    <h3 style="color:#1F2A22; font-weight:800; font-size:1rem; margin:0; font-family:'Plus Jakarta Sans',sans-serif;">{{ g.nombre }}</h3>
                  </div>
                  <div style="display:flex; gap:4px; flex-wrap:wrap;">
                    @for (r of g.roles; track r) {
                      <span style="font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:10px; background:#F2F6F4;" [style.color]="g.color">{{ r }}</span>
                    }
                  </div>
                </div>
                <div style="overflow-x:auto;">
                  <table class="ep-table">
                    <thead><tr><th>Método</th><th>Ruta</th><th>Acceso</th><th>Descripción</th><th>Entidades</th></tr></thead>
                    <tbody>
                      @for (e of g.endpoints; track e.ruta + e.metodo) {
                        <tr>
                          <td><span class="method" [class]="'method ' + e.metodo">{{ e.metodo }}</span></td>
                          <td><code>/api/makicol{{ e.ruta }}</code></td>
                          <td><span class="auth" [style.background]="authBg(e.auth)" [style.color]="authColor(e.auth)">{{ e.auth }}</span></td>
                          <td style="color:#57685c;">{{ e.descripcion }}</td>
                          <td style="color:#8a6040; font-family:monospace; font-size:0.74rem;">{{ e.entidades }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        </section>

      </div>

      <footer style="padding:48px 20px; text-align:center; border-top:3px solid #DAAF37; background:#fff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
          <a routerLink="/base-de-datos"
             style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none; background:#F2F6F4; border:1.5px solid #C6D7CD; color:#295440;">
            ← Diseño de base de datos
          </a>
          <a routerLink="/propuesta"
             style="padding:12px 24px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none; background:linear-gradient(135deg,#FFCD00,#C8102E); color:#fff;">
            Volver a la propuesta ejecutiva →
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class ApiContractComponent {
  filtroActivo = signal('Todos');
  filtros = ['Todos', 'Comprador', 'Artesano', 'Soporte', 'Auditor'];

  grupos: Grupo[] = [
    { nombre: 'Auth', icono: '🔑', color: '#003893', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'], endpoints: [
      { metodo: 'POST', ruta: '/auth/register', auth: 'Público', descripcion: 'Crea MkUser + perfil según role (buyer | artisan).', entidades: 'MkUser, MkBuyerProfile | MkArtisanProfile' },
      { metodo: 'POST', ruta: '/auth/login', auth: 'Público', descripcion: 'Devuelve access token (30 min) + refresh token (7 d). Rate-limit 5/60s.', entidades: 'MkUser, MkRefreshToken' },
      { metodo: 'POST', ruta: '/auth/refresh', auth: 'Público', descripcion: 'Rota el refresh token y emite un nuevo par.', entidades: 'MkRefreshToken' },
      { metodo: 'GET', ruta: '/auth/me', auth: 'Autenticado', descripcion: 'Usuario actual + perfil + timezone. Sustituye COMPRADOR_ACTUAL / ARTESANO_ACTUAL / AGENTE_ACTUAL / AUDITOR_ACTUAL.', entidades: 'MkUser, Mk*Profile' },
    ]},
    { nombre: 'Catálogo (Products)', icono: '📦', color: '#8a6040', roles: ['Comprador', 'Artesano'], endpoints: [
      { metodo: 'GET', ruta: '/products', auth: 'Público', descripcion: 'Listado paginado; filtros ?category=&region=&q=&artisanId=. Solo is_active=true para público. Sustituye PRODUCTOS.', entidades: 'MkProduct' },
      { metodo: 'GET', ruta: '/products/{id}', auth: 'Público', descripcion: 'Detalle + rating promedio + reseñas recientes.', entidades: 'MkProduct, MkReview' },
      { metodo: 'GET', ruta: '/products/categories', auth: 'Público', descripcion: 'Categorías distintas con conteo. Sustituye CATEGORIAS.', entidades: 'MkProduct' },
      { metodo: 'POST', ruta: '/products', auth: 'artisan', descripcion: 'Publica producto del artesano autenticado.', entidades: 'MkProduct, MkActivityLog' },
      { metodo: 'PUT', ruta: '/products/{id}', auth: 'artisan', descripcion: 'Edita producto propio.', entidades: 'MkProduct, MkActivityLog' },
      { metodo: 'PATCH', ruta: '/products/{id}/active', auth: 'artisan', descripcion: 'Activa/pausa (is_active). Sustituye el toggle de Mis productos.', entidades: 'MkProduct, MkActivityLog' },
    ]},
    { nombre: 'Artesanos (perfil público)', icono: '🧶', color: '#8a6040', roles: ['Comprador', 'Artesano'], endpoints: [
      { metodo: 'GET', ruta: '/artisans', auth: 'Público', descripcion: 'Directorio de artesanos verificados; ?region=. Sustituye ARTESANOS.', entidades: 'MkArtisanProfile, MkUser' },
      { metodo: 'GET', ruta: '/artisans/{id}', auth: 'Público', descripcion: 'Perfil + productos activos.', entidades: 'MkArtisanProfile, MkProduct' },
      { metodo: 'PUT', ruta: '/artisans/me', auth: 'artisan', descripcion: 'Edita perfil propio (bio, materiales, payment_method, timezone).', entidades: 'MkArtisanProfile, MkActivityLog' },
      { metodo: 'GET', ruta: '/artisans/me/dashboard', auth: 'artisan', descripcion: 'KPIs del panel: ventas, pedidos por estado, top productos. Sustituye cálculos del Panel.', entidades: 'MkOrder, MkOrderItem, MkProduct' },
    ]},
    { nombre: 'Favoritos (Wishlist)', icono: '❤️', color: '#C8102E', roles: ['Comprador'], endpoints: [
      { metodo: 'GET', ruta: '/wishlist', auth: 'buyer', descripcion: 'Productos guardados del comprador. Sustituye FavoritosService (memoria).', entidades: 'MkWishlistItem, MkProduct' },
      { metodo: 'PUT', ruta: '/wishlist/{productId}', auth: 'buyer', descripcion: 'Agrega (idempotente).', entidades: 'MkWishlistItem' },
      { metodo: 'DELETE', ruta: '/wishlist/{productId}', auth: 'buyer', descripcion: 'Quita.', entidades: 'MkWishlistItem' },
    ]},
    { nombre: 'Pedidos (Orders)', icono: '🧾', color: '#003893', roles: ['Comprador', 'Artesano'], endpoints: [
      { metodo: 'POST', ruta: '/orders', auth: 'buyer', descripcion: 'Crea pedido desde items [{productId, quantity}]. Estado inicial = Recibido. Guarda origin_timezone.', entidades: 'MkOrder, MkOrderItem, MkOrderStatus, MkActivityLog' },
      { metodo: 'GET', ruta: '/orders', auth: 'buyer', descripcion: 'Mis pedidos del comprador. Sustituye PEDIDOS en Mis pedidos.', entidades: 'MkOrder, MkOrderItem' },
      { metodo: 'GET', ruta: '/orders/{id}', auth: 'Autenticado', descripcion: 'Detalle; visible para su comprador, los artesanos involucrados y support.', entidades: 'MkOrder, MkOrderItem, MkInternationalShipment' },
      { metodo: 'GET', ruta: '/orders/received', auth: 'artisan', descripcion: 'Pedidos que incluyen productos del artesano. Sustituye la tabla del Panel.', entidades: 'MkOrder, MkOrderItem' },
      { metodo: 'PATCH', ruta: '/orders/{id}/status', auth: 'Autenticado', descripcion: 'Cambia estado validando MkOrderStatusTransition.allowed_role. Registra en MkActivityLog.', entidades: 'MkOrder, MkOrderStatusTransition, MkActivityLog' },
      { metodo: 'POST', ruta: '/orders/{id}/review', auth: 'buyer', descripcion: 'Reseña por producto de un pedido Entregado.', entidades: 'MkReview' },
    ]},
    { nombre: 'Envíos internacionales', icono: '🌎', color: '#B08900', roles: ['Artesano', 'Soporte'], endpoints: [
      { metodo: 'POST', ruta: '/orders/{id}/international-shipment', auth: 'artisan', descripcion: 'Crea el seguimiento granular (courier, guía, cert. origen). Solo pedidos internacionales.', entidades: 'MkInternationalShipment' },
      { metodo: 'PATCH', ruta: '/international-shipments/{id}/status', auth: 'Autenticado', descripcion: 'Avanza etapa validando MkInternationalShipmentStatusTransition.', entidades: 'MkInternationalShipment, MkActivityLog' },
      { metodo: 'GET', ruta: '/international-shipments/{id}', auth: 'Autenticado', descripcion: 'Estado actual + historial desde MkActivityLog.', entidades: 'MkInternationalShipment, MkActivityLog' },
    ]},
    { nombre: 'Soporte (Cases)', icono: '🎧', color: '#57685c', roles: ['Comprador', 'Artesano', 'Soporte'], endpoints: [
      { metodo: 'GET', ruta: '/faq', auth: 'Público', descripcion: '?targetRole=buyer|artisan. Sustituye FAQ_COMPRADOR / FAQ_ARTESANO.', entidades: 'MkFaqItem' },
      { metodo: 'POST', ruta: '/support/cases', auth: 'Autenticado', descripcion: 'Abre caso (buyer o artisan), opcional related_order_id. Sustituye Ayuda → nuevo.', entidades: 'MkSupportCase, MkActivityLog' },
      { metodo: 'GET', ruta: '/support/cases/mine', auth: 'Autenticado', descripcion: 'Mis casos. Sustituye Mis casos.', entidades: 'MkSupportCase' },
      { metodo: 'GET', ruta: '/support/cases', auth: 'support', descripcion: 'Bandeja: ?status=&priority=&category=&requesterRole=. Sustituye CASOS en Casos.', entidades: 'MkSupportCase' },
      { metodo: 'GET', ruta: '/support/cases/{id}', auth: 'Autenticado', descripcion: 'Detalle + hilo de mensajes.', entidades: 'MkSupportCase, MkSupportMessage' },
      { metodo: 'POST', ruta: '/support/cases/{id}/messages', auth: 'Autenticado', descripcion: 'Agrega mensaje al hilo (author_role según token).', entidades: 'MkSupportMessage' },
      { metodo: 'PATCH', ruta: '/support/cases/{id}/status', auth: 'support', descripcion: 'En proceso / Resuelto / Cerrado / Reabrir, validando transición.', entidades: 'MkSupportCase, MkSupportCaseStatusTransition, MkActivityLog' },
      { metodo: 'GET', ruta: '/support/dashboard', auth: 'support', descripcion: 'KPIs del panel de soporte (abiertos, tiempo medio, por categoría).', entidades: 'MkSupportCase' },
    ]},
    { nombre: 'Auditoría (Reports)', icono: '📊', color: '#6d3fae', roles: ['Auditor'], endpoints: [
      { metodo: 'GET', ruta: '/reports/summary', auth: 'auditor', descripcion: 'GMV, take rate, pedidos, AOV, tendencia mensual. Sustituye VENTAS_MENSUALES.', entidades: 'MkMonthlyMetric, MkOrder' },
      { metodo: 'GET', ruta: '/reports/sales', auth: 'auditor', descripcion: 'Por categoría, región, producto y artesano; ?from=&to=.', entidades: 'MkOrder, MkOrderItem, MkProduct' },
      { metodo: 'GET', ruta: '/reports/artisans', auth: 'auditor', descripcion: 'Salud de oferta: activos, verificación, ranking.', entidades: 'MkArtisanProfile, MkProduct, MkOrder' },
      { metodo: 'GET', ruta: '/reports/buyers', auth: 'auditor', descripcion: 'Salud de demanda: recurrencia, ratings, geografía.', entidades: 'MkOrder, MkReview, MkBuyerProfile' },
      { metodo: 'GET', ruta: '/reports/support', auth: 'auditor', descripcion: 'Casos vs pedidos, por categoría y mes. Sustituye CASOS_MENSUALES.', entidades: 'MkSupportCase, MkMonthlyMetric' },
      { metodo: 'GET', ruta: '/reports/activity', auth: 'auditor', descripcion: 'Trazabilidad: ?entityType=&entityId=&userId=&from=&to=.', entidades: 'MkActivityLog' },
    ]},
    { nombre: 'Catálogos de estado (seed)', icono: '🏷️', color: '#295440', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'], endpoints: [
      { metodo: 'GET', ruta: '/statuses/orders', auth: 'Público', descripcion: 'Lista + transiciones permitidas por rol.', entidades: 'MkOrderStatus, MkOrderStatusTransition' },
      { metodo: 'GET', ruta: '/statuses/support-cases', auth: 'Público', descripcion: 'Ídem para casos.', entidades: 'MkSupportCaseStatus, MkSupportCaseStatusTransition' },
      { metodo: 'GET', ruta: '/statuses/international-shipments', auth: 'Público', descripcion: 'Ídem para envíos internacionales.', entidades: 'MkInternationalShipmentStatus, …Transition' },
      { metodo: 'GET', ruta: '/statuses/artisan-verification', auth: 'Público', descripcion: 'Ídem para verificación de artesano.', entidades: 'MkArtisanVerificationStatus, …Transition' },
    ]},
  ];

  gruposFiltrados() {
    const f = this.filtroActivo();
    return f === 'Todos' ? this.grupos : this.grupos.filter(g => g.roles.includes(f));
  }

  authBg(a: Endpoint['auth']) {
    return ({ 'Público': '#E3F6E8', 'buyer': '#EAF1FC', 'artisan': '#FBF3E9', 'support': '#F4F5F6', 'auditor': '#F1EAFB', 'Autenticado': '#FDF3D6' } as Record<string, string>)[a];
  }

  authColor(a: Endpoint['auth']) {
    return ({ 'Público': '#1EA03B', 'buyer': '#003893', 'artisan': '#8a6040', 'support': '#57685c', 'auditor': '#6d3fae', 'Autenticado': '#856404' } as Record<string, string>)[a];
  }
}
