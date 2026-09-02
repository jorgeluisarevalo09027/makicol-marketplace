import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SoporteNavbarComponent } from './soporte-navbar.component';

@Component({
  selector: 'app-soporte-layout',
  standalone: true,
  imports: [RouterOutlet, SoporteNavbarComponent],
  template: `
    <div style="min-height:100vh; background:#F4F5F6; display:flex; flex-direction:column;">
      <app-soporte-navbar/>
      <main style="flex:1;">
        <router-outlet/>
      </main>
      <footer style="background:#fff; padding:18px 24px; text-align:center; border-top:1px solid #E1E4E8;">
        <p style="color:#5A6472; font-size:0.78rem; margin:0;">
          Makicol · Herramienta interna de atención al cliente — uso exclusivo del equipo de soporte
        </p>
      </footer>
    </div>
  `,
})
export class SoporteLayoutComponent {}
