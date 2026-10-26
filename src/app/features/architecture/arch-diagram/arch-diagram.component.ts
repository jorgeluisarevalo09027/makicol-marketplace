import { Component } from '@angular/core';

interface Note {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-arch-diagram',
  standalone: true,
  template: `
    <div class="glass-card rounded-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-slate-700/50">
        <h3 class="text-white font-bold text-lg">Arquitectura: demo hoy y producción prevista</h3>
        <p class="text-slate-400 text-sm mt-0.5">
          El primer diagrama es lo que existe y se verificó en el código; el segundo es una propuesta sujeta a cambios.
        </p>
      </div>

      <div class="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <figure class="rounded-xl bg-white p-3">
          <figcaption class="text-xs font-bold uppercase tracking-wider mb-2" style="color:#1F2A22">Demo hoy (verificado en código)</figcaption>
          <img src="/assets/arquitectura-demo-hoy.svg" alt="Arquitectura del demo actual" class="w-full h-auto">
        </figure>
        <figure class="rounded-xl bg-white p-3">
          <figcaption class="text-xs font-bold uppercase tracking-wider mb-2" style="color:#1F2A22">Producción prevista (propuesta)</figcaption>
          <img src="/assets/arquitectura-produccion-prevista.svg" alt="Arquitectura prevista para el piloto" class="w-full h-auto">
        </figure>
      </div>

      <div class="px-6 pb-6">
        <div class="rounded-xl border border-slate-700/50 p-4 bg-slate-800/30">
          <h4 class="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Estado de los componentes</h4>
          <div class="flex flex-col gap-2 text-xs text-slate-500">
            @for (note of notes; track note.label) {
              <div class="flex items-center gap-2">
                <span class="text-sm">{{ note.icon }}</span>
                <span>{{ note.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ArchDiagramComponent {
  notes: Note[] = [
    { icon: '✅', label: 'Existe hoy: front Angular, API ASP.NET Core, SQL Server, autenticación propia con JWT.' },
    { icon: '❓', label: 'Sin verificar en ejecución: uso real de Blob Storage y hosting del front.' },
    { icon: '🧭', label: 'Propuesto: proveedor de identidad externo (Auth0) con MFA para soporte y auditor.' },
    { icon: '🧭', label: 'Propuesto: módulo de envíos con Servientrega (sin contrato ni cotización aún).' },
    { icon: '⏳', label: 'Futuro, no ejecutado: pasarela de pago para el modelo con cobro de la plataforma y envíos internacionales.' },
  ];
}
