import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShippingFlowDiagramComponent } from './shipping-flow-diagram/shipping-flow-diagram.component';

@Component({
  selector: 'app-international-shipping',
  standalone: true,
  imports: [RouterLink, ShippingFlowDiagramComponent],
  styles: [`
    .is-table { width:100%; border-collapse:collapse; font-size:0.85rem; }
    .is-table th { padding:11px 14px; text-align:left; font-size:0.72rem; color:#57685c; text-transform:uppercase; letter-spacing:0.04em; background:#F2F6F4; }
    .is-table td { padding:12px 14px; border-bottom:1px solid #EFE9DD; color:#1F2A22; vertical-align:top; }
    .is-card { background:#fff; border-left:4px solid #FFCD00; border-radius:14px; padding:22px; box-shadow:0 2px 16px rgba(41,84,64,0.08); }
    .is-kpi { background:#fff; border-radius:12px; border:1px solid #EFE9DD; padding:18px; text-align:center; }
    .is-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .is-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    @media (max-width:800px) {
      .is-grid-3 { grid-template-columns:1fr; }
      .is-grid-2 { grid-template-columns:1fr; }
      .is-table { min-width:640px; }
    }
  `],
  template: `
    <div style="min-height:100vh; background:#FDFBF3;">

      <!-- Header simple con navegación de regreso -->
      <header style="background:#fff; border-bottom:1px solid #EFE9DD; position:sticky; top:0; z-index:40;">
        <div style="max-width:1100px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <a routerLink="/propuesta" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
            <img src="/assets/makicol-icono-base.svg" alt="Makicol" style="width:32px; height:32px; object-fit:contain;">
            <span style="color:#295440; font-weight:800; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem;">Makicol · Propuesta Ejecutiva</span>
          </a>
          <div style="display:flex; gap:16px;">
            <a routerLink="/propuesta" style="color:#57685c; font-size:0.82rem; text-decoration:none; font-weight:600;">← Volver a la propuesta</a>
            <a routerLink="/marketplace" style="color:#295440; font-size:0.82rem; text-decoration:none; font-weight:700;">Ver prototipo →</a>
          </div>
        </div>
      </header>

      <!-- Hero de la sección -->
      <section style="padding:56px 20px 40px; text-align:center; background:linear-gradient(180deg,#F2F6F4,#FDFBF3);">
        <div style="max-width:760px; margin:0 auto;">
          <div style="display:inline-flex; align-items:center; gap:8px; padding:7px 16px; border-radius:20px; background:#E3EBE7; margin-bottom:20px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#295440;"></span>
            <span style="color:#295440; font-size:0.82rem; font-weight:700;">Investigación y propuesta — Expansión internacional</span>
          </div>
          <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:900; font-size:2.2rem; line-height:1.2; margin:0 0 14px;">
            Envíos internacionales<br><span style="color:#295440;">Piloto Zona Caribe</span>
          </h1>
          <p style="color:#57685c; font-size:1rem; line-height:1.6; max-width:640px; margin:0 auto;">
            Hallazgos regulatorios, costos reales y un flujo de implementación concreto para llevar las
            artesanías de Makicol a compradores en Estados Unidos, comenzando con un piloto de bajo riesgo.
          </p>
        </div>
      </section>

      <div style="max-width:1000px; margin:0 auto; padding:0 20px 64px; display:flex; flex-direction:column; gap:48px;">

        <!-- Sección: el cambio regulatorio -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#C8102E; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">⚠️ Hallazgo crítico</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              El fin del "de minimis" cambia todo el cálculo
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              Desde el 29 de agosto de 2025, EE. UU. eliminó de forma permanente la exención que dejaba entrar sin trámite ni arancel los paquetes ≤ USD 800.
            </p>
          </div>

          <div class="is-card" style="border-left-color:#C8102E; margin-bottom:16px;">
            <div style="display:flex; align-items:flex-start; gap:14px;">
              <span style="font-size:1.6rem; flex-shrink:0;">🛃</span>
              <div>
                <h4 style="color:#1F2A22; font-weight:800; font-size:0.92rem; margin:0 0 8px;">Qué significa para Makicol</h4>
                <p style="color:#3d4a41; font-size:0.88rem; line-height:1.6; margin:0 0 8px;">
                  <strong>Todo paquete que entre a EE. UU. — sin importar su valor — requiere hoy una entrada aduanera
                  formal o informal ante CBP</strong>, con arancel aplicable. Ya no existe la opción de enviar como "paquete pequeño informal".
                </p>
                <p style="color:#57685c; font-size:0.88rem; line-height:1.6; margin:0;">
                  Por eso el punto más riesgoso de un flujo con "un tercero recibiendo paquetes informalmente en EE. UU." no es la logística —
                  es que ese tercero se convierte, legalmente, en el <em>Importer of Record</em> ante CBP, sin estar habilitado para eso.
                </p>
              </div>
            </div>
          </div>

          <div class="is-grid-3">
            @for (dato of datosRegulatorios; track dato.label) {
              <div class="is-kpi">
                <div style="font-size:1.7rem; margin-bottom:6px;">{{ dato.icon }}</div>
                <div style="color:#1F2A22; font-weight:800; font-size:1.1rem; margin-bottom:2px;">{{ dato.valor }}</div>
                <div style="color:#57685c; font-size:0.76rem;">{{ dato.label }}</div>
              </div>
            }
          </div>
        </section>

        <!-- Sección: Certificado de Origen -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#295440; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">📜 Trámite clave</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Certificado de Origen TLC Colombia–EE. UU.
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              El documento que permite que las artesanías de Makicol entren a EE. UU. pagando 0% de arancel, en vez del arancel general (5-15%).
            </p>
          </div>

          <div class="is-card" style="margin-bottom:20px;">
            <h4 style="color:#295440; font-weight:800; font-size:0.9rem; margin:0 0 16px;">Paso a paso del trámite</h4>
            <div style="display:flex; flex-direction:column; gap:14px;">
              @for (paso of pasosCertificado; track paso.num) {
                <div style="display:flex; align-items:flex-start; gap:12px;">
                  <span style="width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; flex-shrink:0; background:#E3EBE7; color:#295440;">{{ paso.num }}</span>
                  <div>
                    <p style="color:#1F2A22; font-weight:700; font-size:0.86rem; margin:0 0 2px;">{{ paso.titulo }}</p>
                    <p style="color:#57685c; font-size:0.8rem; line-height:1.5; margin:0;">{{ paso.detalle }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <div style="overflow-x-auto: auto; overflow-x:auto;">
            <table class="is-table">
              <thead>
                <tr>
                  <th>Quién lo emite</th><th>Costo</th><th>Tiempo</th><th>Ideal para</th>
                </tr>
              </thead>
              <tbody>
                @for (op of opcionesCertificado; track op.emisor) {
                  <tr>
                    <td style="font-weight:700;">{{ op.emisor }}</td>
                    <td>{{ op.costo }}</td>
                    <td>{{ op.tiempo }}</td>
                    <td style="color:#57685c;">{{ op.idealPara }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <p style="color:#8a6040; font-size:0.78rem; margin-top:10px;">
            El certificado tiene vigencia de <strong>4 años</strong> y es reutilizable para envíos posteriores del mismo producto.
          </p>
        </section>

        <!-- Sección: Tarifas y tiempos -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#003893; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">🚚 Costos reales</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Tarifas y tiempos por servicio (Colombia → EE. UU.)
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              Comparativa de courier internacional para un paquete tipo (~1 kg), base para dimensionar el costo real del piloto.
            </p>
          </div>

          <div style="overflow-x:auto; margin-bottom:16px;">
            <table class="is-table">
              <thead>
                <tr><th>Servicio</th><th>Tiempo</th><th>Precio aprox.</th><th>Aduana incluida</th></tr>
              </thead>
              <tbody>
                @for (t of tarifas; track t.servicio) {
                  <tr>
                    <td style="font-weight:700;">{{ t.servicio }}</td>
                    <td>{{ t.tiempo }}</td>
                    <td>{{ t.precio }}</td>
                    <td [style.color]="t.aduanaIncluida ? '#1EA03B' : '#C8102E'" style="font-weight:700;">
                      {{ t.aduanaIncluida ? 'Sí' : 'No, aparte' }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="is-card" style="border-left-color:#DAAF37;">
            <p style="color:#3d4a41; font-size:0.86rem; line-height:1.6; margin:0;">
              ⚠️ Desde el fin del de minimis, varios operadores aplican un <strong>recargo adicional (~15%)</strong>
              sobre el valor declarado para procesar la formalidad aduanera de paquetes pequeños. El precio de la etiqueta de envío
              <strong>no es el costo total real</strong> — hay que sumar arancel (0% con Certificado de Origen) + gestión aduanera + este recargo.
            </p>
          </div>
        </section>

        <!-- Sección: Diagrama de flujo -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#B08900; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">🔄 Propuesta de implementación</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Flujo de la compra internacional
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              Fase 1 recomendada para el piloto: envío directo por pedido, sin bodega ni tercero informal en EE. UU.
            </p>
          </div>
          <app-shipping-flow-diagram/>
        </section>

        <!-- Sección: Evaluación del catálogo -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#6d3fae; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">🧶 Revisión de producto</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              ¿Qué productos del catálogo son aptos para el piloto?
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">
              Evaluación de materiales contra las restricciones de importación agrícola de EE. UU. (APHIS/USDA).
            </p>
          </div>

          <div style="overflow-x:auto;">
            <table class="is-table">
              <thead>
                <tr><th>Producto</th><th>Materiales</th><th style="text-align:center;">Riesgo</th><th>Observación</th></tr>
              </thead>
              <tbody>
                @for (p of catalogoEvaluado; track p.producto) {
                  <tr>
                    <td style="font-weight:700;">{{ p.producto }}</td>
                    <td style="color:#57685c;">{{ p.materiales }}</td>
                    <td style="text-align:center;">
                      <span style="padding:3px 12px; border-radius:20px; font-size:0.74rem; font-weight:800;" [style.background]="p.riesgoBg" [style.color]="p.riesgoColor">
                        {{ p.riesgo }}
                      </span>
                    </td>
                    <td style="color:#57685c; font-size:0.8rem;">{{ p.observacion }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>

        <!-- Sección: checklist de requisitos -->
        <section>
          <div style="margin-bottom:20px;">
            <span style="color:#1EA03B; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em;">✅ Antes de lanzar el piloto</span>
            <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#1F2A22; font-weight:800; font-size:1.4rem; margin:6px 0 8px;">
              Checklist de requisitos
            </h2>
            <p style="color:#57685c; font-size:0.9rem; margin:0;">Lo que debe estar listo antes del primer envío internacional.</p>
          </div>

          <div class="is-grid-2">
            @for (item of checklist; track item.texto) {
              <div style="background:#fff; border-radius:12px; border:1px solid #EFE9DD; padding:14px 16px; display:flex; align-items:flex-start; gap:10px;">
                <span style="font-size:1.1rem; flex-shrink:0;">☑️</span>
                <p style="color:#3d4a41; font-size:0.85rem; line-height:1.5; margin:0;">{{ item.texto }}</p>
              </div>
            }
          </div>
        </section>

      </div>

      <!-- Footer CTA -->
      <footer style="padding:48px 20px; text-align:center; border-top:3px solid #DAAF37; background:#fff;">
        <p style="color:#8a6040; font-size:0.85rem; margin:0 0 20px;">¿Listos para revisar el siguiente paso?</p>
        <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
          <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px;">
            <a routerLink="/propuesta"
               style="padding:12px 24px; border-radius:10px; font-weight:700; font-size:0.88rem; text-decoration:none;
                      background:#F2F6F4; border:1.5px solid #C6D7CD; color:#295440;">
              ← Volver a la propuesta ejecutiva
            </a>
            <a routerLink="/marketplace"
               style="padding:12px 24px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none;
                      background:linear-gradient(135deg,#FFCD00,#C8102E); color:#fff;">
              Ver prototipo del marketplace →
            </a>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class InternationalShippingComponent {
  datosRegulatorios = [
    { icon: '📅', valor: '29 ago. 2025', label: 'Fin permanente del "de minimis" en EE. UU.' },
    { icon: '💵', valor: 'USD 0', label: 'Umbral libre de trámite aduanero (ya no existe)' },
    { icon: '📈', valor: '~15%', label: 'Recargo típico aplicado a paquetes pequeños' },
  ];

  pasosCertificado = [
    { num: 1, titulo: 'Verificar la regla de origen', detalle: 'Con el código arancelario (HTS/NANDINA) del producto, confirmar el criterio de origen aplicable (producido en Colombia, cambio de clasificación, o valor de contenido regional 35-45%).' },
    { num: 2, titulo: 'Registrarse en la VUCE', detalle: 'Crear usuario en vuce.gov.co con el RUT vigente y la firma electrónica (certificado digital emitido por Certicámara). Gratis, una sola vez.' },
    { num: 3, titulo: 'Diligenciar la solicitud', detalle: 'Descripción comercial, código HTS, criterio de origen, valor FOB y datos del comprador en el módulo de Certificados de Origen.' },
    { num: 4, titulo: 'Anexar soportes', detalle: 'Factura comercial, packing list y la declaración jurada de origen del productor.' },
    { num: 5, titulo: 'Recibir el certificado firmado', detalle: 'Con sello oficial y número de serie. 1-3 días hábiles según el emisor elegido.' },
    { num: 6, titulo: 'Enviarlo al broker/comprador', detalle: 'Debe acompañar el envío o llegar al customs broker en EE. UU. antes del despacho aduanero, para aplicar el arancel 0%.' },
  ];

  opcionesCertificado = [
    { emisor: 'DIAN (portal MUISCA)', costo: 'Gratuito', tiempo: '1-3 días hábiles', idealPara: 'Cualquier exportador registrado; es la vía oficial y sin costo' },
    { emisor: 'Cámara de Comercio autorizada', costo: 'COP 25.000 – 80.000', tiempo: '1-2 días hábiles', idealPara: 'Cuando se necesita respuesta rápida vía VUCE' },
    { emisor: 'Exportador Autorizado (autoemisión)', costo: 'Gratuito', tiempo: 'Inmediato', idealPara: 'Volumen recurrente — requiere certificación previa ante la DIAN' },
  ];

  tarifas = [
    { servicio: 'FedEx International Economy', tiempo: '4-6 días hábiles', precio: '~COP 108.000 (≈USD 27)', aduanaIncluida: false },
    { servicio: 'FedEx International Priority', tiempo: '4-5 días hábiles', precio: '~COP 362.000 (≈USD 90)', aduanaIncluida: false },
    { servicio: 'DHL Express Worldwide', tiempo: '1-4 días hábiles', precio: '~COP 295.000-702.000 (≈USD 73-175)', aduanaIncluida: false },
    { servicio: '4-72 (postal internacional)', tiempo: '5-9 días hábiles', precio: '~COP 113.000-190.000 (≈USD 28-47)', aduanaIncluida: true },
    { servicio: 'Carga aérea consolidada (30-500 kg)', tiempo: '5-12 días hábiles', precio: 'USD 8-15 / kg', aduanaIncluida: false },
  ];

  catalogoEvaluado = [
    { producto: 'Mochila Wayúu Grande', materiales: 'Algodón, fique, cuentas de vidrio', riesgo: 'Bajo', riesgoBg: '#E3F6E8', riesgoColor: '#1EA03B', observacion: 'Textil terminado + vidrio, sin restricción agrícola' },
    { producto: 'Sombrero Vueltiao 21 Vueltas', materiales: 'Caña flecha', riesgo: 'Bajo', riesgoBg: '#E3F6E8', riesgoColor: '#1EA03B', observacion: 'Fibra vegetal tejida y terminada, categoría común de importación' },
    { producto: 'Filigrana de Plata Mariposa', materiales: 'Plata 950', riesgo: 'Medio', riesgoBg: '#FDF3D6', riesgoColor: '#B08900', observacion: 'Requiere control de exportación de metales preciosos (DIAN/Banrep), no bloqueante' },
    { producto: 'Hamaca Artesanal San Jacinto', materiales: 'Algodón natural', riesgo: 'Bajo', riesgoBg: '#E3F6E8', riesgoColor: '#1EA03B', observacion: 'Textil terminado' },
    { producto: 'Cerámica Ritual Tayrona', materiales: 'Arcilla cocida', riesgo: 'Medio', riesgoBg: '#FDF3D6', riesgoColor: '#B08900', observacion: 'Describir explícitamente como réplica artesanal contemporánea' },
    { producto: 'Voces del Caribe — Antología', materiales: 'Papel impreso', riesgo: 'Bajo', riesgoBg: '#E3F6E8', riesgoColor: '#1EA03B', observacion: 'Sin restricción logística' },
    { producto: 'Collar de Semillas Wayúu', materiales: 'Semillas naturales, cuentas de vidrio', riesgo: 'Alto', riesgoBg: '#FBE2E5', riesgoColor: '#C8102E', observacion: 'Semillas reguladas por APHIS — permiso PPQ 587 puede tardar hasta 2 meses. Excluir del piloto inicial.' },
    { producto: 'Tapiz Caribe Multicolor', materiales: 'Algodón, lana virgen', riesgo: 'Medio', riesgoBg: '#FDF3D6', riesgoColor: '#B08900', observacion: 'Verificar si la lana está cardada/tejida (bajo riesgo) o en bruto (inspección agrícola adicional)' },
  ];

  checklist = [
    { texto: 'RUT con actividad de exportador habilitada ante la DIAN' },
    { texto: 'Registro y firma electrónica activos en la VUCE (vuce.gov.co)' },
    { texto: 'Certificado de Origen TLC vigente para cada línea de producto del piloto' },
    { texto: 'Verificación de permisos ICA/CITES para materiales sensibles (semillas, cuero, metales)' },
    { texto: 'Acuerdo comercial con courier internacional (DHL/FedEx) que incluya gestión aduanera' },
    { texto: 'Plantilla de factura comercial y packing list con descripción y valor reales' },
    { texto: 'Comunicación clara al comprador: 20 días hábiles como tiempo estimado de entrega' },
    { texto: 'Catálogo internacional inicial limitado a productos de riesgo bajo/medio verificado' },
  ];
}
