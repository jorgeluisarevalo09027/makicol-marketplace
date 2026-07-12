import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketplaceNavbarComponent } from './marketplace-navbar.component';

@Component({
  selector: 'app-marketplace-layout',
  standalone: true,
  imports: [RouterOutlet, MarketplaceNavbarComponent],
  template: `
    <div style="min-height:100vh; background:#EDD9A3; display:flex; flex-direction:column;">
      <app-marketplace-navbar/>
      <main style="flex:1;">
        <router-outlet/>
      </main>
      <footer style="background:#003366; padding:32px 24px; text-align:center;">
        <img src="/assets/logo-corazon.png" alt="Caribe Artesanal"
             style="height:52px; margin:0 auto 12px; display:block; opacity:0.85; object-fit:contain;">
        <p style="font-family:'Playfair Display',Georgia,serif; color:rgba(255,255,255,0.92); font-size:1rem; font-weight:700; margin:0 0 4px;">
          Marketplace Caribe Artesanal
        </p>
        <p style="color:rgba(255,255,255,0.55); font-size:0.82rem; margin:3px 0;">
          Artesanos del Caribe · FilSMar 2026 · Unimagdalena · Santa Marta, Colombia
        </p>
        <div style="display:flex; justify-content:center; gap:24px; margin-top:16px;">
          <a href="#" style="color:rgba(255,255,255,0.60); font-size:0.8rem; text-decoration:none;">Términos</a>
          <a href="#" style="color:rgba(255,255,255,0.60); font-size:0.8rem; text-decoration:none;">Privacidad</a>
          <a href="#" style="color:rgba(255,255,255,0.60); font-size:0.8rem; text-decoration:none;">Ayuda</a>
          <a href="#" style="color:rgba(255,255,255,0.60); font-size:0.8rem; text-decoration:none;">Contacto</a>
        </div>
      </footer>
    </div>
  `,
})
export class MarketplaceLayoutComponent {}
