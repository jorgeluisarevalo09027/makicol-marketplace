import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .promo-imgs img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .promo-img-extra {
      display: block;
    }
    @media (max-width: 640px) {
      .promo-banner-outer {
        min-height: 140px;
      }
      .promo-banner-texto {
        padding: 22px 24px;
      }
      .promo-img-extra {
        display: none;
      }
    }
  `],
  template: `
    <div class="promo-banner-outer"
         style="display:flex; border-radius:14px; overflow:hidden; box-shadow:0 4px 18px rgba(41,84,64,0.12);
                min-height:180px; margin-bottom:48px; flex-wrap:wrap;">

      <!-- Texto + CTA -->
      <div class="promo-banner-texto" [style.background]="color()"
           style="flex:1 1 280px; min-width:240px; padding:28px 32px; display:flex; flex-direction:column; justify-content:center;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#fff; font-size:1.4rem; font-weight:800; margin:0 0 10px; line-height:1.25;">
          {{ titulo() }}
        </h2>
        <p style="color:rgba(255,255,255,0.88); font-size:0.85rem; margin:0 0 18px; line-height:1.5;">
          {{ subtitulo() }}
        </p>
        <a [routerLink]="ctaRuta()"
           style="display:inline-flex; align-items:center; gap:8px; background:#FFCD00; color:#295440; padding:10px 18px;
                  border-radius:8px; text-decoration:none; font-weight:800; font-size:0.85rem; align-self:flex-start;">
          {{ ctaTexto() }} <span>→</span>
        </a>
      </div>

      <!-- Imágenes -->
      <div class="promo-imgs" style="flex:2 1 400px; display:flex; min-width:240px;">
        @for (img of imagenes(); track img; let i = $index) {
          <div [class.promo-img-extra]="i >= 2" style="flex:1; min-width:0;">
            <img [src]="img" alt="">
          </div>
        }
      </div>

    </div>
  `,
})
export class PromoBannerComponent {
  titulo    = input.required<string>();
  subtitulo = input.required<string>();
  ctaTexto  = input('Descubrir más');
  ctaRuta   = input('/marketplace/comprador/buscar');
  color     = input('#2C7350');
  imagenes  = input.required<string[]>();
}
