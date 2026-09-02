import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CASOS, CATEGORIAS_CASO, COMPRADOR_ACTUAL, PEDIDOS } from '../../../data/marketplace-data';

@Component({
  selector: 'app-ayuda-nuevo-comprador',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div style="max-width:600px; margin:0 auto; padding:32px 16px 48px;">

      <a routerLink="/marketplace/comprador/ayuda" style="color:#295440; text-decoration:none; font-size:0.85rem; font-weight:600;">
        ← Volver al centro de ayuda
      </a>

      @if (!enviado()) {
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.4rem; font-weight:900; margin:16px 0 20px;">
          Crear un caso de soporte
        </h1>

        <div style="background:#fff; border-left:4px solid #FFCD00; border-radius:12px; padding:24px; box-shadow:0 2px 12px rgba(41,84,64,0.09); display:flex; flex-direction:column; gap:16px;">
          <div>
            <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Categoría *</label>
            <select [(ngModel)]="form.categoria" style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; background:#fff;">
              <option value="">Selecciona una categoría...</option>
              @for (cat of categorias; track cat) { <option>{{ cat }}</option> }
            </select>
          </div>
          <div>
            <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Pedido relacionado (opcional)</label>
            <select [(ngModel)]="form.pedido" style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; background:#fff;">
              <option value="">Ninguno</option>
              @for (p of misPedidos; track p.id) { <option [value]="p.id">{{ p.id }} · {{ p.producto }}</option> }
            </select>
          </div>
          <div>
            <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Asunto *</label>
            <input [(ngModel)]="form.asunto" placeholder="Resume el problema en pocas palabras"
                   style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; box-sizing:border-box;">
          </div>
          <div>
            <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Descripción *</label>
            <textarea [(ngModel)]="form.descripcion" rows="4" placeholder="Cuéntanos qué pasó con el mayor detalle posible..."
                      style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; resize:vertical; box-sizing:border-box;"></textarea>
          </div>
          <button (click)="enviar()" [disabled]="!formValido()"
                  style="padding:12px; background:#2C7350; color:#fff; border:none; border-radius:8px; font-size:0.9rem; font-weight:700; cursor:pointer;"
                  [style.opacity]="!formValido() ? '0.5' : '1'">
            Enviar caso
          </button>
        </div>
      } @else {
        <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border-left:4px solid #FFCD00; margin-top:20px;">
          <p style="font-size:2rem; margin:0 0 12px;">✅</p>
          <p style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.1rem; font-weight:700; margin:0 0 6px;">
            Caso creado: {{ nuevoId }}
          </p>
          <p style="color:#57685c; font-size:0.9rem; margin:0 0 20px;">Nuestro equipo de soporte lo revisará pronto. Puedes seguir su estado en "Mis casos".</p>
          <a routerLink="/marketplace/comprador/mis-casos"
             style="display:inline-flex; align-items:center; gap:8px; background:#295440; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
            Ver mis casos
          </a>
        </div>
      }
    </div>
  `,
})
export class AyudaNuevoCompradorComponent {
  categorias = CATEGORIAS_CASO;
  misPedidos = PEDIDOS.filter(p => p.comprador === COMPRADOR_ACTUAL);

  form = { categoria: '', pedido: '', asunto: '', descripcion: '' };
  enviado = signal(false);
  nuevoId = '';

  formValido(): boolean {
    return !!(this.form.categoria && this.form.asunto.trim() && this.form.descripcion.trim());
  }

  enviar() {
    if (!this.formValido()) return;
    const id = `CASO-2026-${String(CASOS.length + 15).padStart(3, '0')}`;
    CASOS.unshift({
      id, asunto: this.form.asunto.trim(), categoria: this.form.categoria,
      rolSolicitante: 'comprador', solicitante: COMPRADOR_ACTUAL, estado: 'Abierto', prioridad: 'Media',
      fechaCreacion: 'Hoy', pedidoRelacionado: this.form.pedido || undefined,
      mensajes: [{ autor: COMPRADOR_ACTUAL, rol: 'comprador', texto: this.form.descripcion.trim(), fecha: 'Ahora' }],
    });
    this.nuevoId = id;
    this.enviado.set(true);
  }
}
