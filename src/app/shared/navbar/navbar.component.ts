import { Component, HostListener, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Navbar del recorrido. Navegación por narrativa (no por módulo técnico).
 * Estilo artesanal cálido: surface claro siempre, sombra al hacer scroll.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" [class]="navClasses()">
      <div style="max-width:1100px; margin:0 auto; padding:0 1.25rem;">
        <div class="flex items-center justify-between" style="height:4rem;">

          <!-- Logo -->
          <button class="flex items-center gap-3" (click)="scrollTo('hero')" style="background:none; border:none; cursor:pointer;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:2.1rem; height:2.1rem; object-fit:contain;">
            <span class="leading-none" style="text-align:left;">
              <span style="font-family:var(--font-brand); font-weight:800; color:var(--mk-green-deep); font-size:0.95rem;">Makicol</span>
              <span style="font-family:var(--font-brand); font-weight:400; color:var(--mk-green); font-size:0.95rem;"> Marketplace</span>
              <span style="display:block; color:var(--mk-ink-faint); font-size:0.6rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase;">Propuesta ejecutiva</span>
            </span>
          </button>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center" style="gap:0.25rem;">
            @for (link of navLinks; track link.href) {
              <button class="mk-navlink" (click)="scrollTo(link.href)">{{ link.label }}</button>
            }
          </div>

          <!-- Badge -->
          <span class="hidden md:inline-flex mk-badge mk-badge--today" style="font-size:0.7rem;">Makicol · 2026</span>

          <!-- Mobile toggle -->
          <button class="md:hidden" (click)="toggleMenu()" style="background:none; border:none; cursor:pointer; padding:0.5rem; color:var(--mk-ink);">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              @if (menuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        @if (menuOpen()) {
          <div class="md:hidden animate-fade-in" style="border-top:1px solid var(--mk-sand); padding:0.75rem 0; display:flex; flex-direction:column; gap:0.25rem;">
            @for (link of navLinks; track link.href) {
              <button class="mk-navlink" style="text-align:left; width:100%;" (click)="scrollTo(link.href)">{{ link.label }}</button>
            }
          </div>
        }
      </div>
    </nav>
  `,
  styles: [`
    .mk-navlink {
      padding: 0.5rem 0.9rem; border-radius: 0.6rem; border: none; background: none;
      color: var(--mk-ink-soft); font-size: 0.85rem; font-weight: 600; cursor: pointer;
      font-family: var(--font-body); transition: color 0.2s, background 0.2s;
    }
    .mk-navlink:hover { color: var(--mk-green-deep); background: var(--mk-green-tint); }
  `]
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);

  scrolled = signal(false);
  menuOpen = signal(false);

  // Navegación por narrativa (coincide con los id de sección del recorrido).
  navLinks = [
    { href: 'mercado', label: 'Mercado' },
    { href: 'equipo', label: 'Equipo' },
    { href: 'producto', label: 'Producto' },
    { href: 'modelo', label: 'Modelo' },
    { href: 'plan', label: 'Plan' },
    { href: 'detalles', label: 'Detalles' },
  ];

  navClasses = computed(() => this.scrolled() ? 'nav-scrolled' : 'mk-bg-paper');

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) this.scrolled.set(window.scrollY > 30);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.menuOpen.set(false);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
