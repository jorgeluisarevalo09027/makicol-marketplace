import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AUDITOR_ACTUAL } from '../../data/marketplace-data';

@Component({
  selector: 'app-auditor-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    .au-nav-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      color: #1F2A44;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }
    .au-nav-link:hover {
      background: #E9EDF7;
    }
    .au-nav-link.active {
      background: #003893;
      color: #fff;
    }
    .au-nav-links {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-wrap: wrap;
    }
  `],
  template: `
    <header style="background:#fff; position:sticky; top:0; z-index:50; box-shadow:0 1px 3px rgba(0,0,0,0.08);">

      <div style="background:#1F2A44;">
        <div style="max-width:1200px; margin:0 auto; padding:6px 1rem; display:flex; align-items:center; justify-content:space-between; gap:12px; font-size:0.78rem; color:#fff; flex-wrap:wrap;">
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <span style="font-size:16px;">📊</span>
            Informes y analítica estratégica
          </span>
          <a routerLink="/marketplace" style="color:#C8D2EA; text-decoration:none; font-weight:600;">
            ← Salir a selección de flujo
          </a>
        </div>
      </div>

      <div style="height:3px; background:linear-gradient(90deg,#FFCD00,#003893,#C8102E);"></div>

      <div style="max-width:1200px; margin:0 auto; padding:12px 1rem; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">

        <a routerLink="/marketplace/auditor/resumen" style="display:flex; align-items:center; gap:8px; text-decoration:none; flex-shrink:0;">
          <span class="sr-only">Makicol Marketplace — Auditoría</span>
          <img src="/assets/makicol-logo-header.svg" alt="Makicol Marketplace" style="height:32px; width:auto; object-fit:contain;">
        </a>

        <nav class="au-nav-links">
          <a routerLink="/marketplace/auditor/resumen" class="au-nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Resumen</a>
          <a routerLink="/marketplace/auditor/ventas" class="au-nav-link" routerLinkActive="active">Ventas</a>
          <a routerLink="/marketplace/auditor/artesanos" class="au-nav-link" routerLinkActive="active">Artesanos</a>
          <a routerLink="/marketplace/auditor/compradores" class="au-nav-link" routerLinkActive="active">Compradores</a>
          <a routerLink="/marketplace/auditor/soporte" class="au-nav-link" routerLinkActive="active">Soporte</a>
        </nav>

        <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
          <span style="width:30px; height:30px; border-radius:50%; background:#003893; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:700;">
            {{ auditor.nombre.charAt(0) }}
          </span>
          <span style="font-size:0.8rem; color:#1F2A44; font-weight:600;">{{ auditor.nombre }}</span>
        </div>

      </div>
    </header>
  `,
})
export class AuditorNavbarComponent {
  auditor = AUDITOR_ACTUAL;
}
