import { Pipe, PipeTransform, inject } from '@angular/core';
import { TimezoneService } from '../services/timezone.service';

/**
 * Pipe reutilizable para mostrar fechas en la zona horaria del usuario.
 * Uso: {{ pedido.fecha | mktDate }}
 *
 * Si se provee una zona IANA (ej. 'America/New_York') como argumento,
 * usa esa; si no, cae a la preferencia del perfil y luego a la del navegador.
 */
@Pipe({
  name: 'mktDate',
  standalone: true,
})
export class MktDatePipe implements PipeTransform {
  private tz = inject(TimezoneService);

  transform(value: string | Date | null | undefined, zona?: string): string {
    if (!value) return '—';
    return this.tz.formatLocal(value, zona);
  }
}
