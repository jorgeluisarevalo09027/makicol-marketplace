import { Component, HostListener, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Entidad {
  nombre: string;
  icono: string;
  color: string;
  bg: string;
  roles: string[];
  campos: string[];
  descripcion: string;
}

@Component({
  selector: 'app-database-design',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  styles: [`
    .db-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    @media (max-width:900px) { .db-grid { grid-template-columns:repeat(2,1fr); } }
    @media (max-width:600px) { .db-grid { grid-template-columns:1fr; } }
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
            <a routerLink="/evaluacion-backoffice" style="color:#57685c; font-size:0.82rem; text-decoration:none; font-weight:600;">← Evaluación de arquitectura</a>
            <a routerLink="/propuesta" style="color:#295440; font-size:0.82rem; text-decoration:none; font-weight:700;">Propuesta →</a>
          </div>
        </div>
      </header>

      <section style="padding:48px 20px 32px; text-align:center; background:linear-gradient(180deg,#F2F6F4,#FDFBF3);">
        <div style="max-width:760px; margin:0 auto;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:7px 16px; border-radius:20px; background:#FDF3D6; margin-bottom:18px;">
            <span style="font-size:0.9rem;">🚧</span>
            <span style="color:#856404; font-size:0.82rem; font-weight:800;">Trabajo en progreso — se corrige y actualiza en cada iteración</span>
          </div>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:900; font-size:2.1rem; line-height:1.2; margin:0 0 14px;">
            Diseño de base de datos<br><span style="color:#295440;">para los 4 roles de Makicol</span>
          </h1>
          <p style="color:#57685c; font-size:1rem; line-height:1.6; max-width:640px; margin:0 auto;">
            Modelo entidad-relación que cubre lo que necesita Comprador, Artesano, Soporte y Auditor —
            base para construir la persistencia real cuando el prototipo pase a producción.
          </p>
          <p style="color:#57685c; font-size:0.85rem; line-height:1.5; max-width:640px; margin:14px auto 0;">
            <strong>Convención:</strong> los nombres de entidades, tablas y campos están en inglés para que el esquema sea directamente usable por el equipo de desarrollo y por herramientas de ORM.
            Las notas, descripciones y explicaciones se mantienen en español para la presentación.
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:44px;">

        <!-- Changelog / enfoque -->
        <section>
          <div style="background:#fff; border-left:4px solid #003893; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:#1F2A22; font-weight:800; font-size:0.9rem; margin:0 0 8px;">🔧 Enfoque híbrido de esta vista</h4>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0;">
              El diagrama se mantiene como fuente formal en <strong>PlantUML</strong> (<code style="background:#F2F6F4; padding:2px 6px; border-radius:4px; font-size:0.8rem;">docs/database/er-diagram.puml</code>),
              versionable y fácil de comparar entre iteraciones. Esta página muestra el render más reciente y un desglose interactivo
              pensado para revisar y corregir en vivo durante la presentación, sin depender de regenerar imágenes en cada ajuste menor.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #C8102E; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:#1F2A22; font-weight:800; font-size:0.9rem; margin:0 0 8px;">🕵️ v2: auditoría / trazabilidad</h4>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Se agregaron campos de auditoría (<code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">created_at</code>,
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">updated_at</code>,
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">updated_by</code>) a las entidades que cambian de estado.
            </p>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0;">
              Eso no basta para un historial completo, por eso se agregó también <strong>ActivityLog</strong>: un log
              transversal, de solo escritura (append-only), que registra <strong>cada</strong> creación/modificación/eliminación.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #003893; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:#1F2A22; font-weight:800; font-size:0.9rem; margin:0 0 8px;">🔄 v3: máquina de estados con tablas semilla</h4>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Los campos <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">status</code> de tipo enum
              en <strong>Order</strong>, <strong>SupportCase</strong> y <strong>ArtisanProfile</strong> (verificación) se reemplazaron por una
              <strong>tabla de estados sembrada</strong> más una <strong>tabla de transiciones válidas</strong> por entidad.
              Cada cambio de estado se registra en <strong>ActivityLog</strong>, sin necesidad de una tabla de historial aparte.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #1EA03B; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:#1F2A22; font-weight:800; font-size:0.9rem; margin:0 0 8px;">🌍 v4: tiempos multi-región</h4>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Makicol se desplegará en <strong>Azure</strong> con usuarios de EE. UU., Europa y otras regiones. Para evitar errores de
              fechas/horas en compras, soporte y auditoría, todos los instantes se guardan como <strong>datetimeoffset</strong> en
              Azure SQL: se mantiene el mismo punto en el tiempo (UTC) y, a la vez, el offset original del usuario.
            </p>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0;">
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">BuyerProfile</code> y
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">ArtisanProfile</code> guardan
              <strong>timezone</strong> (IANA) para que el frontend Angular pueda mostrar la hora local del usuario.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #B08900; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
            <h4 style="color:#1F2A22; font-weight:800; font-size:0.9rem; margin:0 0 8px;">🏷️ v5: nombres de esquema en inglés</h4>
            <p style="color:#57685c; font-size:0.85rem; line-height:1.6; margin:0;">
              Todas las entidades, tablas y campos del modelo se renombraron a inglés siguiendo convención de desarrollo
              (<code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">User</code>,
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">Order</code>,
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">BuyerProfile</code>,
              <code style="background:#F2F6F4; padding:1px 5px; border-radius:4px; font-size:0.78rem;">created_at</code>, etc.).
              Las descripciones, notas y la interfaz de esta página se mantienen en español para el contexto de la propuesta.
            </p>
          </div>
        </section>

        <!-- Diagrama -->
        <section>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:16px;">
            <span style="color:#295440; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">📐 Diagrama entidad-relación (v5)</span>
            <button (click)="abrirModal()"
                    style="display:inline-flex; align-items:center; gap:6px; background:#295440; color:#fff; border:none; border-radius:8px; padding:9px 16px; font-size:0.8rem; font-weight:700; cursor:pointer;">
              <span class="material-symbols-outlined" style="font-size:1.1rem;">fullscreen</span>
              Ampliar diagrama
            </button>
          </div>
          <div style="background:#fff; border-radius:14px; padding:16px; box-shadow:0 2px 16px rgba(41,84,64,0.08); overflow-x:auto; text-align:center;">
            <img src="/assets/makicol-er-diagram-v5.svg" alt="Diagrama entidad-relación Makicol v5, con nombres en inglés, auditoría, estados y tiempos multi-región" style="max-width:100%; height:auto;">
          </div>
        </section>

        <!-- Desglose por entidad -->
        <section>
          <div style="margin-bottom:16px;">
            <span style="color:#6d3fae; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">🧩 Entidades por rol</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.3rem; margin:6px 0 4px;">
              Haz clic en cada entidad para ver sus campos
            </h2>
            <p style="color:#57685c; font-size:0.8rem; margin:0;">
              Los nombres y campos están en inglés; las descripciones en español explican qué representa cada tabla en el negocio.
            </p>
          </div>

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

          <div class="db-grid">
            @for (e of entidadesFiltradas(); track e.nombre) {
              <button (click)="seleccionada.set(seleccionada() === e.nombre ? null : e.nombre)"
                      style="text-align:left; cursor:pointer; border-radius:12px; padding:16px; border:1.5px solid;"
                      [style.background]="e.bg"
                      [style.border-color]="seleccionada() === e.nombre ? e.color : '#EFE9DD'">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span style="font-size:1.3rem;">{{ e.icono }}</span>
                  <span style="color:#1F2A22; font-weight:800; font-size:0.88rem;">{{ e.nombre }}</span>
                </div>
                <p style="color:#57685c; font-size:0.76rem; margin:0 0 8px; line-height:1.4;">{{ e.descripcion }}</p>
                <div style="display:flex; gap:4px; flex-wrap:wrap;">
                  @for (r of e.roles; track r) {
                    <span style="font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:10px; background:rgba(255,255,255,0.7);" [style.color]="e.color">{{ r }}</span>
                  }
                </div>
                @if (seleccionada() === e.nombre) {
                  <div style="margin-top:10px; padding-top:10px; border-top:1px solid rgba(0,0,0,0.08);">
                    @for (campo of e.campos; track campo) {
                      <p style="color:#3d4a41; font-size:0.75rem; margin:0 0 4px; font-family:monospace;">· {{ campo }}</p>
                    }
                  </div>
                }
              </button>
            }
          </div>
        </section>

      </div>

      <footer style="padding:48px 20px; text-align:center; border-top:3px solid #DAAF37; background:#fff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
          <a routerLink="/evaluacion-backoffice"
             style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none;
                    background:#F2F6F4; border:1.5px solid #C6D7CD; color:#295440;">
            ← Evaluación de arquitectura
          </a>
          <a routerLink="/propuesta"
             style="padding:12px 24px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none;
                    background:linear-gradient(135deg,#FFCD00,#C8102E); color:#fff;">
            Volver a la propuesta ejecutiva →
          </a>
        </div>
      </footer>
    </div>

    <!-- Modal pantalla completa del diagrama -->
    @if (modalAbierto()) {
      <div (click)="cerrarModal($event)"
           style="position:fixed; inset:0; z-index:100; background:rgba(31,42,34,0.92); display:flex; flex-direction:column;">

        <!-- Barra de controles -->
        <div (click)="$event.stopPropagation()"
             style="position:fixed; top:14px; right:14px; left:14px; z-index:110; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div style="color:#fff; font-size:0.82rem; font-weight:700; background:rgba(0,0,0,0.35); padding:8px 14px; border-radius:8px; backdrop-filter:blur(6px);">
            Usa la rueda del ratón para hacer zoom · Arrastra para desplazarte · Doble clic para resetear
          </div>
          <div style="display:flex; gap:8px;">
            <button (click)="zoomOut()" style="width:38px; height:38px; border:none; border-radius:50%; background:#fff; cursor:pointer; font-size:1.1rem; display:flex; align-items:center; justify-content:center;">−</button>
            <button (click)="zoomReset()" style="height:38px; border:none; border-radius:20px; background:#fff; cursor:pointer; padding:0 16px; font-size:0.78rem; font-weight:800;">{{ zoom() * 100 | number:'1.0-0' }}%</button>
            <button (click)="zoomIn()" style="width:38px; height:38px; border:none; border-radius:50%; background:#fff; cursor:pointer; font-size:1.1rem; display:flex; align-items:center; justify-content:center;">+</button>
            <button (click)="modalAbierto.set(false)" style="width:38px; height:38px; border:none; border-radius:50%; background:#C8102E; color:#fff; cursor:pointer; font-size:1.1rem; display:flex; align-items:center; justify-content:center;">✕</button>
          </div>
        </div>

        <!-- Área de pan/zoom -->
        <div #modalArea
             (wheel)="onWheel($event)"
             (mousedown)="empezarArrastre($event)"
             (window:mousemove)="arrastrar($event)"
             (window:mouseup)="terminarArrastre()"
             (touchstart)="empezarArrastreTouch($event)"
             (window:touchmove)="arrastrarTouch($event)"
             (window:touchend)="terminarArrastre()"
             style="flex:1; overflow:hidden; display:flex; align-items:center; justify-content:center; cursor:grab;"
             [style.cursor]="arrastrando() ? 'grabbing' : 'grab'">
          <img src="/assets/makicol-er-diagram-v5.svg"
               alt="Diagrama entidad-relación Makicol v5 ampliado"
               (dblclick)="zoomReset()"
               style="max-width:none; user-select:none; -webkit-user-drag:none;"
               [style.transform]="'translate(' + panX() + 'px, ' + panY() + 'px) scale(' + zoom() + ')'"
               [style.transform-origin]="'center center'">
        </div>
      </div>
    }
  `,
})
export class DatabaseDesignComponent {
  filtroActivo = signal('Todos');
  seleccionada = signal<string | null>(null);

  modalAbierto = signal(false);
  zoom = signal(1);
  panX = signal(0);
  panY = signal(0);
  arrastrando = signal(false);
  private huboArrastre = false;
  ultimoX = 0;
  ultimoY = 0;

  filtros = ['Todos', 'Comprador', 'Artesano', 'Soporte', 'Auditor'];

  @HostListener('document:keydown.escape')
  cerrarConEscape() {
    this.modalAbierto.set(false);
    this.resetPanZoom();
  }

  abrirModal() {
    this.modalAbierto.set(true);
    this.resetPanZoom();
  }

  cerrarModal(event: MouseEvent) {
    if (this.huboArrastre) {
      this.huboArrastre = false;
      return;
    }
    this.modalAbierto.set(false);
    this.resetPanZoom();
  }

  zoomIn() {
    this.zoom.update(z => Math.min(z + 0.25, 4));
  }

  zoomOut() {
    this.zoom.update(z => Math.max(z - 0.25, 0.5));
  }

  zoomReset() {
    this.resetPanZoom();
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.15 : 0.15;
    this.zoom.update(z => Math.min(Math.max(z + delta, 0.5), 4));
  }

  empezarArrastre(event: MouseEvent) {
    event.preventDefault();
    this.huboArrastre = false;
    this.arrastrando.set(true);
    this.ultimoX = event.clientX;
    this.ultimoY = event.clientY;
  }

  empezarArrastreTouch(event: TouchEvent) {
    this.huboArrastre = false;
    this.arrastrando.set(true);
    this.ultimoX = event.touches[0].clientX;
    this.ultimoY = event.touches[0].clientY;
  }

  arrastrar(event: MouseEvent) {
    if (!this.arrastrando()) return;
    const dx = event.clientX - this.ultimoX;
    const dy = event.clientY - this.ultimoY;
    if (Math.abs(dx) > 0 || Math.abs(dy) > 0) this.huboArrastre = true;
    this.panX.update(x => x + dx);
    this.panY.update(y => y + dy);
    this.ultimoX = event.clientX;
    this.ultimoY = event.clientY;
  }

  arrastrarTouch(event: TouchEvent) {
    if (!this.arrastrando()) return;
    const dx = event.touches[0].clientX - this.ultimoX;
    const dy = event.touches[0].clientY - this.ultimoY;
    if (Math.abs(dx) > 0 || Math.abs(dy) > 0) this.huboArrastre = true;
    this.panX.update(x => x + dx);
    this.panY.update(y => y + dy);
    this.ultimoX = event.touches[0].clientX;
    this.ultimoY = event.touches[0].clientY;
  }

  terminarArrastre() {
    this.arrastrando.set(false);
  }

  private resetPanZoom() {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
    this.huboArrastre = false;
  }

  entidades: Entidad[] = [
    { nombre: 'User', icono: '🪪', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'],
      campos: ['id : UUID (PK)', 'name : text', 'email : text (unique)', 'role : enum', 'language : text (es, en, de...)', 'registration_date : date', 'created_at : datetimeoffset', 'updated_at / updated_by : audit'],
      descripcion: 'Cuenta base compartida por los 4 roles; el rol determina qué perfil extendido tiene.' },
    { nombre: 'BuyerProfile', icono: '🛍️', color: '#003893', bg: '#EAF1FC', roles: ['Comprador'],
      campos: ['user_id : UUID (PK, FK)', 'city : text', 'shipping_address : text', 'timezone : text (IANA)'],
      descripcion: 'Datos adicionales de envío del comprador e idioma/zona horaria preferidos (America/New_York, Europe/Madrid, etc.).' },
    { nombre: 'ArtisanProfile', icono: '🧶', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano'],
      campos: ['user_id : UUID (PK, FK)', 'region : text', 'craft_type : text', 'bio : text', 'payment_method : enum', 'timezone : text (IANA)', 'verification_status_id : FK', 'created_at : datetimeoffset', 'updated_at / updated_by : audit'],
      descripcion: 'Perfil de vendedor: oficio, historia, método de cobro, zona horaria y estado de verificación de cuenta.' },
    { nombre: 'Product', icono: '📦', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano', 'Comprador', 'Auditor'],
      campos: ['id : UUID (PK)', 'artisan_id : FK', 'name : text', 'category : text', 'price : numeric', 'sold_count : int', 'is_active : boolean (default true)', 'created_at : datetimeoffset', 'created_by : FK', 'updated_at : datetimeoffset', 'updated_by : FK'],
      descripcion: 'Catálogo publicado por los artesanos. "is_active" es un booleano simple (no tabla de estados) — ver nota en el diagrama sobre por qué se excluye a propósito del patrón EstadoX.' },
    { nombre: 'Order', icono: '🧾', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Auditor'],
      campos: ['id : UUID (PK)', 'buyer_id : FK', 'placed_at : datetimeoffset', 'total : numeric', 'status_id : FK -> OrderStatus', 'origin_timezone : text (IANA, copia del perfil)', 'created_at : datetimeoffset', 'updated_at / updated_by : audit'],
      descripcion: 'Compra realizada por un comprador; base del GMV que consume el Auditor. El timestamp y el offset se guardan en datetimeoffset para soportar multi-región.' },
    { nombre: 'OrderStatus', icono: '🏷️', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Auditor'],
      campos: ['id : int (PK)', 'name : text', 'display_order : int', 'is_terminal : boolean'],
      descripcion: 'Tabla semilla: Recibido, En preparación, Enviado, Entregado.' },
    { nombre: 'OrderStatusTransition', icono: '🔀', color: '#003893', bg: '#EAF1FC', roles: ['Auditor'],
      campos: ['from_status_id : FK (PK)', 'to_status_id : FK (PK)', 'allowed_role : enum(buyer, artisan, system)'],
      descripcion: 'Saltos válidos entre estados de Pedido. Dato de referencia por ahora, sin trigger que lo obligue todavía.' },
    { nombre: 'OrderItem', icono: '📋', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano'],
      campos: ['id : UUID (PK)', 'order_id : FK', 'product_id : FK', 'quantity : int', 'unit_price : numeric'],
      descripcion: 'Línea de producto dentro de un pedido — un pedido puede incluir productos de varios artesanos.' },
    { nombre: 'Review', icono: '⭐', color: '#B08900', bg: '#FDF6E3', roles: ['Comprador', 'Artesano', 'Auditor'],
      campos: ['id : UUID (PK)', 'author_id : FK', 'product_id : FK', 'rating : int', 'comment : text', 'posted_on : date'],
      descripcion: 'Calificación y comentario de un comprador sobre un producto recibido. Solo fecha, sin hora.' },
    { nombre: 'WishlistItem', icono: '❤️', color: '#C8102E', bg: '#FBE9EC', roles: ['Comprador'],
      campos: ['buyer_id : FK (PK)', 'product_id : FK (PK)', 'added_on : date'],
      descripcion: 'Relación muchos-a-muchos entre comprador y producto — la lista de deseos. Solo fecha, sin hora.' },
    { nombre: 'SupportCase', icono: '🎧', color: '#57685c', bg: '#F4F5F6', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'],
      campos: ['id : UUID (PK)', 'requester_id : FK', 'requester_role : enum', 'category : text', 'status_id : FK -> SupportCaseStatus', 'priority : enum', 'created_at : datetimeoffset', 'related_order_id : FK (nullable)', 'updated_at / updated_by : audit'],
      descripcion: 'Caso de soporte abierto por comprador o artesano; el auditor lo cruza contra ventas. Timestamp en datetimeoffset para seguimiento multi-región.' },
    { nombre: 'SupportCaseStatus', icono: '🏷️', color: '#57685c', bg: '#F4F5F6', roles: ['Soporte', 'Auditor'],
      campos: ['id : int (PK)', 'name : text', 'display_order : int', 'is_terminal : boolean'],
      descripcion: 'Tabla semilla: Abierto, En proceso, Resuelto, Cerrado.' },
    { nombre: 'SupportCaseStatusTransition', icono: '🔀', color: '#57685c', bg: '#F4F5F6', roles: ['Soporte', 'Auditor'],
      campos: ['from_status_id : FK (PK)', 'to_status_id : FK (PK)', 'allowed_role : enum(support, system)'],
      descripcion: 'Saltos válidos entre estados de Caso, incluye reapertura (Cerrado -> Abierto). Dato de referencia por ahora.' },
    { nombre: 'SupportMessage', icono: '💬', color: '#57685c', bg: '#F4F5F6', roles: ['Soporte'],
      campos: ['id : UUID (PK)', 'case_id : FK', 'author_id : FK', 'author_role : enum', 'body : text', 'sent_at : datetimeoffset'],
      descripcion: 'Hilo de conversación dentro de un caso. Timestamp en datetimeoffset para mantener trazabilidad exacta.' },
    { nombre: 'FaqItem', icono: '❓', color: '#57685c', bg: '#F4F5F6', roles: ['Comprador', 'Artesano', 'Soporte'],
      campos: ['id : UUID (PK)', 'question : text', 'answer : text', 'category : text', 'target_role : enum'],
      descripcion: 'Preguntas frecuentes mostradas en el centro de ayuda de cada rol.' },
    { nombre: 'ArtisanVerificationStatus', icono: '🏷️', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano', 'Soporte'],
      campos: ['id : int (PK)', 'name : text', 'display_order : int', 'is_terminal : boolean'],
      descripcion: 'Tabla semilla: Pendiente, Verificado, Rechazado. Hoy la verificación es automática (24h post-registro); deja espacio para revisión manual futura.' },
    { nombre: 'ArtisanVerificationStatusTransition', icono: '🔀', color: '#8a6040', bg: '#FBF3E9', roles: ['Soporte'],
      campos: ['from_status_id : FK (PK)', 'to_status_id : FK (PK)', 'allowed_role : enum(system, support)'],
      descripcion: 'Saltos válidos entre estados de verificación del artesano. Dato de referencia por ahora.' },
    { nombre: 'InternationalShipment', icono: '🌎', color: '#B08900', bg: '#FDF6E3', roles: ['Artesano', 'Auditor'],
      campos: ['id : UUID (PK)', 'order_id : FK (unique)', 'status_id : FK -> InternationalShipmentStatus', 'courier : text', 'tracking_number : text', 'certificate_of_origin_ref : text', 'created_at : datetimeoffset', 'updated_at : datetimeoffset', 'updated_by : FK'],
      descripcion: 'Nombre explícito: seguimiento granular específico del piloto internacional. Los pedidos nacionales no generan esta entidad. 1 Pedido internacional <-> 1 EnvioInternacional.' },
    { nombre: 'InternationalShipmentStatus', icono: '🏷️', color: '#B08900', bg: '#FDF6E3', roles: ['Artesano', 'Auditor'],
      campos: ['id : int (PK)', 'name : text', 'display_order : int', 'is_terminal : boolean'],
      descripcion: 'Tabla semilla: Preparación, Trámites de exportación, En tránsito, Aduana EE.UU., Entregado — las etapas del flujo internacional.' },
    { nombre: 'InternationalShipmentStatusTransition', icono: '🔀', color: '#B08900', bg: '#FDF6E3', roles: ['Auditor'],
      campos: ['from_status_id : FK (PK)', 'to_status_id : FK (PK)', 'allowed_role : enum(artisan, support, system)'],
      descripcion: 'Saltos válidos entre etapas del envío internacional. Dato de referencia por ahora.' },
    { nombre: 'MonthlyMetric', icono: '📊', color: '#6d3fae', bg: '#F1EAFB', roles: ['Auditor'],
      campos: ['month : date (PK)', 'gmv : numeric', 'completed_orders : int', 'total_cases : int'],
      descripcion: 'Vista/agregado calculado sobre Order y SupportCase — no es una tabla transaccional propia. Solo fecha, sin hora.' },
    { nombre: 'ActivityLog', icono: '🕵️', color: '#C8102E', bg: '#FBE9EC', roles: ['Soporte', 'Auditor'],
      campos: ['id : UUID (PK)', 'entity_type : enum', 'entity_id : UUID (polymorphic ref)', 'action : enum(create, update, delete)', 'user_id : FK', 'occurred_at : datetimeoffset', 'changes : jsonb (diff, includes status changes)'],
      descripcion: 'Log de auditoría transversal, append-only: registra cada cambio, incluyendo cada transición de estado de Order, SupportCase, InternationalShipment y ArtisanProfile. Base del historial de Soporte y trazabilidad de Auditor.' },
  ];

  entidadesFiltradas() {
    const f = this.filtroActivo();
    return f === 'Todos' ? this.entidades : this.entidades.filter(e => e.roles.includes(f));
  }
}
