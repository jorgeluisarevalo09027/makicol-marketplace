import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuditorNavbarComponent } from './auditor-navbar.component';

@Component({
  selector: 'app-auditor-layout',
  standalone: true,
  imports: [RouterOutlet, AuditorNavbarComponent],
  template: `
    <div style="min-height:100vh; background:#F4F6FB; display:flex; flex-direction:column;">
      <app-auditor-navbar/>
      <main style="flex:1;">
        <router-outlet/>
      </main>
      <footer style="background:#fff; padding:18px 24px; text-align:center; border-top:1px solid #E1E6F0;">
        <p style="color:#5A6B8C; font-size:0.78rem; margin:0;">
          Makicol · Informes y analítica estratégica — uso interno del equipo directivo
        </p>
      </footer>
    </div>
  `,
})
export class AuditorLayoutComponent {}
