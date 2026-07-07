import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-16">

      <!-- Background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div class="absolute inset-0 opacity-30"
           style="background-image: radial-gradient(circle at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(34,197,94,0.08) 0%, transparent 40%);">
      </div>

      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.04]"
           style="background-image: linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px); background-size: 50px 50px;">
      </div>

      <!-- Floating orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse-slow"
           style="background: radial-gradient(circle, #0ea5e9, transparent); filter: blur(60px);">
      </div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 animate-pulse-slow"
           style="background: radial-gradient(circle, #6366f1, transparent); filter: blur(60px); animation-delay: 1.5s;">
      </div>

      <!-- Main content -->
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <!-- Status badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/25 mb-8 animate-fade-in">
          <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span class="text-sky-300 text-sm font-medium">Investigación Técnica — Plataforma Educativa Digital</span>
        </div>

        <!-- Main title -->
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in" style="animation-delay: 0.1s;">
          Propuesta de
          <span class="gradient-text block">Plataforma Cloud</span>
          <span class="text-slate-300 text-3xl sm:text-4xl lg:text-5xl font-bold">sobre Azure</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in" style="animation-delay: 0.2s;">
          Dashboard ejecutivo que presenta la investigación técnica, la arquitectura propuesta
          y el análisis de costos para una plataforma de distribución de
          <span class="text-sky-400 font-semibold">PDFs y Video Educativo</span>.
        </p>

        <!-- Metric cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 animate-fade-in" style="animation-delay: 0.3s;">
          @for (metric of metrics; track metric.label) {
            <div class="glass-card rounded-2xl p-5 hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1">
              <div class="text-3xl mb-2">{{ metric.icon }}</div>
              <div class="text-2xl font-bold text-white mb-1">{{ metric.value }}</div>
              <div class="text-slate-400 text-xs font-medium uppercase tracking-wide">{{ metric.label }}</div>
            </div>
          }
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style="animation-delay: 0.4s;">
          <button
            class="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40 hover:-translate-y-0.5 flex items-center gap-2"
            (click)="scrollTo('financiero')">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            Ver Análisis Completo
          </button>
          <button
            class="px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-base transition-all duration-200 hover:bg-slate-800/50"
            (click)="scrollTo('arquitectura')">
            Ver Arquitectura
          </button>
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
    { icon: '💰', value: '$129/mes', label: 'Costo inicial Azure' },
    { icon: '⚡', value: '3 Módulos', label: 'Análisis técnico' },
    { icon: '📈', value: '3 Fases', label: 'Plan de escalabilidad' },
  ];

  modules = [
    { id: 'financiero', name: 'Módulo Financiero', icon: '💰', bg: 'rgba(16,185,129,0.1)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
    { id: 'tecnico', name: 'PWA vs Nativa', icon: '⚡', bg: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
    { id: 'arquitectura', name: 'Arquitectura Cloud', icon: '🏗️', bg: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: 'rgba(245,158,11,0.3)' },
  ];

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
