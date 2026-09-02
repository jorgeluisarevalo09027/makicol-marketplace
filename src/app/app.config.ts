import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';

// App 100% client-side (sin SSR/hidratación): esta es una propuesta visual para presentación,
// no necesita renderizado en servidor. Esto evita por completo los problemas de hidratación/
// prerenderizado que causaban contenido duplicado entre rutas.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Precarga en segundo plano los chunks de las demás rutas para que cambiar de flujo
      // sea instantáneo (seguro ahora que no hay SSR de por medio).
      withPreloading(PreloadAllModules),
      // Al navegar a una nueva ruta, siempre empezamos arriba del todo.
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
  ]
};
