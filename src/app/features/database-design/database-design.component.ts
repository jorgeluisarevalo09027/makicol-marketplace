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
  /** 'hoy' = espejo del backend actual; 'objetivo' = propuesta, no existe hoy. */
  sincronia?: 'hoy' | 'objetivo';
}

@Component({
  selector: 'app-database-design',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  styles: [`
    .db-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    @media (max-width:900px) { .db-grid { grid-template-columns:repeat(2,1fr); } }
    @media (max-width:600px) { .db-grid { grid-template-columns:1fr; } }

    /* Barra de controles del modal del diagrama ER. */
    .modal-controls {
      position:fixed; top:14px; right:14px; left:14px; z-index:110;
      display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;
    }
    .modal-hint {
      color:#fff; font-size:0.82rem; font-weight:700; background:rgba(0,0,0,0.35);
      padding:8px 14px; border-radius:8px; backdrop-filter:blur(6px);
    }
    .modal-hint--full { display:none; }
    .modal-hint--touch { font-size:0.75rem; }
    .modal-zoom { display:flex; gap:8px; }
    .modal-btn {
      border:none; background:#fff; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
    }
    .modal-btn--round { width:44px; height:44px; border-radius:50%; font-size:1.1rem; }
    .modal-btn--pct { height:44px; border-radius:22px; padding:0 16px; font-size:0.78rem; font-weight:800; }
    .modal-btn--close { background:#C8102E; color:#fff; }

    /* En móvil: ocultar el texto largo, mostrar la pista táctil breve, y dejar los botones
       de zoom en su propia fila separada del borde. En md+ vuelve el texto completo. */
    @media (max-width:767px) {
      .modal-controls { justify-content:flex-end; }
      .modal-hint--touch { order:2; width:100%; text-align:center; }
      .modal-zoom { order:1; width:100%; justify-content:flex-end; }
    }
    @media (min-width:768px) {
      .modal-hint--full { display:block; }
      .modal-hint--touch { display:none; }
    }
  `],
  template: `
    <div style="min-height:100vh; background:var(--mk-paper);">

      <header style="background:#fff; border-bottom:1px solid var(--mk-sand); position:sticky; top:0; z-index:40;">
        <div style="max-width:1100px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <a routerLink="/propuesta" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:32px; height:32px; object-fit:contain;">
            <span style="color:var(--mk-green-deep); font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem;">Makicol · Propuesta Ejecutiva</span>
          </a>
          <div style="display:flex; gap:16px;">
            <a routerLink="/evaluacion-backoffice" style="color:var(--mk-ink-soft); font-size:0.82rem; text-decoration:none; font-weight:600;">← Evaluación de arquitectura</a>
            <a routerLink="/propuesta" style="color:var(--mk-green-deep); font-size:0.82rem; text-decoration:none; font-weight:700;">Propuesta →</a>
          </div>
        </div>
      </header>

      <section style="padding:48px 20px 32px; text-align:center; background:linear-gradient(180deg,var(--mk-paper-alt),var(--mk-paper));">
        <div style="max-width:760px; margin:0 auto;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:7px 16px; border-radius:20px; background:#FDF3D6; margin-bottom:18px;">
            <span style="font-size:0.9rem;">⚠️</span>
            <span style="color:#856404; font-size:0.82rem; font-weight:800;">Trabajo en progreso · se corrige y actualiza en cada iteración</span>
          </div>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:900; font-size:2.1rem; line-height:1.2; margin:0 0 14px;">
            Diseño de base de datos<br><span style="color:var(--mk-green-deep);">para los 4 roles de Makicol</span>
          </h1>
          <p style="color:var(--mk-ink-soft); font-size:1rem; line-height:1.6; max-width:640px; margin:0 auto;">
            Modelo entidad-relación que cubre lo que necesita Comprador, Artesano, Soporte y Auditor 
            base para construir la persistencia real cuando el prototipo pase a producción.
          </p>
          <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.5; max-width:640px; margin:14px auto 0;">
            <strong>Convención:</strong> los nombres de entidades, tablas y campos están en inglés para que el esquema sea directamente usable por el equipo de desarrollo y por herramientas de ORM.
            Las notas, descripciones y explicaciones se mantienen en español para la presentación.
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:44px;">

        <!-- Changelog / enfoque -->
        <section>
          <div style="background:#fff; border-left:4px solid #003893; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">🧩 Enfoque híbrido de esta vista</h4>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0;">
              El diagrama se mantiene como fuente formal en <strong>PlantUML</strong> (<code style="background:var(--mk-paper-alt); padding:2px 6px; border-radius:4px; font-size:0.8rem;">docs/database/er-diagram-v7.puml</code>),
              versionable y fácil de comparar entre iteraciones. Esta página muestra el render más reciente y un desglose interactivo
              pensado para revisar y corregir en vivo durante la presentación, sin depender de regenerar imágenes en cada ajuste menor.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #C8102E; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">🗂️ v2: auditoría / trazabilidad</h4>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Se agregaron campos de auditoría (<code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">created_at</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">updated_at</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">updated_by</code>) a las entidades que cambian de estado.
            </p>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0;">
              Eso no basta para un historial completo, por eso se agregó también <strong>ActivityLog</strong>: un log
              transversal, de solo escritura (append-only), que registra <strong>cada</strong> creación/modificación/eliminación.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #003893; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">🔄 v3: máquina de estados con tablas semilla</h4>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Los campos <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">status</code> de tipo enum
              en <strong>Order</strong>, <strong>SupportCase</strong> y <strong>ArtisanProfile</strong> (verificación) se reemplazaron por una
              <strong>tabla de estados sembrada</strong> más una <strong>tabla de transiciones válidas</strong> por entidad.
              Cada cambio de estado se registra en <strong>ActivityLog</strong>, sin necesidad de una tabla de historial aparte.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #1EA03B; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-bottom:14px;">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">🌎 v4: tiempos multi-región</h4>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Makicol se desplegará en <strong>Azure</strong> con usuarios de EE. UU., Europa y otras regiones. Para evitar errores de
              fechas/horas en compras, soporte y auditoría, todos los instantes se guardan como <strong>datetimeoffset</strong> en
              Azure SQL: se mantiene el mismo punto en el tiempo (UTC) y, a la vez, el offset original del usuario.
            </p>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0;">
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">BuyerProfile</code> y
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">ArtisanProfile</code> guardan
              <strong>timezone</strong> (IANA) para que el frontend Angular pueda mostrar la hora local del usuario.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #B08900; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">🏷️ v5: nombres de esquema en inglés</h4>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0;">
              Todas las entidades, tablas y campos del modelo se renombraron a inglés siguiendo convención de desarrollo
              (<code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">User</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">Order</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">BuyerProfile</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">created_at</code>, etc.).
              Las descripciones, notas y la interfaz de esta página se mantienen en español para el contexto de la propuesta.
            </p>
          </div>

          <div style="background:#fff; border-left:4px solid #1EA03B; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-top:14px;">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">✅ v7 (oct-2026): el diagrama y las fichas reflejan el backend real</h4>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0 0 10px;">
              El diagrama y las fichas de abajo se derivaron de las entidades reales del servicio
              (<code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">Makicol.Domain/Entities</code> +
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">AppDbContext</code>). El backend usa tablas
              sin prefijo y en el esquema <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">dbo</code>
              (<code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">User</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">Order</code>, ). Cada ficha indica si
              <strong>existe en el demo hoy</strong> o es una <strong>propuesta</strong> para el piloto.
            </p>
            <p style="color:#856404; background:#FDF3D6; border-radius:8px; padding:8px 12px; font-size:0.8rem; line-height:1.5; margin:0 0 10px;">
              <strong>Nota histórica:</strong> una versión anterior del diseño (v6) planteaba un prefijo <code>Mk</code>, un esquema
              <code>makicol</code> y coexistencia aislada con el proyecto "Feria Artesanal". <strong>El backend no adoptó ese diseño</strong>;
              se documenta solo como antecedente.
            </p>
            <a routerLink="/contrato-api" style="display:inline-flex; align-items:center; gap:6px; color:var(--mk-green-deep); font-size:0.85rem; font-weight:800; text-decoration:none;">
              Ver contrato de API que expone el servicio →
            </a>
          </div>
        
          <div style="background:#fff; border-left:4px solid #B08900; border-radius:14px; padding:20px; box-shadow:0 2px 16px rgba(41,84,64,0.08); margin-top:14px;">
            <h4 style="color:var(--mk-ink); font-weight:800; font-size:0.9rem; margin:0 0 8px;">v8 (propuesta, no existe hoy): descubrimiento del catalogo</h4>
            <p style="color:#856404; background:#FDF3D6; border-radius:8px; padding:8px 12px; font-size:0.8rem; line-height:1.5; margin:0 0 10px;">
              <strong>Estado objetivo.</strong> Propuesta registrada como BR-15 y BR-16 (feature 007). Editada y compilada en una rama del backend,
              <strong>sin migrar la base de datos ni desplegar</strong>. Cuando se despliegue y verifique, estos campos se incorporan al diagrama (v8) y pasan a "en el demo hoy".
            </p>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0 0 8px;">
              Para dar intencion de negocio a las tres secciones de la home del comprador (artesanos destacados, piezas destacadas e inspirado en favoritos)
              se proponen tres endpoints <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">/api/discovery</code>
              publicos con degradacion (vista personalizada con token de comprador, vista por defecto sin token; nunca 401).
            </p>
            <p style="color:var(--mk-ink-soft); font-size:0.85rem; line-height:1.6; margin:0;">
              Para que esas consultas sean rapidas se materializa el rating:
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">Product.RatingAverage / RatingCount</code> y
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">ArtisanProfile.RatingEffective / RatingCount</code>
              (el artesano arranca en 5.0 hasta tener 3 resenas; luego usa el promedio real), mas indices compuestos en
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">Product</code> por
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">(IsActive, SoldCount)</code>,
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">(IsActive, CreatedAt)</code> y
              <code style="background:var(--mk-paper-alt); padding:1px 5px; border-radius:4px; font-size:0.78rem;">(IsActive, Category, SoldCount)</code>.
            </p>
          </div>
        </section>

        <!-- Diagrama -->
        <section>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:16px;">
            <span style="color:var(--mk-green-deep); font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">📊 Diagrama entidad-relación (v7: demo hoy y propuesta del piloto)</span>
            <button (click)="abrirModal()"
                    style="display:inline-flex; align-items:center; gap:6px; background:var(--mk-green-deep); color:#fff; border:none; border-radius:8px; padding:9px 16px; font-size:0.8rem; font-weight:700; cursor:pointer;">
              <span class="material-symbols-outlined" style="font-size:1.1rem;">fullscreen</span>
              Ampliar diagrama
            </button>
          </div>
          <div style="background:#fff; border-radius:14px; padding:16px; box-shadow:0 2px 16px rgba(41,84,64,0.08); overflow-x:auto; text-align:center;">
            <img src="/assets/makicol-er-diagram-v7.svg" alt="Diagrama entidad-relación Makicol v7: 29 tablas del demo y propuesta de envíos y medios de pago" style="max-width:100%; height:auto;">
          </div>
        </section>

        <!-- Desglose por entidad -->
        <section>
          <div style="margin-bottom:16px;">
            <span style="color:#6d3fae; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">🧱 Entidades por rol</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--mk-ink); font-weight:800; font-size:1.3rem; margin:6px 0 4px;">
              Haz clic en cada entidad para ver sus campos
            </h2>
            <p style="color:var(--mk-ink-soft); font-size:0.8rem; margin:0;">
              Los nombres y campos están en inglés; las descripciones en español explican qué representa cada tabla en el negocio.
            </p>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
            @for (f of filtros; track f) {
              <button (click)="filtroActivo.set(f)"
                      style="padding:6px 14px; border-radius:20px; font-size:0.78rem; font-weight:700; cursor:pointer; border:1.5px solid;"
                      [style.background]="filtroActivo() === f ? 'var(--mk-green-deep)' : '#fff'"
                      [style.color]="filtroActivo() === f ? '#fff' : 'var(--mk-green-deep)'"
                      [style.border-color]="filtroActivo() === f ? 'var(--mk-green-deep)' : 'var(--mk-sand)'">
                {{ f }}
              </button>
            }
          </div>

          <div class="db-grid">
            @for (e of entidadesFiltradas(); track e.nombre) {
              <button (click)="seleccionada.set(seleccionada() === e.nombre ? null : e.nombre)"
                      style="text-align:left; cursor:pointer; border-radius:12px; padding:16px; border:1.5px solid;"
                      [style.background]="e.bg"
                      [style.border-color]="seleccionada() === e.nombre ? e.color : 'var(--mk-sand)'">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap;">
                  <span style="font-size:1.3rem;">{{ e.icono }}</span>
                  <span style="color:var(--mk-ink); font-weight:800; font-size:0.88rem;">{{ e.nombre }}</span>
                  @if (e.sincronia === 'objetivo') {
                    <span style="font-size:0.6rem; font-weight:800; padding:2px 7px; border-radius:10px; background:#FDF3D6; color:#856404;">PROPUESTA · no existe hoy</span>
                  } @else {
                    <span style="font-size:0.6rem; font-weight:800; padding:2px 7px; border-radius:10px; background:#E4EFE6; color:var(--mk-green-deep);">en el demo hoy</span>
                  }
                </div>
                <p style="color:var(--mk-ink-soft); font-size:0.76rem; margin:0 0 8px; line-height:1.4;">{{ e.descripcion }}</p>
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

      <footer style="padding:48px 20px; text-align:center; border-top:3px solid var(--mk-gold); background:#fff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
          <a routerLink="/evaluacion-backoffice"
             style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none;
                    background:var(--mk-paper-alt); border:1.5px solid var(--mk-sand); color:var(--mk-green-deep);">
            ← Evaluación de arquitectura
          </a>
          <a routerLink="/propuesta"
             style="padding:12px 24px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none;
                    background:var(--mk-green); color:#fff;">
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
        <div (click)="$event.stopPropagation()" class="modal-controls">
          <!-- Pista breve en móvil; texto completo (con rueda del ratón) desde md hacia arriba. -->
          <div class="modal-hint modal-hint--full">
            Usa la rueda del ratón para hacer zoom · Arrastra para desplazarte · Doble clic para resetear
          </div>
          <div class="modal-hint modal-hint--touch">
            Pellizca o usa los botones para el zoom · arrastra para mover
          </div>
          <div class="modal-zoom">
            <button (click)="zoomOut()" class="modal-btn modal-btn--round">-</button>
            <button (click)="zoomReset()" class="modal-btn modal-btn--pct">{{ zoom() * 100 | number:'1.0-0' }}%</button>
            <button (click)="zoomIn()" class="modal-btn modal-btn--round">+</button>
            <button (click)="modalAbierto.set(false)" class="modal-btn modal-btn--round modal-btn--close">✕</button>
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
          <img src="/assets/makicol-er-diagram-v7.svg"
               alt="Diagrama entidad-relación Makicol v7 ampliado"
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

  // Fichas derivadas de las entidades reales del backend (Makicol.Domain/Entities + AppDbContext, oct-2026).
  // Nombres de tabla reales: sin prefijo Mk, esquema dbo. sincronia:'hoy' = existe en el backend.
  entidades: Entidad[] = [
    { nombre: 'User', icono: '👤', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'Name : text', 'Email : text (unique)', 'PasswordHash : text', 'Role : buyer | artisan | support | auditor', 'Language : text (es, en...)', 'RegistrationDate : date', 'CreatedAt / UpdatedAt / UpdatedBy : audit'],
      descripcion: 'Cuenta base compartida por los 4 roles; el rol determina qué perfil extendido tiene (BuyerProfile, ArtisanProfile o SupportAgent).' },
    { nombre: 'RefreshToken', icono: '🔑', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'UserId : FK -> User', 'Token : text (unique)', 'ExpiresAt : datetimeoffset', 'IsRevoked : boolean', 'CreatedAt : datetimeoffset'],
      descripcion: 'Autenticación propia del demo (JWT de 30 min + refresh de 7 días que rota en cada uso).' },
    { nombre: 'BuyerProfile', icono: '🛍️', color: '#003893', bg: '#EAF1FC', roles: ['Comprador'], sincronia: 'hoy',
      campos: ['UserId : UUID (PK, FK)', 'City : text', 'ShippingAddress : text', 'Timezone : text (IANA)'],
      descripcion: 'Datos de envío del comprador y zona horaria (America/Bogota por defecto).' },
    { nombre: 'ArtisanProfile', icono: '🎨', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano'], sincronia: 'hoy',
      campos: ['UserId : UUID (PK, FK)', 'Region / City / CraftType : text', 'Bio : text', 'StartYear : int?', 'Materials : json', 'PaymentMethod : text (UNO solo, def. nequi)', 'Timezone : text (IANA)', 'AvatarUrl / CoverUrl : text', 'VerificationStatusId : FK'],
      descripcion: 'Perfil de vendedor: oficio, historia, materiales y estado de verificación. Hoy guarda un solo método de pago; el modelo B con varios medios es propuesta (no existe).' },
    { nombre: 'Product', icono: '📦', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano', 'Comprador', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'ArtisanId : FK', 'Name / Category / Region : text', 'Price : numeric(18,2)', 'Description / ImageUrl : text', 'SoldCount : int', 'Stock : int? (null = bajo pedido)', 'IsActive : boolean (def. true)', 'CreatedAt / CreatedBy / UpdatedAt / UpdatedBy : audit'],
      descripcion: 'Catálogo publicado por los artesanos. "IsActive" es un booleano simple (activo/pausado), excepción intencional al patrón de tablas de estado.' },
    { nombre: 'ProductImage', icono: '🖼️', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'ProductId : FK', 'Url : text', 'SortOrder : int (0 = portada)', 'CreatedAt : datetimeoffset'],
      descripcion: 'Galería de imágenes del producto. La imagen con SortOrder 0 es la portada (coincide con Product.ImageUrl).' },
    { nombre: 'Order', icono: '🛒', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'BuyerId : FK', 'ArtisanId : FK (un artesano por pedido)', 'PlacedAt : datetimeoffset', 'Total : numeric(18,2)', 'StatusId : FK -> OrderStatus', 'OriginTimezone : text (IANA)', 'PaymentMethodPreference : text (informativa)', 'CheckoutGroupId : UUID? (agrupa el carrito)', 'CreatedAt / UpdatedAt / UpdatedBy : audit'],
      descripcion: 'Compra de un comprador a un solo artesano; base del GMV. La preferencia de pago es informativa: el cobro se coordina fuera de la plataforma.' },
    { nombre: 'OrderStatus', icono: '🏷️', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : int (PK)', 'Name : text', 'DisplayOrder : int', 'IsTerminal : boolean'],
      descripcion: 'Tabla semilla: Recibido, En preparación, Enviado, Entregado (terminal) y Cancelado (terminal).' },
    { nombre: 'OrderStatusTransition', icono: '🔀', color: '#003893', bg: '#EAF1FC', roles: ['Auditor'], sincronia: 'hoy',
      campos: ['FromStatusId : FK (PK)', 'ToStatusId : FK (PK)', 'AllowedRole : buyer | artisan | system'],
      descripcion: 'Saltos válidos entre estados del pedido: el artesano avanza Recibido→Preparación→Enviado; el comprador confirma Entregado o cancela desde Recibido.' },
    { nombre: 'OrderItem', icono: '🧾', color: '#003893', bg: '#EAF1FC', roles: ['Comprador', 'Artesano'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'OrderId : FK', 'ProductId : FK', 'Quantity : int', 'UnitPrice : numeric(18,2)'],
      descripcion: 'Línea de producto de un pedido. El backend divide el carrito y crea un pedido por artesano, así que cada pedido lleva productos de un solo artesano.' },
    { nombre: 'Review', icono: '⭐', color: '#B08900', bg: '#FDF6E3', roles: ['Comprador', 'Artesano', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'AuthorId : FK', 'ProductId : FK', 'Rating : int', 'Comment : text', 'PostedOn : date', '(AuthorId, ProductId) unique'],
      descripcion: 'Calificación de un comprador sobre un producto; una reseña por autor y producto.' },
    { nombre: 'WishlistItem', icono: '❤️', color: '#C8102E', bg: '#FBE9EC', roles: ['Comprador'], sincronia: 'hoy',
      campos: ['BuyerId : FK (PK)', 'ProductId : FK (PK)', 'AddedOn : date'],
      descripcion: 'Relación muchos-a-muchos entre comprador y producto: la lista de deseos.' },
    { nombre: 'SupportCase', icono: '🎫', color: 'var(--mk-ink-soft)', bg: '#F4F5F6', roles: ['Comprador', 'Artesano', 'Soporte', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'RequesterId : FK', 'RequesterRole : text', 'Category / Subject : text', 'StatusId : FK -> SupportCaseStatus', 'Priority : text', 'RelatedOrderId : FK?', 'AssignedAgentId : FK? -> SupportAgent', 'CreatedAt / UpdatedAt / UpdatedBy : audit'],
      descripcion: 'Caso de soporte abierto por comprador o artesano; puede ligarse a un pedido y asignarse a un agente.' },
    { nombre: 'SupportMessage', icono: '💬', color: 'var(--mk-ink-soft)', bg: '#F4F5F6', roles: ['Soporte'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'CaseId : FK', 'AuthorId : FK', 'AuthorRole : text', 'Body : text', 'SentAt : datetimeoffset'],
      descripcion: 'Hilo de conversación dentro de un caso de soporte.' },
    { nombre: 'SupportCaseStatus', icono: '🏷️', color: 'var(--mk-ink-soft)', bg: '#F4F5F6', roles: ['Soporte', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : int (PK)', 'Name : text', 'DisplayOrder : int', 'IsTerminal : boolean'],
      descripcion: 'Tabla semilla: Abierto, En proceso, Resuelto, Cerrado (terminal).' },
    { nombre: 'SupportCaseStatusTransition', icono: '🔀', color: 'var(--mk-ink-soft)', bg: '#F4F5F6', roles: ['Soporte', 'Auditor'], sincronia: 'hoy',
      campos: ['FromStatusId : FK (PK)', 'ToStatusId : FK (PK)', 'AllowedRole : support | system'],
      descripcion: 'Saltos válidos entre estados del caso, incluye reapertura (Cerrado → Abierto).' },
    { nombre: 'SupportAgent', icono: '🧑‍💼', color: 'var(--mk-ink-soft)', bg: '#F4F5F6', roles: ['Soporte'], sincronia: 'hoy',
      campos: ['UserId : UUID (PK, FK)', 'Level : text (L1...)'],
      descripcion: 'Perfil del agente de soporte; nivel de atención. Es el rol que atiende los casos.' },
    { nombre: 'FaqItem', icono: '❓', color: 'var(--mk-ink-soft)', bg: '#F4F5F6', roles: ['Comprador', 'Artesano', 'Soporte'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'Question / Answer / Category : text', 'TargetRole : text'],
      descripcion: 'Preguntas frecuentes del centro de ayuda de cada rol.' },
    { nombre: 'ArtisanVerificationStatus', icono: '🛡️', color: '#8a6040', bg: '#FBF3E9', roles: ['Artesano', 'Soporte'], sincronia: 'hoy',
      campos: ['Id : int (PK)', 'Name : text', 'DisplayOrder : int', 'IsTerminal : boolean', 'AllowsPublishing : boolean'],
      descripcion: 'Tabla semilla: Pendiente, Verificado, Rechazado. Solo "Verificado" tiene AllowsPublishing=true (la regla de publicar es dato, no nombre).' },
    { nombre: 'ArtisanVerificationStatusTransition', icono: '🔀', color: '#8a6040', bg: '#FBF3E9', roles: ['Soporte'], sincronia: 'hoy',
      campos: ['FromStatusId : FK (PK)', 'ToStatusId : FK (PK)', 'AllowedRole : support | system'],
      descripcion: 'Saltos válidos entre estados de verificación del artesano (Pendiente → Verificado / Rechazado).' },
    { nombre: 'Story', icono: '📖', color: '#6d3fae', bg: '#F1EAFB', roles: ['Soporte', 'Comprador'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'Title / Region / Summary : text', 'CoverImageId : UUID?', 'Content : json (árbol de bloques, nunca HTML)', 'SchemaVersion : int', 'AuthorId : UUID?', 'CreatedAt / UpdatedAt'],
      descripcion: 'Historia editorial gestionada por soporte. Da identidad y relato al artesano/región; el contenido es un árbol de bloques en JSON.' },
    { nombre: 'StoryImage', icono: '🖼️', color: '#6d3fae', bg: '#F1EAFB', roles: ['Soporte'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'StoryId : FK', 'Url : text', 'Width / Height : int', 'ContentType : text', 'SizeBytes : bigint', 'CreatedAt : datetimeoffset'],
      descripcion: 'Imagen de una historia. El tamaño y la alineación se definen en el bloque dentro del JSON, no aquí.' },
    { nombre: 'InternationalShipment', icono: '✈️', color: '#B08900', bg: '#FDF6E3', roles: ['Artesano', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'OrderId : FK (unique)', 'StatusId : FK -> InternationalShipmentStatus', 'Courier / TrackingNumber / CertificateOfOriginRef : text', 'CreatedAt / UpdatedAt / UpdatedBy : audit'],
      descripcion: 'Entidad de SOLO LECTURA: existe en el modelo pero no hay endpoints para crearla ni avanzarla. El envío internacional es fase futura (no ejecutada).' },
    { nombre: 'InternationalShipmentStatus', icono: '🏷️', color: '#B08900', bg: '#FDF6E3', roles: ['Artesano', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : int (PK)', 'Name : text', 'DisplayOrder : int', 'IsTerminal : boolean'],
      descripcion: 'Tabla semilla: Preparación, Trámites de exportación, En tránsito, Aduana EE.UU., Entregado. Catálogo presente aunque el flujo no se usa.' },
    { nombre: 'InternationalShipmentStatusTransition', icono: '🔀', color: '#B08900', bg: '#FDF6E3', roles: ['Auditor'], sincronia: 'hoy',
      campos: ['FromStatusId : FK (PK)', 'ToStatusId : FK (PK)', 'AllowedRole : artisan | support | system'],
      descripcion: 'Saltos válidos entre etapas del envío internacional. Dato de referencia.' },
    { nombre: 'ActivityLog', icono: '🧾', color: '#C8102E', bg: '#FBE9EC', roles: ['Soporte', 'Auditor'], sincronia: 'hoy',
      campos: ['Id : UUID (PK)', 'EntityType : text', 'EntityId : UUID (ref. polimórfica, sin FK)', 'Action : create | update | delete', 'UserId : UUID?', 'OccurredAt : datetimeoffset', 'Changes : json (diff, incluye cambios de estado)'],
      descripcion: 'Log de auditoría transversal, append-only: registra cada cambio, incluidas las transiciones de estado. Base de la trazabilidad del Auditor.' },
    { nombre: 'MonthlyMetric', icono: '📈', color: '#6d3fae', bg: '#F1EAFB', roles: ['Auditor'], sincronia: 'hoy',
      campos: ['Month : date (PK)', 'Gmv : numeric(18,2)', 'CompletedOrders : int', 'TotalCases : int'],
      descripcion: 'Agregado mensual para el Auditor; se recalcula sobre Order y SupportCase, no es transaccional.' },
    // --- Propuesta para el piloto (NO existe en el backend hoy; requiere BR + autorización) ---
    { nombre: 'ArtisanPaymentMethod', icono: '💳', color: 'var(--mk-green-deep)', bg: '#E4EFE6', roles: ['Artesano'], sincronia: 'objetivo',
      campos: ['Id : UUID (PK)', 'ArtisanId : FK', 'Kind : directo (modelo B) | plataforma (modelo A)', 'Detail : text'],
      descripcion: 'PROPUESTA: lista de medios aceptados por artesano y su modelo (B directo / A por la plataforma). Hoy el perfil guarda un solo PaymentMethod; esto no existe.' },
    { nombre: 'Shipment (nacional)', icono: '🚚', color: 'var(--mk-green-deep)', bg: '#E4EFE6', roles: ['Artesano', 'Soporte', 'Auditor'], sincronia: 'objetivo',
      campos: ['Id : UUID (PK)', 'OrderId : FK', 'Carrier : Servientrega', 'GuideNumber / LabelUrl : text', 'CodAmount : numeric (valor a recaudar)', 'StatusId : FK -> ShipmentStatus'],
      descripcion: 'PROPUESTA para el piloto: guía nacional con contra entrega (Servientrega). No existe en el backend; requiere BR y autorización.' },
    { nombre: 'ShipmentStatus', icono: '🏷️', color: 'var(--mk-green-deep)', bg: '#E4EFE6', roles: ['Soporte', 'Auditor'], sincronia: 'objetivo',
      campos: ['Id : int (PK)', 'Name : GuiaGenerada | Novedad | Recaudado | Devolución | Devuelto | Liquidado', 'IsTerminal : boolean'],
      descripcion: 'PROPUESTA: estados nuevos del envío nacional contra entrega (O12). No existen hoy; solo el recaudo cierra la venta.' },
  ];

  entidadesFiltradas() {
    const f = this.filtroActivo();
    return f === 'Todos' ? this.entidades : this.entidades.filter(e => e.roles.includes(f));
  }
}
