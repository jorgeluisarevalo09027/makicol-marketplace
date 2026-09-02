import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQ_ARTESANO } from '../../../data/marketplace-data';

@Component({
  selector: 'app-ayuda-artesano',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="max-width:760px; margin:0 auto; padding:32px 16px 48px;">

      <div style="text-align:center; margin-bottom:28px;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.6rem; font-weight:900; margin:0 0 8px;">
          Centro de ayuda para artesanos
        </h1>
        <p style="color:#57685c; font-size:0.9rem; margin:0;">
          Resuelve dudas sobre ventas, pagos y disputas, o abre un caso con soporte.
        </p>
      </div>

      <div style="display:flex; gap:12px; margin-bottom:28px; flex-wrap:wrap;">
        <a routerLink="/marketplace/artesano/ayuda/nuevo"
           style="flex:1; min-width:200px; display:flex; align-items:center; gap:10px; padding:16px; background:#2C7350; color:#fff; border-radius:12px; text-decoration:none;">
          <span style="font-size:1.4rem;">📝</span>
          <span>
            <span style="display:block; font-weight:700; font-size:0.9rem;">Crear un caso</span>
            <span style="display:block; font-size:0.78rem; opacity:0.85;">Reporta un problema de venta o pago</span>
          </span>
        </a>
        <a routerLink="/marketplace/artesano/mis-casos"
           style="flex:1; min-width:200px; display:flex; align-items:center; gap:10px; padding:16px; background:#fff; border:1.5px solid #C6D7CD; color:#295440; border-radius:12px; text-decoration:none;">
          <span style="font-size:1.4rem;">📂</span>
          <span>
            <span style="display:block; font-weight:700; font-size:0.9rem;">Mis casos</span>
            <span style="display:block; font-size:0.78rem; color:#57685c;">Revisa el estado de tus solicitudes</span>
          </span>
        </a>
      </div>

      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.05rem; font-weight:700; margin:0 0 12px;">
        Preguntas frecuentes
      </h2>
      <div style="display:flex; flex-direction:column; gap:8px;">
        @for (f of faq; track f.pregunta; let i = $index) {
          <div style="background:#fff; border:1.5px solid #EFE9DD; border-radius:10px; overflow:hidden;">
            <button (click)="toggle(i)"
                    style="width:100%; text-align:left; padding:14px 16px; background:transparent; border:none; cursor:pointer;
                           display:flex; align-items:center; justify-content:space-between; gap:10px;">
              <span style="font-weight:700; color:#1F2A22; font-size:0.88rem;">{{ f.pregunta }}</span>
              <span style="color:#295440; font-size:1rem;">{{ abierto() === i ? '−' : '+' }}</span>
            </button>
            @if (abierto() === i) {
              <p style="padding:0 16px 14px; color:#57685c; font-size:0.85rem; line-height:1.5; margin:0;">{{ f.respuesta }}</p>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class AyudaArtesanoComponent {
  faq = FAQ_ARTESANO;
  abierto = signal<number | null>(0);

  toggle(i: number) {
    this.abierto.update(a => a === i ? null : i);
  }
}
