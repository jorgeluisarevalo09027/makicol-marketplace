import { Component, signal } from '@angular/core';

interface Layer {
  id: string;
  label: string;
  description: string;
  nodes: Node[];
  color: string;
  bg: string;
  border: string;
}

interface Node {
  icon: string;
  name: string;
  tech: string;
  detail: string;
}

@Component({
  selector: 'app-arch-diagram',
  standalone: true,
  template: `
    <div class="glass-card rounded-2xl overflow-hidden">
      <div class="px-6 py-5 border-b border-slate-700/50">
        <h3 class="text-white font-bold text-lg">Topología de Arquitectura Azure</h3>
        <p class="text-slate-400 text-sm mt-0.5">Haz clic en cada componente para ver detalles</p>
      </div>

      <div class="p-6 space-y-2">
        @for (layer of layers; track layer.id; let last = $last) {
          <!-- Layer -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="h-px flex-1 opacity-30" [style.background]="layer.color"></div>
              <span class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    [style.color]="layer.color"
                    [style.background]="layer.bg"
                    [style.border]="'1px solid ' + layer.border">
                {{ layer.label }}
              </span>
              <div class="h-px flex-1 opacity-30" [style.background]="layer.color"></div>
            </div>
            <p class="text-center text-slate-500 text-xs mb-3">{{ layer.description }}</p>

            <!-- Nodes -->
            <div class="flex flex-wrap justify-center gap-3">
              @for (node of layer.nodes; track node.name) {
                <button
                  class="group relative rounded-xl p-4 min-w-[140px] text-center transition-all duration-200 border hover:-translate-y-1"
                  [class.ring-2]="selectedNode()?.name === node.name"
                  [style.background]="layer.bg"
                  [style.borderColor]="selectedNode()?.name === node.name ? layer.color : layer.border"
                  [style.boxShadow]="selectedNode()?.name === node.name ? '0 0 20px ' + layer.color + '30' : 'none'"
                  (click)="selectNode(node)">
                  <div class="text-3xl mb-2">{{ node.icon }}</div>
                  <div class="text-white text-xs font-bold mb-0.5">{{ node.name }}</div>
                  <div class="text-[10px] font-medium" [style.color]="layer.color">{{ node.tech }}</div>
                </button>
              }
            </div>
          </div>

          <!-- Arrow connector -->
          @if (!last) {
            <div class="flex justify-center py-1">
              <div class="flex flex-col items-center gap-0.5">
                <div class="w-px h-4 bg-slate-600"></div>
                <svg class="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3a1 1 0 011 1v9.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 13.586V4a1 1 0 011-1z"/>
                </svg>
              </div>
            </div>
          }
        }
      </div>

      <!-- Node detail panel -->
      @if (selectedNode()) {
        <div class="mx-6 mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 animate-fade-in">
          <div class="flex items-start gap-3">
            <span class="text-2xl">{{ selectedNode()!.icon }}</span>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <h4 class="text-white font-bold text-sm">{{ selectedNode()!.name }}</h4>
                <span class="text-xs text-sky-400 font-medium">{{ selectedNode()!.tech }}</span>
              </div>
              <p class="text-slate-400 text-xs leading-relaxed">{{ selectedNode()!.detail }}</p>
            </div>
            <button class="text-slate-500 hover:text-white transition-colors" (click)="selectedNode.set(null)">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      }

      <!-- Data flow legend -->
      <div class="px-6 pb-6">
        <div class="rounded-xl border border-slate-700/50 p-4 bg-slate-800/30">
          <h4 class="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Flujo de Datos</h4>
          <div class="flex flex-wrap gap-4 text-xs text-slate-500">
            @for (flow of dataFlows; track flow.label) {
              <div class="flex items-center gap-2">
                <span class="text-sm">{{ flow.icon }}</span>
                <span>{{ flow.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ArchDiagramComponent {
  selectedNode = signal<Node | null>(null);

  selectNode(node: Node) {
    this.selectedNode.set(this.selectedNode()?.name === node.name ? null : node);
  }

  dataFlows = [
    { icon: '🔐', label: 'HTTPS / TLS 1.3 en todo el flujo' },
    { icon: '⚡', label: 'CDN cachea assets estáticos (TTL 30 días)' },
    { icon: '🔄', label: 'API RESTful JSON entre cliente y servidor' },
    { icon: '📦', label: 'Blob Storage sirve PDFs directamente vía SAS tokens' },
  ];

  layers: Layer[] = [
    {
      id: 'client',
      label: 'Capa Cliente',
      description: 'Interfaz de usuario — Ejecuta en el navegador del usuario',
      color: '#38bdf8',
      bg: 'rgba(14,165,233,0.06)',
      border: 'rgba(14,165,233,0.25)',
      nodes: [
        {
          icon: '🅰️', name: 'Angular 21 PWA', tech: 'TypeScript + SSR',
          detail: 'Aplicación Angular 21 con Server-Side Rendering. Incluye Service Worker para caching offline de los PDFs más visitados. Renderiza con Signals y Standalone Components.'
        },
        {
          icon: '📄', name: 'PDF.js Viewer', tech: 'WebAssembly',
          detail: 'Renderizador de PDFs basado en Mozilla PDF.js. Soporta anotaciones, búsqueda de texto, zoom y navegación de páginas. Se ejecuta como WebWorker para no bloquear la UI.'
        },
        {
          icon: '📦', name: 'Service Worker', tech: 'Cache API',
          detail: 'Intercepta peticiones de red y sirve contenido desde caché cuando está offline. Estrategia Cache-First para PDFs y Network-First para datos de la API.'
        }
      ]
    },
    {
      id: 'gateway',
      label: 'Capa de Entrada',
      description: 'Seguridad, enrutamiento y balanceo de carga',
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.06)',
      border: 'rgba(245,158,11,0.25)',
      nodes: [
        {
          icon: '🛡️', name: 'Azure Front Door', tech: 'WAF + CDN',
          detail: 'Punto de entrada único con Web Application Firewall (WAF). Protege contra OWASP Top 10, DDoS y bots. Enruta el tráfico al App Service más cercano y balanceo de carga activo.'
        },
        {
          icon: '🔑', name: 'Azure AD B2C', tech: 'OAuth 2.0 / OIDC',
          detail: 'Gestión de identidad y autenticación de usuarios. Soporta login social (Google, Facebook) y local. Emite JWT tokens con claims de roles y permisos para la API.'
        }
      ]
    },
    {
      id: 'api',
      label: 'Capa API',
      description: 'Lógica de negocio — Azure App Service',
      color: '#a78bfa',
      bg: 'rgba(139,92,246,0.06)',
      border: 'rgba(139,92,246,0.25)',
      nodes: [
        {
          icon: '🔧', name: '.NET 9 Web API', tech: 'C# ASP.NET Core',
          detail: 'API RESTful construida en .NET 9. Implementa CQRS con MediatR, Entity Framework Core para acceso a datos y Minimal APIs para endpoints de alta performance. Documentada con Swagger/OpenAPI.'
        },
        {
          icon: '⚙️', name: 'Azure App Service', tech: 'PaaS — P1v3',
          detail: 'Hosting managed de la API. Auto-scaling horizontal basado en CPU/memoria. Incluye deployment slots para staging y zero-downtime deployments. Integración nativa con Application Insights.'
        }
      ]
    },
    {
      id: 'data',
      label: 'Capa de Datos',
      description: 'Persistencia y almacenamiento de objetos',
      color: '#34d399',
      bg: 'rgba(16,185,129,0.06)',
      border: 'rgba(16,185,129,0.25)',
      nodes: [
        {
          icon: '🗄️', name: 'Azure SQL Database', tech: 'S3 Standard',
          detail: 'Base de datos relacional managed. Almacena usuarios, permisos, metadatos de PDFs, progreso de lectura y analíticas. Réplicas de lectura automáticas, backups a 7 días y geo-redundancia.'
        },
        {
          icon: '📦', name: 'Azure Blob Storage', tech: 'LRS + Cool Tier',
          detail: 'Almacenamiento de objetos para PDFs, thumbnails y assets. Los PDFs activos se sirven desde Hot Tier. Los documentos archivados migran automáticamente a Cool Tier reduciendo costos en ~60%.'
        },
        {
          icon: '⚡', name: 'Azure Cache (Redis)', tech: 'C1 Standard',
          detail: 'Caché distribuido para sesiones de usuario, resultados de búsqueda frecuentes y listas de PDFs. Reduce la carga en SQL DB en ~70% para las consultas más comunes.'
        }
      ]
    },
    {
      id: 'delivery',
      label: 'Capa de Entrega',
      description: 'Distribución global de contenido',
      color: '#f472b6',
      bg: 'rgba(244,114,182,0.06)',
      border: 'rgba(244,114,182,0.25)',
      nodes: [
        {
          icon: '🌐', name: 'Azure CDN', tech: 'Akamai Standard',
          detail: 'Red de distribución de contenido con 120+ puntos de presencia globales. Cachea PDFs y assets estáticos cerca del usuario. Integración con Blob Storage para servir PDFs con URLs firmadas (SAS tokens).'
        },
        {
          icon: '📊', name: 'App Insights', tech: 'Monitoring',
          detail: 'Telemetría completa de la aplicación: performance de API, errores, trazas de requests y comportamiento de usuarios. Alertas automáticas si latencia > 2s o error rate > 1%.'
        }
      ]
    }
  ];
}
