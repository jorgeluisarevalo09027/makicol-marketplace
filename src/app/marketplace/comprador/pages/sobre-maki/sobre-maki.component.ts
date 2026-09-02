import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre-maki',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="max-width:700px; margin:0 auto; padding:80px 16px; text-align:center;">
      <span class="material-symbols-outlined" style="font-size:48px; color:#FFCD00;">volunteer_activism</span>
      <h1 style="font-family:'Playfair Display',serif; color:#295440; font-size:2rem; font-weight:700; margin:16px 0 12px;">
        Sobre Maki
      </h1>
      <p style="color:#57685c; font-size:0.95rem; margin:0 0 28px;">
        Pronto contaremos aquí la misión y el propósito de Makicol Marketplace.
      </p>
      <a routerLink="/marketplace/comprador/catalogo"
         style="display:inline-flex; align-items:center; gap:8px; background:#295440; color:#fff; padding:12px 22px;
                border-radius:8px; text-decoration:none; font-weight:700; font-size:0.9rem;">
        Volver al catálogo
      </a>
    </div>
  `,
})
export class SobreMakiComponent {}
