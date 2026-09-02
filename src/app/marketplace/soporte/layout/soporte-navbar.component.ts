import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AGENTE_ACTUAL } from '../../data/marketplace-data';

@Component({
  selector: 'app-soporte-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    .sop-nav-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      font-size: 0.86rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      color: #3A4148;
      transition: background 0.15s, color 0.15s;
    }
    .sop-nav-link:hover {
      background: #ECEEF0;
    }
    .sop-nav-link.active {
      background: #3A4148;
      color: #fff;
    }
  `],
  template: `
    <header style="background:#fff; border-bottom:1px solid #E1E4E8; position:sticky; top:0; z-index:50;">
      <div style="max-width:1200px; margin:0 auto; padding:12px 1rem; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">

        <div style="display:flex; align-items:center; gap:20px;">
          <a routerLink="/marketplace/soporte/panel" style="display:flex; align-items:center; gap:8px; text-decoration:none;">
            <span style="font-size:1.3rem;">🎧</span>
            <span style="font-family:'Plus Jakarta Sans',sans-serif; color:#3A4148; font-weight:800; font-size:0.95rem;">
              Makicol · Soporte
            </span>
          </a>

          <nav style="display:flex; align-items:center; gap:4px;">
            <a routerLink="/marketplace/soporte/panel" class="sop-nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
              Panel
            </a>
            <a routerLink="/marketplace/soporte/casos" class="sop-nav-link" routerLinkActive="active">
              Casos
            </a>
          </nav>
        </div>

        <div style="display:flex; align-items:center; gap:14px;">
          <a routerLink="/marketplace" style="color:#5A6472; font-size:0.78rem; text-decoration:none; font-weight:600;">
            ← Salir a selección de flujo
          </a>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="width:30px; height:30px; border-radius:50%; background:#3A4148; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:700;">
              {{ agente.nombre.charAt(0) }}
            </span>
            <span style="font-size:0.8rem; color:#3A4148; font-weight:600;">{{ agente.nombre }}</span>
          </div>
        </div>

      </div>
    </header>
  `,
})
export class SoporteNavbarComponent {
  agente = AGENTE_ACTUAL;
}
