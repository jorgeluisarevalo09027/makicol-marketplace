import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div style="max-width:1000px; margin:32px auto; padding:0 16px 48px;">

      <!-- Header -->
      <div style="margin-bottom:24px;">
        <a routerLink="/marketplace/catalogo" style="color:#7D1C3A; text-decoration:none; font-size:0.85rem; font-weight:600;">
          ← Volver al catálogo
        </a>
        <h1 style="font-family:'Playfair Display',Georgia,serif; color:#7D1C3A; font-size:1.6rem; font-weight:900; margin:8px 0 0;">
          Finalizar compra
        </h1>
      </div>

      <div style="display:grid; grid-template-columns:1fr 380px; gap:24px; align-items:flex-start;">

        <!-- Panel de pago -->
        <div>
          <!-- Métodos de pago -->
          <div style="background:#fff; border-left:4px solid #C8921A; border-radius:12px; padding:24px; box-shadow:0 2px 12px rgba(125,28,58,0.09); margin-bottom:20px;">
            <h2 style="font-family:'Playfair Display',Georgia,serif; color:#7D1C3A; font-size:1.1rem; font-weight:700; margin:0 0 20px;">
              Método de pago
            </h2>

            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
              @for (m of metodos; track m.id) {
                <label style="display:flex; align-items:center; gap:14px; padding:14px 16px; border-radius:10px; border:2px solid; cursor:pointer; transition:all 0.2s;"
                       [style.border-color]="metodoPago() === m.id ? '#7D1C3A' : '#e8d4b2'"
                       [style.background]="metodoPago() === m.id ? 'rgba(125,28,58,0.04)' : '#fff'">
                  <input type="radio" [value]="m.id" [(ngModel)]="selectedMetodo"
                         (ngModelChange)="metodoPago.set($event)"
                         style="accent-color:#7D1C3A; width:18px; height:18px; flex-shrink:0;">
                  <span style="font-size:1.8rem; flex-shrink:0;">{{ m.logo }}</span>
                  <div style="flex:1;">
                    <p style="font-weight:700; color:#3D1A10; margin:0 0 2px; font-size:0.9rem;">{{ m.nombre }}</p>
                    <p style="color:#7a5030; font-size:0.78rem; margin:0;">{{ m.descripcion }}</p>
                  </div>
                  @if (m.badge) {
                    <span style="font-size:0.7rem; font-weight:700; padding:2px 8px; border-radius:10px; background:#EDD9A3; color:#7D1C3A; white-space:nowrap;">
                      {{ m.badge }}
                    </span>
                  }
                </label>
              }
            </div>

            <!-- Formulario dinámico según método -->
            @if (metodoPago() === 'tarjeta') {
              <div style="display:flex; flex-direction:column; gap:14px;">
                <div>
                  <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Número de tarjeta</label>
                  <input placeholder="0000 0000 0000 0000"
                         style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#3D1A10; outline:none; box-sizing:border-box; letter-spacing:2px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
                  <div>
                    <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Vencimiento</label>
                    <input placeholder="MM/AA" style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; outline:none; box-sizing:border-box;">
                  </div>
                  <div>
                    <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">CVV</label>
                    <input placeholder="•••" style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; outline:none; box-sizing:border-box;">
                  </div>
                </div>
                <div>
                  <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Nombre en la tarjeta</label>
                  <input placeholder="Como aparece en tu tarjeta"
                         style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#3D1A10; outline:none; box-sizing:border-box;">
                </div>
              </div>
            }

            @if (metodoPago() === 'nequi' || metodoPago() === 'daviplata') {
              <div style="padding:20px; background:#fffbf0; border-radius:10px; text-align:center;">
                <p style="font-size:2rem; margin:0 0 8px;">📱</p>
                <p style="font-weight:700; color:#3D1A10; margin:0 0 6px;">
                  Ingresa tu número de celular registrado en {{ metodoPago() === 'nequi' ? 'Nequi' : 'Daviplata' }}
                </p>
                <input placeholder="+57 300 000 0000"
                       style="width:100%; max-width:280px; padding:10px 16px; border:2px solid #C8921A; border-radius:8px; font-size:1rem; text-align:center; outline:none; box-sizing:border-box; margin-top:8px;">
                <p style="color:#7a5030; font-size:0.8rem; margin:10px 0 0;">
                  Recibirás una notificación push para aprobar el pago
                </p>
              </div>
            }

            @if (metodoPago() === 'pse') {
              <div style="display:flex; flex-direction:column; gap:14px;">
                <div>
                  <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Selecciona tu banco</label>
                  <select style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#3D1A10; outline:none; background:#fff;">
                    <option>Bancolombia</option>
                    <option>Davivienda</option>
                    <option>Banco de Bogotá</option>
                    <option>BBVA Colombia</option>
                    <option>Banco Popular</option>
                    <option>AV Villas</option>
                    <option>Nequi (Bancolombia)</option>
                  </select>
                </div>
                <div>
                  <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Tipo de persona</label>
                  <select style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#3D1A10; outline:none; background:#fff;">
                    <option>Natural</option>
                    <option>Jurídica</option>
                  </select>
                </div>
              </div>
            }
          </div>

          <!-- Datos de envío -->
          <div style="background:#fff; border-left:4px solid #C8921A; border-radius:12px; padding:24px; box-shadow:0 2px 12px rgba(125,28,58,0.09);">
            <h2 style="font-family:'Playfair Display',Georgia,serif; color:#7D1C3A; font-size:1.1rem; font-weight:700; margin:0 0 16px;">
              Dirección de entrega
            </h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
              <div style="grid-column:span 2;">
                <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Dirección completa</label>
                <input placeholder="Cra 15 #25-30, Apto 301"
                       style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#3D1A10; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Ciudad</label>
                <input placeholder="Bogotá" style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; outline:none; box-sizing:border-box;">
              </div>
              <div>
                <label style="display:block; font-size:0.82rem; font-weight:600; color:#3D1A10; margin-bottom:5px;">Departamento</label>
                <input placeholder="Cundinamarca" style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; outline:none; box-sizing:border-box;">
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen del pedido -->
        <div>
          <div style="background:#fff; border-left:4px solid #C8921A; border-radius:12px; padding:24px; box-shadow:0 2px 12px rgba(125,28,58,0.09); position:sticky; top:150px;">
            <h2 style="font-family:'Playfair Display',Georgia,serif; color:#7D1C3A; font-size:1.1rem; font-weight:700; margin:0 0 16px;">
              Resumen del pedido
            </h2>
            @for (item of carrito; track item.id) {
              <div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid #f0e0c0;">
                <img [src]="item.imagen" [alt]="item.nombre"
                     style="width:64px; height:64px; object-fit:cover; border-radius:8px; flex-shrink:0;">
                <div style="flex:1; min-width:0;">
                  <p style="font-size:0.85rem; font-weight:600; color:#3D1A10; margin:0 0 2px; line-height:1.3;">{{ item.nombre }}</p>
                  <p style="font-size:0.75rem; color:#7D1C3A; margin:0 0 4px;">{{ item.artesano }}</p>
                  <p style="font-size:0.78rem; color:#7a5030; margin:0;">Cant: {{ item.qty }}</p>
                </div>
                <p style="font-weight:700; color:#7D1C3A; font-size:0.9rem; white-space:nowrap;">
                  {{ fmtCOP(item.precio * item.qty) }}
                </p>
              </div>
            }

            <div style="margin-top:4px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span style="color:#7a5030; font-size:0.85rem;">Subtotal</span>
                <span style="color:#3D1A10; font-size:0.85rem;">{{ fmtCOP(subtotal()) }}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span style="color:#7a5030; font-size:0.85rem;">Envío</span>
                <span style="color:#2AB8B0; font-size:0.85rem; font-weight:600;">Gratis</span>
              </div>
              <hr style="border:none; height:1px; background:#f0e0c0; margin:12px 0;">
              <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                <span style="color:#3D1A10; font-weight:700; font-size:1rem;">Total</span>
                <span style="color:#7D1C3A; font-weight:900; font-size:1.2rem;">{{ fmtCOP(subtotal()) }}</span>
              </div>
            </div>

            <button style="width:100%; padding:14px; background:#7D1C3A; color:#fff; border:none; border-radius:10px; font-size:1rem; font-weight:800; cursor:pointer; font-family:'Playfair Display',Georgia,serif; transition:background 0.2s;">
              Pagar {{ fmtCOP(subtotal()) }}
            </button>
            <p style="text-align:center; color:#8a6040; font-size:0.75rem; margin:10px 0 0;">
              🔒 Pago seguro procesado por MercadoPago Colombia
            </p>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class PagoComponent {
  metodoPago    = signal('tarjeta');
  selectedMetodo = 'tarjeta';

  metodos = [
    { id: 'tarjeta',   logo: '💳', nombre: 'Tarjeta débito / crédito', descripcion: 'Visa, Mastercard, Amex — cuotas disponibles', badge: 'Más usado' },
    { id: 'nequi',     logo: '💜', nombre: 'Nequi',    descripcion: 'Débito automático desde tu cuenta Nequi', badge: '' },
    { id: 'daviplata', logo: '🔵', nombre: 'Daviplata', descripcion: 'Pago inmediato desde Daviplata', badge: '' },
    { id: 'pse',       logo: '🏦', nombre: 'PSE — Débito bancario', descripcion: 'Transferencia directa desde tu banco colombiano', badge: '' },
  ];

  carrito = [
    { id: 1, nombre: 'Mochila Wayúu Grande',   artesano: 'María Pushaina', precio: 185000, qty: 1, imagen: '/assets/foto1.webp' },
    { id: 7, nombre: 'Collar de Semillas Wayúu', artesano: 'María Pushaina', precio: 55000,  qty: 2, imagen: '/assets/foto7.webp' },
  ];

  subtotal() { return this.carrito.reduce((s, i) => s + i.precio * i.qty, 0); }

  fmtCOP(n: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }
}
