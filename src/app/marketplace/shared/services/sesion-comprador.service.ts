import { Injectable, signal } from '@angular/core';

/**
 * Estado de sesión simulado del comprador (sin autenticación real), compartido entre
 * la navbar y cualquier componente que necesite saber si el comprador "inició sesión"
 * — por ejemplo, para activar la lista de favoritos solo cuando hay sesión.
 */
@Injectable({ providedIn: 'root' })
export class SesionCompradorService {
  sesionIniciada = signal(false);

  iniciarSesion() {
    this.sesionIniciada.set(true);
  }

  cerrarSesion() {
    this.sesionIniciada.set(false);
  }
}
