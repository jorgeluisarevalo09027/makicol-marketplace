import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MarketplaceNavbarComponent } from './marketplace-navbar.component';

@Component({
  selector: 'app-marketplace-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MarketplaceNavbarComponent],
  template: `
    <div style="min-height:100vh; background:#FDFBF3; display:flex; flex-direction:column;">
      <app-marketplace-navbar/>
      <main style="flex:1;">
        <router-outlet/>
      </main>
      <footer style="background:#fff; padding:36px 24px 28px; text-align:center; border-top:3px solid #DAAF37;">
        <!-- Fondo claro a propósito: el logo real (multicolor) necesita superficie clara para verse fiel al original. -->
        <span class="sr-only">Makicol Marketplace</span>
        <img src="/assets/makicol-logo-header.svg" alt="Makicol Marketplace"
             style="height:44px; margin:0 auto 14px; display:block; object-fit:contain;">
        <p style="color:#57685c; font-size:0.85rem; margin:3px 0;">
          Artesanías y emprendimiento colombiano · Vende y compra en todo el país
        </p>
        <div style="display:flex; justify-content:center; gap:24px; margin-top:16px;">
          <a routerLink="/marketplace/terminos" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Términos</a>
          <a href="#" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Privacidad</a>
          <a href="#" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Ayuda</a>
          <a href="#" style="color:#295440; font-size:0.8rem; text-decoration:none; font-weight:600;">Contacto</a>
        </div>
      </footer>
    </div>
  `,
})
export class MarketplaceLayoutComponent {}
