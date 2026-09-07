import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-16">

      <!-- Background layers — warm artisanal dark -->
      <div class="absolute inset-0" style="background: linear-gradient(135deg, #0d1a17 0%, #111e1b 50%, #0d1a17 100%);"></div>

      <!-- Arena texture overlay — sutil calidez artesanal -->
      <div class="absolute inset-0 opacity-[0.03]"
           style="background-image: url('/assets/fondo-arena.png'); background-size: 220px 220px;">
      </div>

      <!-- Artisanal warm glow overlay -->
      <div class="absolute inset-0 opacity-40"
           style="background-image: radial-gradient(circle at 18% 50%, rgba(46,204,113,0.18) 0%, transparent 50%), radial-gradient(circle at 82% 18%, rgba(218,175,55,0.14) 0%, transparent 50%), radial-gradient(circle at 55% 85%, rgba(41,84,64,0.10) 0%, transparent 40%);">
      </div>

      <!-- Artisanal geometric grid — warm tone -->
      <div class="absolute inset-0 opacity-[0.035]"
           style="background-image: linear-gradient(rgba(218,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,204,113,1) 1px, transparent 1px); background-size: 48px 48px;">
      </div>

      <!-- Floating orbs — artesanal palette -->
      <div class="absolute top-1/4 left-1/6 w-96 h-96 rounded-full opacity-12 animate-pulse-slow"
           style="background: radial-gradient(circle, #2ECC71, transparent); filter: blur(70px);">
      </div>
      <div class="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full opacity-10 animate-pulse-slow"
           style="background: radial-gradient(circle, #FFCD00, transparent); filter: blur(65px); animation-delay: 1.5s;">
      </div>
      <div class="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-6 animate-pulse-slow"
           style="background: radial-gradient(circle, #295440, transparent); filter: blur(80px); animation-delay: 3s;">
      </div>

      <!-- Wayúu corner decoration — patrón geométrico artesanal (top-left) -->
      <img src="/assets/decoracion-esquina.png"
           alt=""
           aria-hidden="true"
           class="absolute top-0 left-0 w-52 sm:w-72 pointer-events-none select-none animate-float-deco"
           style="opacity: 0.22; filter: saturate(1.6) brightness(0.85); transform-origin: top left;">

      <!-- Artisan products image — right side, desktop only -->
      <div class="absolute right-0 bottom-0 hidden xl:block pointer-events-none select-none"
           style="width: 380px; opacity: 0.14; filter: saturate(1.4) brightness(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.8));">
        <img src="/assets/artesanias.png" alt="" aria-hidden="true" class="w-full">
      </div>

      <!-- Main content -->
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <!-- Status badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/25 mb-8 animate-fade-in">
          <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-sky-300 text-sm font-medium">Propuesta Ejecutiva — Makicol Marketplace</span>
        </div>

        <!-- Main title -->
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in" style="animation-delay: 0.1s;">
          Marketplace Digital
          <span class="gradient-text block">Makicol</span>
          <span class="text-slate-300 text-3xl sm:text-4xl lg:text-5xl font-bold">Artesanías de Colombia</span>
        </h1>

        <!-- Lema de marca -->
        <p class="text-3xl sm:text-4xl lg:text-5xl mb-6 animate-fade-in"
           style="animation-delay: 0.15s; line-height:1.2; color:#FDFBF3; font-family:'Plus Jakarta Sans',sans-serif; font-weight:400;">
          Hecho a mano, hecho en Colombia
        </p>

        <!-- Subtitle -->
        <p class="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in" style="animation-delay: 0.2s;">
          Propuesta técnica y financiera para una plataforma de comercio electrónico multicategoría que conecta
          artesanos y emprendedores de todo Colombia con compradores en todo el país,
          con <span class="text-sky-400 font-semibold">pagos online, catálogo digital y videos cortos</span> tipo reels.
        </p>

        <!-- Metric cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 animate-fade-in" style="animation-delay: 0.3s;">
          @for (metric of metrics; track metric.label) {
            <div class="glass-card rounded-2xl p-5 hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1">
              <div class="text-3xl mb-2">{{ metric.icon }}</div>
              <div class="text-2xl font-bold mb-1" style="color:#1F2A22">{{ metric.value }}</div>
              <div class="text-xs font-medium uppercase tracking-wide" style="color:#57685c">{{ metric.label }}</div>
            </div>
          }
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style="animation-delay: 0.4s;">
          <button
            class="px-8 py-4 rounded-xl bg-sky-400 hover:bg-sky-500 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-sky-400/30 hover:shadow-sky-500/40 hover:-translate-y-0.5 flex items-center gap-2"
            (click)="scrollTo('financiero')">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            Ver Análisis Completo
          </button>
          <button
            class="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            style="background:rgba(255,251,242,0.18); border:1px solid rgba(218,175,55,0.50); color:#f5ecda;"
            (click)="scrollTo('arquitectura')">
            Ver Arquitectura
          </button>
        </div>

        <!-- Botón puente al Marketplace prototipo -->
        <div class="animate-fade-in" style="animation-delay:0.5s;">
          <a routerLink="/marketplace"
             class="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
             style="background:linear-gradient(135deg,#FFCD00,#C8102E); color:#fff; box-shadow:0 4px 24px rgba(218,175,55,0.40); text-decoration:none;">
            <span style="font-size:1.2rem;">🛒</span>
            Ver Prototipo del Marketplace
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <p style="color:rgba(255,255,255,0.45); font-size:0.75rem; margin-top:8px; text-align:center;">
            Catálogo · Pagos · Pedidos · Registro · Búsqueda
          </p>
        </div>

        <!-- Botón puente al informe de envíos internacionales -->
        <div class="animate-fade-in" style="animation-delay:0.55s; margin-top:14px; display:flex; flex-direction:column; align-items:center; gap:8px;">
          <a routerLink="/envios-internacionales"
             style="display:inline-flex; align-items:center; gap:8px; color:#a8b8ae; font-size:0.85rem; font-weight:600; text-decoration:underline;">
            🌎 Ver investigación: Envíos internacionales (piloto Zona Caribe)
          </a>
          <a routerLink="/evaluacion-backoffice"
             style="display:inline-flex; align-items:center; gap:8px; color:#a8b8ae; font-size:0.85rem; font-weight:600; text-decoration:underline;">
            🏛️ Ver evaluación: Storefront vs. Back-office
          </a>
          <a routerLink="/base-de-datos"
             style="display:inline-flex; align-items:center; gap:8px; color:#a8b8ae; font-size:0.85rem; font-weight:600; text-decoration:underline;">
            🗄️ Ver diseño de base de datos (trabajo en progreso)
          </a>
        </div>

        <!-- Module navigation pills -->
        <div class="flex flex-wrap justify-center gap-3 animate-fade-in" style="animation-delay: 0.5s;">
          @for (module of modules; track module.name) {
            <button
              class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              [style.background]="module.bg"
              [style.color]="module.color"
              [style.border]="'1px solid ' + module.border"
              (click)="scrollTo(module.id)">
              {{ module.icon }}
              {{ module.name }}
            </button>
          }
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
        <span class="text-slate-500 text-xs uppercase tracking-widest">Explorar</span>
        <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  `
})
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);

  metrics = [
    { icon: '🎨', value: '500+', label: 'Productores artesanales' },
    { icon: '👥', value: '50,000', label: 'Visitantes proyectados al año' },
    { icon: '📈', value: '3 Fases', label: 'Plan de escalabilidad' },
  ];

  modules = [
    { id: 'financiero', name: 'Modelo Financiero', icon: '💰', bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
    { id: 'tecnico', name: 'PWA Marketplace', icon: '⚡', bg: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
    { id: 'arquitectura', name: 'Arquitectura Cloud', icon: '🏗️', bg: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: 'rgba(245,158,11,0.3)' },
  ];

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
