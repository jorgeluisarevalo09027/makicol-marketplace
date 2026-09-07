import { Injectable, signal } from '@angular/core';

/**
 * Lista de favoritos/deseos del comprador (simulada en memoria, sin backend real).
 * Se pre-carga con un par de productos de ejemplo para que la demo tenga contenido.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private favoritos = signal<Set<number>>(new Set([1, 7]));

  ids = this.favoritos.asReadonly();

  esFavorito(productoId: number): boolean {
    return this.favoritos().has(productoId);
  }

  toggle(productoId: number) {
    this.favoritos.update(set => {
      const next = new Set(set);
      next.has(productoId) ? next.delete(productoId) : next.add(productoId);
      return next;
    });
  }
}
