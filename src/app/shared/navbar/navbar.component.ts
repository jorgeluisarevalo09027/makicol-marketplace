import { Component, HostListener, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
         [class]="navClasses()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo -->
          <div class="flex items-center gap-3">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol"
                 class="w-9 h-9 flex-shrink-0" style="object-fit:contain;">
            <div class="leading-none">
              <span class="font-bold text-sm tracking-tight" style="font-family:'Plus Jakarta Sans',sans-serif; color:#fff;">Makicol</span>
              <span class="font-normal text-sm" style="font-family:'Plus Jakarta Sans',sans-serif; color: #FFCD00;"> Marketplace</span>
              <p class="text-slate-400 text-[10px] font-medium tracking-widest uppercase">Propuesta Ejecutiva</p>
            </div>
          </div>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-1">
            @for (link of navLinks; track link.href) {
              <button
                class="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 text-sm font-medium transition-all duration-200 flex items-center gap-2"
                (click)="scrollTo(link.href)">
                <span>{{ link.icon }}</span>
                {{ link.label }}
              </button>
            }
          </div>

          <!-- Badge -->
          <div class="hidden md:flex items-center gap-2">
            <span class="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                  style="background: rgba(255,255,255,0.15); border: 1px solid rgba(218,175,55,0.60); color: #FFCD00;">
              Makicol · 2026
            </span>
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors" (click)="toggleMenu()">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              @if (menuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        @if (menuOpen()) {
          <div class="md:hidden border-t border-slate-700/50 py-3 space-y-1 animate-fade-in">
            @for (link of navLinks; track link.href) {
              <button
                class="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 text-sm font-medium transition-all duration-200 flex items-center gap-3"
                (click)="scrollTo(link.href)">
                <span class="text-base">{{ link.icon }}</span>
                {{ link.label }}
              </button>
            }
          </div>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);

  scrolled = signal(false);
  menuOpen = signal(false);

  navLinks = [
    { href: 'hero', label: 'Inicio', icon: '🏠' },
    { href: 'financiero', label: 'Módulo Financiero', icon: '💰' },
    { href: 'tecnico', label: 'Análisis Técnico', icon: '⚡' },
    { href: 'arquitectura', label: 'Arquitectura', icon: '🏗️' },
  ];

  navClasses = computed(() =>
    this.scrolled() ? 'nav-scrolled' : 'bg-transparent'
  );

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 30);
    }
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.menuOpen.set(false);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
