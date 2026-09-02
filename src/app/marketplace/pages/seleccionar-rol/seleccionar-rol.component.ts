import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seleccionar-rol',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .rol-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;
    }
    .rol-card {
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .rol-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(41,84,64,0.18);
    }
    @media (max-width: 620px) {
      .rol-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  template: `
    <div style="min-height:100vh; background:#FDFBF3; display:flex; flex-direction:column;">
      <div style="flex:1; display:flex; align-items:center; padding:48px 16px;">
        <div style="max-width:1120px; margin:0 auto; width:100%;">

          <div style="text-align:center; margin-bottom:40px;">
            <span class="sr-only">Makicol Marketplace</span>
            <img src="/assets/makicol-logo-header.svg" alt="Makicol Marketplace"
                 style="height:44px; margin:0 auto 20px; display:block; object-fit:contain;">
            <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.9rem; font-weight:900; margin:0 0 10px;">
              ¿Cómo quieres entrar a Makicol?
            </h1>
            <p style="color:#57685c; font-size:0.95rem; margin:0;">
              Esta es una propuesta visual — elige el flujo que quieres explorar.
            </p>
          </div>

          <div class="rol-grid">

            <!-- Comprador -->
            <a routerLink="/marketplace/comprador/catalogo" class="rol-card"
               style="display:block; background:#fff; border-left:4px solid #FFCD00; border-radius:14px;
                      padding:32px 28px; text-decoration:none; box-shadow:0 2px 16px rgba(41,84,64,0.10);">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:56px; height:56px;
                           border-radius:50%; background:#E3EBE7; font-size:1.6rem; margin-bottom:16px;">
                🛍️
              </span>
              <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.25rem; font-weight:800; margin:0 0 8px;">
                Soy comprador
              </h2>
              <p style="color:#57685c; font-size:0.88rem; line-height:1.5; margin:0 0 16px;">
                Explora el catálogo, descubre artesanos, compra piezas y da seguimiento a tus pedidos.
              </p>
              <span style="color:#295440; font-size:0.85rem; font-weight:700;">
                Entrar como comprador →
              </span>
            </a>

            <!-- Artesano -->
            <a routerLink="/marketplace/artesano/panel" class="rol-card"
               style="display:block; background:#fff; border-left:4px solid #2C7350; border-radius:14px;
                      padding:32px 28px; text-decoration:none; box-shadow:0 2px 16px rgba(41,84,64,0.10);">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:56px; height:56px;
                           border-radius:50%; background:#E3EBE7; font-size:1.6rem; margin-bottom:16px;">
                🧶
              </span>
              <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.25rem; font-weight:800; margin:0 0 8px;">
                Soy artesano
              </h2>
              <p style="color:#57685c; font-size:0.88rem; line-height:1.5; margin:0 0 16px;">
                Gestiona tu panel de ventas, publica tus productos y revisa tu reputación.
              </p>
              <span style="color:#295440; font-size:0.85rem; font-weight:700;">
                Entrar como artesano →
              </span>
              <span style="display:block; margin-top:10px;">
                <a routerLink="/marketplace/artesano/registro" (click)="$event.stopPropagation()"
                   style="color:#8a6040; font-size:0.78rem; font-weight:600; text-decoration:underline;">
                  Aún no vendo, quiero registrarme
                </a>
              </span>
            </a>

            <!-- Soporte -->
            <a routerLink="/marketplace/soporte/panel" class="rol-card"
               style="display:block; background:#fff; border-left:4px solid #57685c; border-radius:14px;
                      padding:32px 28px; text-decoration:none; box-shadow:0 2px 16px rgba(41,84,64,0.10);">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:56px; height:56px;
                           border-radius:50%; background:#E3EBE7; font-size:1.6rem; margin-bottom:16px;">
                🎧
              </span>
              <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.25rem; font-weight:800; margin:0 0 8px;">
                Soy del equipo de soporte
              </h2>
              <p style="color:#57685c; font-size:0.88rem; line-height:1.5; margin:0 0 16px;">
                Atiende casos de compradores y artesanos, y revisa las métricas de atención al cliente.
              </p>
              <span style="color:#295440; font-size:0.85rem; font-weight:700;">
                Entrar como soporte →
              </span>
            </a>

            <!-- Auditor -->
            <a routerLink="/marketplace/auditor/resumen" class="rol-card"
               style="display:block; background:#fff; border-left:4px solid #003893; border-radius:14px;
                      padding:32px 28px; text-decoration:none; box-shadow:0 2px 16px rgba(41,84,64,0.10);">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:56px; height:56px;
                           border-radius:50%; background:#E3EBE7; font-size:1.6rem; margin-bottom:16px;">
                📊
              </span>
              <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-size:1.25rem; font-weight:800; margin:0 0 8px;">
                Soy auditor / equipo directivo
              </h2>
              <p style="color:#57685c; font-size:0.88rem; line-height:1.5; margin:0 0 16px;">
                Consulta informes de ventas, desempeño de artesanos, compradores y soporte para decisiones estratégicas.
              </p>
              <span style="color:#295440; font-size:0.85rem; font-weight:700;">
                Entrar como auditor →
              </span>
            </a>

          </div>
        </div>
      </div>

      <footer style="text-align:center; padding:20px; color:#8a6040; font-size:0.78rem;">
        Propuesta visual Makicol · Próximamente más flujos de usuario
        ·
        <a routerLink="/propuesta" style="color:#295440; font-weight:700; text-decoration:underline;">
          Ver propuesta ejecutiva
        </a>
      </footer>
    </div>
  `,
})
export class SeleccionarRolComponent {}
