import { Component, signal } from '@angular/core';

interface FlowStage {
  id: string;
  label: string;
  description: string;
  color: string;
  bg: string;
  border: string;
  nodes: FlowNode[];
}

interface FlowNode {
  icon: string;
  name: string;
  tag: string;
  detail: string;
}

@Component({
  selector: 'app-shipping-flow-diagram',
  standalone: true,
  template: `
    <div style="background:#fff; border-radius:16px; overflow:hidden; border:1px solid #EFE9DD; box-shadow:0 2px 16px rgba(41,84,64,0.08);">
      <div style="padding:20px 24px; border-bottom:1px solid #EFE9DD;">
        <h3 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.1rem; margin:0 0 3px;">
          Flujo propuesto: compra internacional (Fase 1 — envío directo)
        </h3>
        <p style="color:#57685c; font-size:0.85rem; margin:0;">Haz clic en cada paso para ver el detalle</p>
      </div>

      <div style="padding:24px 20px; display:flex; flex-direction:column; gap:8px;">
        @for (stage of stages; track stage.id; let last = $last) {
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
              <div style="height:1px; flex:1; opacity:0.4;" [style.background]="stage.color"></div>
              <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; padding:5px 14px; border-radius:20px;"
                    [style.color]="stage.color" [style.background]="stage.bg" [style.border]="'1px solid ' + stage.border">
                {{ stage.label }}
              </span>
              <div style="height:1px; flex:1; opacity:0.4;" [style.background]="stage.color"></div>
            </div>
            <p style="text-align:center; color:#8a9099; font-size:0.75rem; margin:0 0 12px;">{{ stage.description }}</p>

            <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
              @for (node of stage.nodes; track node.name) {
                <button
                  style="cursor:pointer; border-radius:12px; padding:16px; min-width:150px; max-width:190px; text-align:center;
                         transition:transform 0.15s; border:1.5px solid;"
                  [style.background]="stage.bg"
                  [style.border-color]="selectedNode()?.name === node.name ? stage.color : stage.border"
                  [style.box-shadow]="selectedNode()?.name === node.name ? ('0 0 0 3px ' + stage.bg) : 'none'"
                  (click)="selectNode(node)">
                  <div style="font-size:1.8rem; margin-bottom:8px;">{{ node.icon }}</div>
                  <div style="color:#1F2A22; font-size:0.8rem; font-weight:800; margin-bottom:2px;">{{ node.name }}</div>
                  <div style="font-size:0.68rem; font-weight:700;" [style.color]="stage.color">{{ node.tag }}</div>
                </button>
              }
            </div>
          </div>

          @if (!last) {
            <div style="display:flex; justify-content:center; padding:2px 0;">
              <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                <div style="width:1px; height:16px; background:#C6D7CD;"></div>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="#8a9099">
                  <path d="M10 3a1 1 0 011 1v9.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 13.586V4a1 1 0 011-1z"/>
                </svg>
              </div>
            </div>
          }
        }
      </div>

      @if (selectedNode()) {
        <div style="margin:0 20px 20px; padding:16px; border-radius:12px; background:#F2F6F4; border:1px solid #C6D7CD;">
          <div style="display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size:1.6rem;">{{ selectedNode()!.icon }}</span>
            <div style="flex:1;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; gap:8px;">
                <h4 style="color:#1F2A22; font-weight:800; font-size:0.88rem; margin:0;">{{ selectedNode()!.name }}</h4>
                <span style="color:#295440; font-size:0.75rem; font-weight:700; white-space:nowrap;">{{ selectedNode()!.tag }}</span>
              </div>
              <p style="color:#57685c; font-size:0.8rem; line-height:1.5; margin:0;">{{ selectedNode()!.detail }}</p>
            </div>
            <button style="background:none; border:none; cursor:pointer; color:#8a9099; font-size:1rem;" (click)="selectedNode.set(null)">✕</button>
          </div>
        </div>
      }

      <div style="padding:0 20px 20px;">
        <div style="border-radius:12px; border:1px solid #EFE9DD; padding:16px; background:#FDFBF3;">
          <h4 style="color:#295440; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.05em; font-weight:800; margin:0 0 10px;">
            Tiempo estimado total
          </h4>
          <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:0.78rem; color:#57685c;">
            <div style="display:flex; align-items:center; gap:6px;"><span>🧵</span><span>Producción/empaque artesano: variable, fuera del tiempo de envío</span></div>
            <div style="display:flex; align-items:center; gap:6px;"><span>🚚</span><span>Tránsito + aduana: 5–10 días hábiles</span></div>
            <div style="display:flex; align-items:center; gap:6px;"><span>🛡️</span><span>Colchón de contingencia comunicado al comprador: hasta 20 días hábiles</span></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ShippingFlowDiagramComponent {
  selectedNode = signal<FlowNode | null>(null);

  selectNode(node: FlowNode) {
    this.selectedNode.set(this.selectedNode()?.name === node.name ? null : node);
  }

  stages: FlowStage[] = [
    {
      id: 'compra',
      label: '1. Compra',
      description: 'El comprador en EE. UU. paga en línea desde el marketplace',
      color: '#003893', bg: '#EAF1FC', border: '#C3D6F2',
      nodes: [
        { icon: '🛒', name: 'Checkout internacional', tag: 'Marketplace', detail: 'El comprador ve el precio en USD, el tiempo estimado de entrega (hasta 20 días hábiles) y confirma dirección de envío en EE. UU. antes de pagar.' },
        { icon: '💳', name: 'Pago en línea', tag: 'Pasarela', detail: 'Tarjeta internacional o wallet compatible. El cobro incluye el flete internacional estimado, ya que el arancel es 0% con Certificado de Origen TLC.' },
      ],
    },
    {
      id: 'colombia',
      label: '2. Preparación en Colombia',
      description: 'El artesano produce, empaca y despacha hacia el centro de acopio',
      color: '#8a6040', bg: '#FBF3E9', border: '#E8D4B2',
      nodes: [
        { icon: '🧶', name: 'Artesano', tag: 'Producción', detail: 'Prepara el pedido y genera la factura comercial con descripción y valor reales — dato clave para evitar demoras en aduana.' },
        { icon: '📦', name: 'Centro de acopio Santa Marta', tag: 'Recolección regional', detail: 'Punto de recepción para el piloto Zona Caribe, usando la red de recolección doméstica de Envía/Servientrega. Aquí se verifica empaque y documentación antes del envío internacional.' },
      ],
    },
    {
      id: 'tramites',
      label: '3. Trámites de exportación',
      description: 'Documentación obligatoria ante DIAN/VUCE antes de que la carga pueda salir del país',
      color: '#6d3fae', bg: '#F1EAFB', border: '#D9C6F2',
      nodes: [
        { icon: '🪪', name: 'RUT exportador', tag: 'DIAN', detail: 'Registro habilitado una sola vez ante la DIAN con actividad de exportador. Requisito previo a cualquier despacho.' },
        { icon: '📜', name: 'Certificado de Origen TLC', tag: 'VUCE / Cámara de Comercio', detail: 'Acredita que el producto es colombiano para acceder al arancel 0% en EE. UU. Emitido por DIAN (gratis, 1-3 días hábiles) o Cámara de Comercio (COP 25.000-80.000, 1-2 días). Vigente 4 años.' },
        { icon: '🧾', name: 'Declaración Simplificada (DSE)', tag: 'DIAN / MUISCA', detail: 'Para envíos con valor FOB ≤ USD 2.500 (el caso típico del piloto). Formaliza la salida legal de la mercancía del país.' },
      ],
    },
    {
      id: 'transporte',
      label: '4. Envío internacional',
      description: 'Transporte puerta a puerta con despacho aduanero incluido — sin bodega ni tercero en EE. UU.',
      color: '#1EA03B', bg: '#EAF8ED', border: '#BEE6C6',
      nodes: [
        { icon: '✈️', name: 'Courier internacional', tag: 'DHL / FedEx', detail: 'Servicio con gestión de despacho aduanero incluida como opción pagada. Tránsito de 3-7 días hábiles. Evita depender de un tercero informal en EE. UU.' },
      ],
    },
    {
      id: 'aduana',
      label: '5. Aduana EE. UU.',
      description: 'Toda mercancía requiere entrada formal o informal ante CBP desde agosto de 2025 (fin del de minimis)',
      color: '#C8102E', bg: '#FBE9EC', border: '#F0C0CA',
      nodes: [
        { icon: '🛃', name: 'Formal/informal entry', tag: 'CBP', detail: 'El broker asociado al courier presenta la entrada ante Customs and Border Protection usando el Certificado de Origen para aplicar 0% de arancel. 1-3 días hábiles en condiciones normales.' },
      ],
    },
    {
      id: 'entrega',
      label: '6. Entrega',
      description: 'Última milla dentro de EE. UU. — ya sin fricción aduanera',
      color: '#B08900', bg: '#FDF6E3', border: '#F0DFA0',
      nodes: [
        { icon: '🏠', name: 'Entrega a domicilio', tag: 'Última milla EE. UU.', detail: 'Una vez liberada la aduana, la entrega final es un envío doméstico estándar en EE. UU. — rápido y de bajo costo.' },
      ],
    },
  ];
}
