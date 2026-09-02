import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASOS, CATEGORIAS_CASO, type EstadoCaso, type PrioridadCaso, type RolSolicitante } from '../../../data/marketplace-data';

@Component({
  selector: 'app-casos',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .cs-filtros {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .cs-select {
      padding: 8px 10px;
      border: 1px solid #E1E4E8;
      border-radius: 8px;
      font-size: 0.82rem;
      color: #3A4148;
      background: #fff;
    }
    .cs-table-wrap { overflow-x: auto; }
  `],
  template: `
    <div style="max-width:1200px; margin:0 auto; padding:28px 16px 48px;">

      <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.4rem; font-weight:900; margin:0 0 18px;">
        Bandeja de casos
      </h1>

      <div class="cs-filtros">
        <select class="cs-select" [value]="filtroRol()" (change)="filtroRol.set($any($event.target).value)">
          <option value="">Todos los roles</option>
          <option value="comprador">Compradores</option>
          <option value="artesano">Artesanos</option>
        </select>
        <select class="cs-select" [value]="filtroEstado()" (change)="filtroEstado.set($any($event.target).value)">
          <option value="">Todos los estados</option>
          <option>Abierto</option>
          <option>En proceso</option>
          <option>Resuelto</option>
          <option>Cerrado</option>
        </select>
        <select class="cs-select" [value]="filtroPrioridad()" (change)="filtroPrioridad.set($any($event.target).value)">
          <option value="">Toda prioridad</option>
          <option>Alta</option>
          <option>Media</option>
          <option>Baja</option>
        </select>
        <select class="cs-select" [value]="filtroCategoria()" (change)="filtroCategoria.set($any($event.target).value)">
          <option value="">Toda categoría</option>
          @for (cat of categorias; track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>
        @if (filtroRol() || filtroEstado() || filtroPrioridad() || filtroCategoria()) {
          <button (click)="limpiar()" style="padding:8px 14px; border:1px solid #E1E4E8; border-radius:8px; background:#fff; color:#5A6472; font-size:0.8rem; cursor:pointer;">
            Limpiar filtros
          </button>
        }
      </div>

      <p style="color:#5A6472; font-size:0.82rem; margin:0 0 12px;">{{ resultados().length }} casos encontrados</p>

      <div style="background:#fff; border-radius:12px; border:1px solid #E1E4E8;" class="cs-table-wrap">
        <table style="width:100%; min-width:760px; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="background:#F4F5F6;">
              <th style="padding:12px 16px; text-align:left; font-weight:700; color:#3A4148; font-size:0.75rem; text-transform:uppercase;">Caso</th>
              <th style="padding:12px 16px; text-align:left; font-weight:700; color:#3A4148; font-size:0.75rem; text-transform:uppercase;">Solicitante</th>
              <th style="padding:12px 16px; text-align:left; font-weight:700; color:#3A4148; font-size:0.75rem; text-transform:uppercase;">Categoría</th>
              <th style="padding:12px 16px; text-align:center; font-weight:700; color:#3A4148; font-size:0.75rem; text-transform:uppercase;">Prioridad</th>
              <th style="padding:12px 16px; text-align:center; font-weight:700; color:#3A4148; font-size:0.75rem; text-transform:uppercase;">Estado</th>
              <th style="padding:12px 16px; text-align:right; font-weight:700; color:#3A4148; font-size:0.75rem; text-transform:uppercase;">Fecha</th>
            </tr>
          </thead>
          <tbody>
            @for (c of resultados(); track c.id; let even = $even) {
              <tr [style.background]="even ? '#FAFBFB' : '#fff'" style="cursor:pointer;" [routerLink]="['/marketplace/soporte/casos', c.id]">
                <td style="padding:13px 16px;">
                  <p style="color:#3A4148; font-weight:700; margin:0 0 2px; font-size:0.82rem;">{{ c.id }}</p>
                  <p style="color:#1F2A22; margin:0; font-size:0.82rem;">{{ c.asunto }}</p>
                </td>
                <td style="padding:13px 16px; color:#1F2A22;">
                  {{ c.solicitante }}
                  <span style="display:block; color:#5A6472; font-size:0.72rem;">{{ c.rolSolicitante }}</span>
                </td>
                <td style="padding:13px 16px; color:#3A4148;">{{ c.categoria }}</td>
                <td style="padding:13px 16px; text-align:center;">
                  <span style="padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:700;"
                        [style.background]="prioridadColor(c.prioridad).bg" [style.color]="prioridadColor(c.prioridad).color">
                    {{ c.prioridad }}
                  </span>
                </td>
                <td style="padding:13px 16px; text-align:center;">
                  <span style="padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:700; background:#ECEEF0; color:#3A4148;">
                    {{ c.estado }}
                  </span>
                </td>
                <td style="padding:13px 16px; text-align:right; color:#5A6472; font-size:0.78rem;">{{ c.fechaCreacion }}</td>
              </tr>
            }
            @if (!resultados().length) {
              <tr><td colspan="6" style="padding:32px; text-align:center; color:#5A6472;">No hay casos con esos filtros.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class CasosComponent {
  casos = CASOS;
  categorias = CATEGORIAS_CASO;

  filtroRol = signal<RolSolicitante | ''>('');
  filtroEstado = signal<EstadoCaso | ''>('');
  filtroPrioridad = signal<PrioridadCaso | ''>('');
  filtroCategoria = signal('');

  resultados = computed(() => {
    const rol = this.filtroRol();
    const estado = this.filtroEstado();
    const prioridad = this.filtroPrioridad();
    const categoria = this.filtroCategoria();
    return this.casos.filter(c =>
      (!rol || c.rolSolicitante === rol) &&
      (!estado || c.estado === estado) &&
      (!prioridad || c.prioridad === prioridad) &&
      (!categoria || c.categoria === categoria)
    );
  });

  limpiar() {
    this.filtroRol.set('');
    this.filtroEstado.set('');
    this.filtroPrioridad.set('');
    this.filtroCategoria.set('');
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
