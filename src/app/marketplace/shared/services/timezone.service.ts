import { Injectable, signal } from '@angular/core';

/**
 * Estrategia de zonas horarias para Makicol en despliegue multi-región.
 *
 * Regla de oro:
 * - Backend / BD: todo se guarda en datetimeoffset (o UTC con offset) — el instante es canónico.
 * - Frontend: recibe ISO 8601 y decide si muestra en la zona del navegador o
 *   en la zona del perfil del usuario (IANA).
 */
@Injectable({ providedIn: 'root' })
export class TimezoneService {
  /** Zona horaria preferida del usuario logueado (IANA, ej. 'America/New_York').
   *  null => usar la zona del navegador por defecto. */
  preferencia = signal<string | null>(null);

  /**
   * Formatea un instante ISO 8601 a texto local legible.
   * Si no se pasa zona, cae a preferencia del usuario y, si no, a la del navegador.
   */
  formatLocal(iso: string | Date, zona?: string): string {
    const d = typeof iso === 'string' ? new Date(iso) : iso;
    const tz = zona ?? this.preferencia() ?? undefined;
    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: tz as any,
    }).format(d);
  }

  /** Convierte un input de fecha-hora local del usuario a un string ISO 8601 UTC
   *  listo para enviar al backend, usando su zona IANA. */
  toUTC(fechaLocal: string, zona: string = this.preferencia() ?? 'UTC'): string {
    const d = new Date(fechaLocal);
    return new Date(d.toLocaleString('en-US', { timeZone: zona })).toISOString();
  }
}
