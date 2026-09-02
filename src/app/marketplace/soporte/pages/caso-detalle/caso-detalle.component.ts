import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AGENTE_ACTUAL, CASOS, type EstadoCaso } from '../../../data/marketplace-data';

@Component({
  selector: 'app-caso-detalle',
  standalone: true,
  imports: [RouterLink, FormsModule],
  styles: [`
    .cd-layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 20px;
      align-items: flex-start;
    }
    @media (max-width: 860px) {
      .cd-layout { grid-template-columns: 1fr; }
    }
  `],
  template: `
    @if (caso(); as c) {
      <div style="max-width:1100px; margin:0 auto; padding:28px 16px 48px;">

        <a routerLink="/marketplace/soporte/casos" style="display:inline-flex; align-items:center; gap:6px; color:#3A4148; font-size:0.85rem; font-weight:600; text-decoration:none; margin-bottom:16px;">
          ← Volver a la bandeja
        </a>

        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; flex-wrap:wrap;">
          <div>
            <p style="color:#5A6472; font-size:0.78rem; font-weight:700; margin:0 0 2px;">{{ c.id }}</p>
            <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.35rem; font-weight:900; margin:0;">
              {{ c.asunto }}
            </h1>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <span style="padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:700;"
                  [style.background]="prioridadColor(c.prioridad).bg" [style.color]="prioridadColor(c.prioridad).color">
              Prioridad {{ c.prioridad }}
            </span>
            <span style="padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:700; background:#ECEEF0; color:#3A4148;">
              {{ estadoActual() }}
            </span>
          </div>
        </div>

        <div class="cd-layout">

          <div>
            <div style="background:#fff; border:1px solid #E1E4E8; border-radius:12px; padding:20px; margin-bottom:16px;">
              <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1rem; font-weight:700; margin:0 0 14px;">
                Conversación
              </h2>
              <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
                @for (m of c.mensajes; track m.fecha) {
                  <div style="padding:12px 14px; border-radius:10px;"
                       [style.background]="m.rol === 'soporte' ? '#F4F5F6' : '#F2F6F4'">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                      <span style="font-weight:700; color:#1F2A22; font-size:0.82rem;">{{ m.autor }}</span>
                      <span style="color:#8a9099; font-size:0.72rem;">{{ m.fecha }}</span>
                    </div>
                    <p style="color:#3A4148; font-size:0.85rem; margin:0; line-height:1.5;">{{ m.texto }}</p>
                  </div>
                }
              </div>

              <textarea [(ngModel)]="respuesta" rows="3" placeholder="Escribe una respuesta para el solicitante..."
                        style="width:100%; padding:10px 12px; border:1.5px solid #E1E4E8; border-radius:8px; font-size:0.85rem; resize:vertical; box-sizing:border-box; margin-bottom:10px;"></textarea>
              <button (click)="enviarRespuesta()" [disabled]="!respuesta.trim()"
                      style="padding:9px 20px; background:#3A4148; color:#fff; border:none; border-radius:8px; font-size:0.85rem; font-weight:700; cursor:pointer;"
                      [style.opacity]="!respuesta.trim() ? '0.5' : '1'">
                Enviar respuesta
              </button>
            </div>
          </div>

          <div>
            <div style="background:#fff; border:1px solid #E1E4E8; border-radius:12px; padding:18px; margin-bottom:16px;">
              <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:0.92rem; font-weight:700; margin:0 0 12px;">
                Detalles del caso
              </h3>
              <dl style="margin:0; font-size:0.8rem;">
                <dt style="color:#5A6472;">Solicitante</dt>
                <dd style="color:#1F2A22; font-weight:600; margin:2px 0 10px;">{{ c.solicitante }} ({{ c.rolSolicitante }})</dd>
                <dt style="color:#5A6472;">Categoría</dt>
                <dd style="color:#1F2A22; font-weight:600; margin:2px 0 10px;">{{ c.categoria }}</dd>
                <dt style="color:#5A6472;">Creado</dt>
                <dd style="color:#1F2A22; font-weight:600; margin:2px 0 10px;">{{ c.fechaCreacion }}</dd>
                @if (c.pedidoRelacionado) {
                  <dt style="color:#5A6472;">Pedido relacionado</dt>
                  <dd style="color:#1F2A22; font-weight:600; margin:2px 0 0;">{{ c.pedidoRelacionado }}</dd>
                }
              </dl>
            </div>

            <div style="background:#fff; border:1px solid #E1E4E8; border-radius:12px; padding:18px;">
              <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:0.92rem; font-weight:700; margin:0 0 12px;">
                Acciones
              </h3>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <button (click)="estadoActual.set('En proceso')"
                        style="padding:9px; background:#F4F5F6; color:#3A4148; border:1px solid #E1E4E8; border-radius:8px; font-size:0.82rem; font-weight:700; cursor:pointer;">
                  Marcar "En proceso"
                </button>
                <button (click)="estadoActual.set('Resuelto')"
                        style="padding:9px; background:#e3ebe7; color:#295440; border:1px solid #C6D7CD; border-radius:8px; font-size:0.82rem; font-weight:700; cursor:pointer;">
                  Marcar como resuelto
                </button>
                <button (click)="estadoActual.set('Cerrado')"
                        style="padding:9px; background:#fff; color:#5A6472; border:1px solid #E1E4E8; border-radius:8px; font-size:0.82rem; font-weight:700; cursor:pointer;">
                  Cerrar caso
                </button>
                <button style="padding:9px; background:#fde2e2; color:#C8102E; border:1px solid #f5b5b5; border-radius:8px; font-size:0.82rem; font-weight:700; cursor:pointer;">
                  Escalar a supervisor
                </button>
                @if (c.pedidoRelacionado) {
                  <button style="padding:9px; background:#fff3cd; color:#856404; border:1px solid #ffe08a; border-radius:8px; font-size:0.82rem; font-weight:700; cursor:pointer;">
                    Emitir reembolso
                  </button>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    } @else {
      <div style="max-width:600px; margin:0 auto; padding:80px 16px; text-align:center;">
        <p style="color:#5A6472; font-size:0.95rem; margin:0 0 20px;">No encontramos este caso.</p>
        <a routerLink="/marketplace/soporte/casos"
           style="display:inline-flex; align-items:center; gap:8px; background:#3A4148; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
          Volver a la bandeja
        </a>
      </div>
    }
  `,
})
export class CasoDetalleComponent {
  private idParam = signal<string | null>(null);
  respuesta = '';
  agente = AGENTE_ACTUAL;

  caso = computed(() => CASOS.find(c => c.id === this.idParam()) ?? null);
  estadoActual = signal<EstadoCaso>('Abierto');

  constructor(private route: ActivatedRoute) {
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        this.idParam.set(params.get('id'));
        this.estadoActual.set(this.caso()?.estado ?? 'Abierto');
      });
  }

  enviarRespuesta() {
    const c = this.caso();
    if (!c || !this.respuesta.trim()) return;
    c.mensajes.push({ autor: this.agente.nombre, rol: 'soporte', texto: this.respuesta.trim(), fecha: 'Ahora' });
    this.respuesta = '';
  }

  prioridadColor(p: string): { bg: string; color: string } {
    const mapa: Record<string, { bg: string; color: string }> = {
      'Alta': { bg: '#fde2e2', color: '#C8102E' },
      'Media': { bg: '#fff3cd', color: '#856404' },
      'Baja': { bg: '#e3ebe7', color: '#295440' },
    };
    return mapa[p] ?? { bg: '#ECEEF0', color: '#3A4148' };
  }
}
