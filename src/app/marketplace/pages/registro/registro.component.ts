import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    .reg-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .reg-card {
      padding: 32px;
    }
    @media (max-width: 560px) {
      .reg-grid-2 {
        grid-template-columns: 1fr;
      }
      .reg-grid-2 > div[style*="span 2"] {
        grid-column: span 1 !important;
      }
      .reg-card {
        padding: 20px;
      }
    }
  `],
  template: `
    <div style="max-width:680px; margin:40px auto; padding:0 16px 48px;">

      <!-- Header -->
      <div style="text-align:center; margin-bottom:32px;">
        <img src="/assets/makicol-icono-base.svg" alt="Makicol Marketplace"
             style="height:60px; margin:0 auto 12px; display:block; object-fit:contain;">
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.8rem; font-weight:900; margin:0 0 6px;">
          Regístrate como Productor
        </h1>
        <p style="color:#5a3820; font-size:0.9rem;">
          Únete a la comunidad de artesanos de Makicol y llega a compradores en toda Colombia
        </p>
      </div>

      <!-- Progress bar -->
      <div style="margin-bottom:32px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          @for (step of pasos; track step.num) {
            <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
              <div style="width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:700; border:2px solid; transition:all 0.3s;"
                   [style.background]="pasoActual() >= step.num ? '#2C7350' : '#fff'"
                   [style.border-color]="pasoActual() >= step.num ? '#2C7350' : '#d4b87a'"
                   [style.color]="pasoActual() >= step.num ? '#fff' : '#57685c'">
                {{ pasoActual() > step.num ? '✓' : step.num }}
              </div>
              <span style="font-size:0.72rem; margin-top:4px; text-align:center;"
                    [style.color]="pasoActual() >= step.num ? '#295440' : '#57685c'"
                    [style.font-weight]="pasoActual() === step.num ? '700' : '400'">
                {{ step.label }}
              </span>
            </div>
            @if (step.num < 3) {
              <div style="flex:1; height:2px; margin-top:18px; align-self:flex-start;"
                   [style.background]="pasoActual() > step.num ? '#FFCD00' : '#d4b87a'">
              </div>
            }
          }
        </div>
      </div>

      <!-- Card del formulario -->
      <div class="reg-card" style="background:#fff; border-left:4px solid #FFCD00; border-radius:12px; box-shadow:0 2px 16px rgba(41,84,64,0.10);">

        <!-- PASO 1: Datos personales -->
        @if (pasoActual() === 1) {
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.3rem; margin:0 0 24px;">
            1. Datos Personales
          </h2>
          <div class="reg-grid-2">
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Nombre completo *</label>
              <input [(ngModel)]="form.nombre" placeholder="ej. María Pushaina"
                     style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Número de cédula *</label>
              <input [(ngModel)]="form.cedula" placeholder="ej. 1234567890"
                     style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Correo electrónico *</label>
              <input [(ngModel)]="form.email" type="email" placeholder="artesana@correo.com"
                     style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Celular (WhatsApp) *</label>
              <input [(ngModel)]="form.celular" placeholder="+57 300 000 0000"
                     style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; box-sizing:border-box;">
            </div>
            <div style="grid-column:span 2;">
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Municipio *</label>
              <select [(ngModel)]="form.municipio"
                      style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; background:#fff;">
                <option value="">Selecciona tu municipio...</option>
                <option>Riohacha, Guajira</option>
                <option>Santa Marta, Magdalena</option>
                <option>Valledupar, Cesar</option>
                <option>Mompox, Bolívar</option>
                <option>San Jacinto, Bolívar</option>
                <option>El Carmen de Bolívar</option>
                <option>Sincelejo, Sucre</option>
                <option>Barranquilla, Atlántico</option>
              </select>
            </div>
          </div>
        }

        <!-- PASO 2: Información del negocio -->
        @if (pasoActual() === 2) {
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.3rem; margin:0 0 24px;">
            2. Tu Negocio Artesanal
          </h2>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Nombre de tu emprendimiento *</label>
              <input [(ngModel)]="form.negocio" placeholder="ej. Mochilas Pushaina Wayúu"
                     style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Tipo de artesanía *</label>
              <select [(ngModel)]="form.tipoArtesania"
                      style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; background:#fff;">
                <option value="">Selecciona la categoría...</option>
                <option>Tejidos y mochilas</option>
                <option>Sombreros (vueltiao, pinta 'e ratn)</option>
                <option>Joyería y accesorios</option>
                <option>Cerámica y alfarería</option>
                <option>Tallas en madera</option>
                <option>Libros y publicaciones</option>
                <option>Música y cultura</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:5px;">Descripción de tu trabajo *</label>
              <textarea [(ngModel)]="form.descripcion" rows="4"
                        placeholder="Cuéntanos sobre tu proceso artesanal, materiales que usas y lo que hace especiales tus productos..."
                        style="width:100%; padding:10px 12px; border:1.5px solid #d4b87a; border-radius:8px; font-size:0.9rem; color:#1F2A22; outline:none; resize:vertical; box-sizing:border-box;"></textarea>
            </div>
            <div>
              <label style="display:block; font-size:0.82rem; font-weight:600; color:#1F2A22; margin-bottom:8px;">Foto de perfil de tu negocio</label>
              <div style="border:2px dashed #d4b87a; border-radius:10px; padding:28px; text-align:center; cursor:pointer; background:#fffbf5;">
                <p style="font-size:1.8rem; margin:0 0 8px;">📸</p>
                <p style="color:#57685c; font-size:0.85rem; margin:0;">Arrastra o haz clic para subir tu foto</p>
                <p style="color:#8a6040; font-size:0.75rem; margin:4px 0 0;">JPG, PNG hasta 5 MB</p>
              </div>
            </div>
          </div>
        }

        <!-- PASO 3: Método de cobro -->
        @if (pasoActual() === 3) {
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif; color:#295440; font-size:1.3rem; margin:0 0 8px;">
            3. ¿Cómo quieres recibir tus pagos?
          </h2>
          <p style="color:#5a3820; font-size:0.85rem; margin:0 0 24px;">
            Cuando un cliente te compre, recibirás el pago directamente en tu cuenta. La plataforma descuenta solo el 6% de comisión.
          </p>
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
            @for (metodo of metodosCobro; track metodo.id) {
              <label style="display:flex; align-items:center; gap:14px; cursor:pointer; padding:14px 16px; border-radius:10px; border:2px solid; transition:all 0.2s;"
                     [style.border-color]="form.metodoCobro === metodo.id ? '#295440' : '#d4b87a'"
                     [style.background]="form.metodoCobro === metodo.id ? 'rgba(41,84,64,0.04)' : '#fff'">
                <input type="radio" [(ngModel)]="form.metodoCobro" [value]="metodo.id"
                       style="accent-color:#295440; width:18px; height:18px; flex-shrink:0;">
                <span style="font-size:1.6rem;">{{ metodo.icono }}</span>
                <div>
                  <p style="font-weight:700; color:#1F2A22; margin:0 0 2px; font-size:0.9rem;">{{ metodo.nombre }}</p>
                  <p style="color:#57685c; font-size:0.78rem; margin:0;">{{ metodo.descripcion }}</p>
                </div>
              </label>
            }
          </div>
          @if (form.metodoCobro) {
            <div style="padding:16px; background:#fffbf0; border-left:3px solid #FFCD00; border-radius:8px;">
              <p style="color:#295440; font-size:0.85rem; font-weight:700; margin:0 0 8px;">
                ✅ Todo listo para registrarte
              </p>
              <p style="color:#5a3820; font-size:0.82rem; margin:0;">
                Al crear tu cuenta, aceptas los <a href="#" style="color:#295440;">Términos del Marketplace</a>
                y la <a href="#" style="color:#295440;">Política de Comisiones</a> (6% por venta completada).
              </p>
            </div>
          }
        }

        <!-- Navegación entre pasos -->
        <div style="display:flex; justify-content:space-between; margin-top:28px; padding-top:20px; border-top:1px solid #f0e0c0;">
          <button (click)="anterior()" [disabled]="pasoActual() === 1"
                  style="padding:10px 24px; border:2px solid #d4b87a; border-radius:8px; background:transparent; color:#57685c; font-size:0.9rem; font-weight:600; cursor:pointer; transition:all 0.2s;"
                  [style.opacity]="pasoActual() === 1 ? '0.4' : '1'">
            ← Anterior
          </button>
          @if (pasoActual() < 3) {
            <button (click)="siguiente()"
                    style="padding:10px 28px; border:none; border-radius:8px; background:#2C7350; color:#fff; font-size:0.9rem; font-weight:700; cursor:pointer;">
              Siguiente →
            </button>
          } @else {
            <button style="padding:10px 28px; border:none; border-radius:8px; background:#FFCD00; color:#295440; font-size:0.9rem; font-weight:700; cursor:pointer;">
              🎉 Crear mi cuenta
            </button>
          }
        </div>
      </div>

    </div>
  `,
})
export class RegistroComponent {
  pasoActual = signal(1);

  pasos = [
    { num: 1, label: 'Datos personales' },
    { num: 2, label: 'Mi negocio'       },
    { num: 3, label: 'Cobros'           },
  ];

  form = {
    nombre: '', cedula: '', email: '', celular: '', municipio: '',
    negocio: '', tipoArtesania: '', descripcion: '',
    metodoCobro: '',
  };

  metodosCobro = [
    { id: 'nequi',    icono: '💜', nombre: 'Nequi',    descripcion: 'Recibe en tu cuenta Nequi (Bancolombia)' },
    { id: 'daviplata',icono: '🔵', nombre: 'Daviplata', descripcion: 'Transferencia a tu Daviplata (Davivienda)' },
    { id: 'pse',      icono: '🏦', nombre: 'Cuenta bancaria (PSE)', descripcion: 'Cualquier banco colombiano — transferencia directa' },
  ];

  siguiente() { if (this.pasoActual() < 3) this.pasoActual.update(p => p + 1); }
  anterior()  { if (this.pasoActual() > 1) this.pasoActual.update(p => p - 1); }
}
