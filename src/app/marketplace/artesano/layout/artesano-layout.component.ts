import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArtesanoNavbarComponent } from './artesano-navbar.component';

@Component({
  selector: 'app-artesano-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ArtesanoNavbarComponent],
  template: `
    <div style="min-height:100vh; background:#FDFBF3; display:flex; flex-direction:column;">
      <app-artesano-navbar/>
      <main style="flex:1;">
        <router-outlet/>
      </main>
      <footer style="background:#fff; padding:36px 24px 28px; text-align:center; border-top:3px solid #2C7350;">
        <span class="sr-only">Makicol Marketplace</span>
        <img src="/assets/makicol-logo-header.svg" alt="Makicol Marketplace"
             style="height:44px; margin:0 auto 14px; display:block; object-fit:contain;">
        <p style="color:#57685c; font-size:0.85rem; margin:3px 0;">
          Panel de vendedores · Vende tus artesanías en todo el país
        </p>
        <div style="display:flex; justify-content:center; gap:24px; margin-top:16px;">
          <a routerLink="/marketplace/comprador/terminos" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Términos</a>
          <a href="#" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Privacidad</a>
          <a routerLink="/marketplace/artesano/ayuda" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Ayuda</a>
          <a href="#" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Contacto</a>
        </div>
      </footer>
    </div>
  `,
})
export class ArtesanoLayoutComponent {}
