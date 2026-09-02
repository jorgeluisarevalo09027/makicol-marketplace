import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .tc-wrap {
      max-width: 820px;
      margin: 0 auto;
      padding: 40px 20px 64px;
    }
    .tc-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #295440;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      margin-bottom: 24px;
    }
    .tc-header {
      margin-bottom: 28px;
    }
    .tc-title {
      font-family: 'Playfair Display', serif;
      color: #295440;
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 8px;
    }
    .tc-version {
      color: #57685c;
      font-size: 0.85rem;
      margin: 0;
    }
    .tc-disclaimer {
      background: #FFF8E1;
      border-left: 4px solid #FFCD00;
      border-radius: 8px;
      padding: 14px 18px;
      font-size: 0.82rem;
      color: #6b5a1f;
      line-height: 1.5;
      margin: 20px 0 32px;
    }
    .tc-summary {
      background: #F2F6F4;
      border-left: 4px solid #2C7350;
      border-radius: 10px;
      padding: 20px 22px;
      margin-bottom: 40px;
    }
    .tc-summary h2 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #295440;
      font-size: 1rem;
      font-weight: 800;
      margin: 0 0 10px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .tc-summary p {
      color: #3d4a41;
      font-size: 0.88rem;
      line-height: 1.65;
      margin: 0 0 10px;
    }
    .tc-summary p:last-child {
      margin-bottom: 0;
    }
    .tc-toc {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 14px;
      padding: 0;
      margin: 0 0 40px;
      list-style: none;
    }
    .tc-toc li a {
      display: inline-block;
      color: #295440;
      background: #fff;
      border: 1.5px solid #DCE7E1;
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 0.78rem;
      font-weight: 600;
      text-decoration: none;
    }
    .tc-toc li a:hover {
      border-color: #2C7350;
      background: #F2F6F4;
    }
    .tc-section {
      margin-bottom: 32px;
      scroll-margin-top: 90px;
    }
    .tc-section h2 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1F2A22;
      font-size: 1.15rem;
      font-weight: 800;
      margin: 0 0 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #EFE9DD;
    }
    .tc-section p {
      color: #4B5A50;
      font-size: 0.9rem;
      line-height: 1.7;
      margin: 0 0 12px;
    }
    .tc-section ul {
      margin: 0 0 12px;
      padding-left: 20px;
      color: #4B5A50;
      font-size: 0.9rem;
      line-height: 1.7;
    }
    .tc-footer-note {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #EFE9DD;
      color: #8a6040;
      font-size: 0.8rem;
      line-height: 1.6;
    }
  `],
  template: `
    <div class="tc-wrap">

      <a routerLink="/marketplace/comprador/catalogo" class="tc-back">← Volver al catálogo</a>

      <div class="tc-header">
        <h1 class="tc-title">Términos y Condiciones de Uso</h1>
        <p class="tc-version">Versión de ejemplo · Última actualización: 25 de agosto de 2026</p>
      </div>

      <div class="tc-disclaimer">
        ⚠️ <strong>Nota interna:</strong> este texto es un borrador de ejemplo, adaptado a partir de términos
        estándar de la industria del comercio electrónico para servir como punto de partida. Debe ser revisado
        y ajustado por un asesor legal antes de publicarse oficialmente en Makicol Marketplace.
      </div>

      <div class="tc-summary">
        <h2>Resumen de términos y condiciones</h2>
        <p>
          Makicol es una plataforma tecnológica que conecta a artesanas y artesanos colombianos con personas
          compradoras interesadas en piezas hechas a mano, ofreciendo herramientas de publicación, pago y
          gestión de pedidos dentro de un mismo ecosistema (el "Ecosistema Makicol").
        </p>
        <p>
          <strong>Makicol Marketplace</strong> es la plataforma de comercio electrónico donde las Personas
          Usuarias pueden vender y comprar productos artesanales usando las soluciones de pago y envío disponibles
          en el sitio.
        </p>
        <p>
          Para operar en la plataforma, todas las Personas Usuarias deben aceptar estos Términos y Condiciones y
          la Declaración de Privacidad correspondiente.
        </p>
        <p>
          Cada Persona Usuaria es responsable de los datos que entrega al registrarse, de mantenerlos actualizados
          y del resguardo de su contraseña. En algunos casos, Makicol podrá cobrar una tarifa por el uso de ciertos
          servicios, la cual la Persona Usuaria se compromete a pagar.
        </p>
      </div>

      <ul class="tc-toc">
        <li><a href="#s1">1. Makicol</a></li>
        <li><a href="#s2">2. Términos y Condiciones</a></li>
        <li><a href="#s3">3. Capacidad</a></li>
        <li><a href="#s4">4. Registro y Cuenta</a></li>
        <li><a href="#s5">5. Privacidad de datos</a></li>
        <li><a href="#s6">6. Información Comercial</a></li>
        <li><a href="#s7">7. Sanciones</a></li>
        <li><a href="#s8">8. Responsabilidad</a></li>
        <li><a href="#s9">9. Tarifas</a></li>
        <li><a href="#s10">10. Propiedad Intelectual</a></li>
        <li><a href="#s11">11. Indemnidad</a></li>
        <li><a href="#s12">12. Uso Automatizado del Sitio</a></li>
        <li><a href="#s13">13. Servicios del Ecosistema</a></li>
        <li><a href="#s14">14. Jurisdicción y Ley Aplicable</a></li>
      </ul>

      <section class="tc-section" id="s1">
        <h2>1. Makicol</h2>
        <p>
          Makicol es una compañía de tecnología que ofrece servicios vinculados al comercio electrónico de
          artesanías colombianas y a la gestión de pagos digitales asociados a esas transacciones.
        </p>
        <p>
          Los servicios que ofrece Makicol en el sitio y sus aplicaciones (de ahora en más, el "Sitio") están
          diseñados para formar un ecosistema que permita a las personas vender, comprar, pagar y enviar
          productos artesanales con tecnología aplicada (de ahora en más, el "Ecosistema Makicol").
        </p>
      </section>

      <section class="tc-section" id="s2">
        <h2>2. Términos y Condiciones</h2>
        <p>
          Estos Términos y Condiciones regulan la relación entre Makicol y las personas que usan sus servicios
          ("Personas Usuarias").
        </p>
        <p>
          La Persona Usuaria autoriza a Makicol a retener y/o debitar los fondos existentes y/o futuros de su
          cuenta dentro del Ecosistema Makicol para saldar tarifas impagas o cualquier otra deuda derivada de
          su actividad en la plataforma.
        </p>
        <p>
          Los cambios en nuestros servicios se informarán con al menos 10 días corridos de anticipación, para
          que las Personas Usuarias puedan revisarlos antes de que entren en vigencia.
        </p>
        <p>
          Las Personas Usuarias podrán finalizar su relación con Makicol cancelando su cuenta en cualquier
          momento, sin que esto extinga las obligaciones pendientes que pudieran tener con Makicol u otras
          Personas Usuarias.
        </p>
      </section>

      <section class="tc-section" id="s3">
        <h2>3. Capacidad</h2>
        <p>
          Podrán usar nuestros servicios las personas mayores de edad que tengan capacidad legal para contratar.
        </p>
        <p>
          Quien use el Ecosistema Makicol en representación de una empresa o taller artesanal deberá tener
          capacidad para contratar en su nombre. Además, para poder usar la cuenta, la Persona Usuaria debe
          encontrarse activa.
        </p>
      </section>

      <section class="tc-section" id="s4">
        <h2>4. Registro y Cuenta</h2>
        <p>
          Quien quiera usar nuestros servicios deberá completar el formulario de registro con los datos
          requeridos, comprometiéndose a hacerlo de manera exacta, precisa y verdadera, y a mantenerlos
          actualizados. La Persona Usuaria es la única responsable de la certeza de sus datos de registro.
        </p>
        <p>
          La cuenta es personal, única e intransferible: no podrá venderse ni cederse a otra persona. Se accede
          con la clave elegida, que debe mantenerse bajo estricta confidencialidad. La Persona Usuaria será
          responsable de las operaciones realizadas en su cuenta y deberá notificar de inmediato cualquier uso
          no autorizado.
        </p>
        <p>
          Makicol podrá denegar una solicitud de registro o dar de baja una cuenta existente cuando existan
          razones objetivas fundadas en incumplimientos de estos Términos, requerimientos de autoridad
          competente o motivos de prevención de riesgos para la plataforma u otras Personas Usuarias.
        </p>
      </section>

      <section class="tc-section" id="s5">
        <h2>5. Privacidad de datos</h2>
        <p>
          En Makicol hacemos un uso responsable de la información personal, protegiendo la privacidad de las
          Personas Usuarias que nos confían sus datos y adoptando las medidas necesarias para garantizar la
          seguridad dentro del Ecosistema Makicol. Conocé más en nuestra Declaración de Privacidad.
        </p>
      </section>

      <section class="tc-section" id="s6">
        <h2>6. Información Comercial</h2>
        <p>
          Se considera "Información Comercial" toda información provista y/o generada por las Personas
          Usuarias al utilizar los servicios del Ecosistema Makicol, incluyendo datos de productos publicados,
          precios, ventas, calificaciones, volumen de visitas y fechas de transacciones. Al generarse esta
          información en el Sitio, las Personas Usuarias reconocen que Makicol podrá utilizarla conforme a su
          política correspondiente.
        </p>
      </section>

      <section class="tc-section" id="s7">
        <h2>7. Sanciones</h2>
        <p>
          En caso de que la Persona Usuaria incumpla la ley o estos Términos y Condiciones, Makicol podrá
          advertir, suspender, restringir o inhabilitar temporal o definitivamente su cuenta, sin perjuicio de
          otras sanciones previstas en las reglas particulares de cada servicio.
        </p>
      </section>

      <section class="tc-section" id="s8">
        <h2>8. Responsabilidad</h2>
        <p>
          Makicol será responsable por cualquier defecto en la prestación de sus servicios, en la medida en que
          le sea imputable y con el alcance previsto en las leyes vigentes.
        </p>
      </section>

      <section class="tc-section" id="s9">
        <h2>9. Tarifas</h2>
        <p>
          Makicol podrá cobrar por sus servicios y la Persona Usuaria se compromete a pagarlos a tiempo. Podremos
          modificar o eliminar tarifas en cualquier momento respetando el preaviso establecido en la cláusula 2
          de estos Términos, o modificarlas temporalmente en el marco de promociones.
        </p>
        <p>
          La Persona Usuaria autoriza a Makicol a retener y/o debitar los fondos existentes y/o futuros de su
          cuenta dentro del Ecosistema Makicol para saldar tarifas impagas o cualquier otra deuda derivada de
          su actividad en la plataforma.
        </p>
        <p>
          Para conocer el detalle de tarifas de cada servicio, las Personas Usuarias deberán consultar los
          términos y condiciones correspondientes. En todos los casos se emitirá la factura de acuerdo con los
          datos fiscales cargados en la cuenta.
        </p>
      </section>

      <section class="tc-section" id="s10">
        <h2>10. Propiedad Intelectual</h2>
        <p>
          Makicol y/o sus sociedades relacionadas son propietarias de todos los derechos de propiedad
          intelectual sobre sus sitios, contenido, servicios, marcas, nombres comerciales, logos, diseños,
          imágenes, frases publicitarias, código fuente, bases de datos, tecnología y demás elementos
          ("Propiedad Intelectual"), protegidos por las leyes nacionales e internacionales aplicables.
        </p>
        <p>
          El permiso para usar los productos y servicios de Makicol no implica autorización para usar su
          Propiedad Intelectual, salvo consentimiento previo y expreso. Las Personas Usuarias vendedoras deberán
          operar bajo una marca o nombre comercial propio, que no genere confusión con la marca Makicol.
        </p>
        <p>
          Está prohibido usar nuestros productos o servicios para fines ilegales, realizar ingeniería inversa,
          utilizar herramientas de extracción de datos sin autorización, o crear bases de datos propias que
          incluyan nuestro contenido sin consentimiento expreso.
        </p>
      </section>

      <section class="tc-section" id="s11">
        <h2>11. Indemnidad</h2>
        <p>
          La Persona Usuaria mantendrá indemne a Makicol y sus sociedades relacionadas, así como a quienes las
          dirigen, administran, representan o trabajan en ellas, por cualquier reclamo administrativo o judicial
          iniciado por otras Personas Usuarias, terceros o autoridades, relacionado con sus actividades en el
          Ecosistema Makicol.
        </p>
      </section>

      <section class="tc-section" id="s12">
        <h2>12. Uso Automatizado del Sitio y Acceso a la Información</h2>
        <p>
          Queda prohibido el uso de sistemas automatizados (bots, spiders, scrapers, crawlers, entre otros) para
          acceder, indexar, extraer, copiar, almacenar o reutilizar contenido del Sitio sin autorización expresa
          de Makicol, especialmente respecto de:
        </p>
        <ul>
          <li>Contenido protegido por derechos de propiedad intelectual (textos, imágenes, código, marcas, etc.).</li>
          <li>Información o funcionalidades disponibles solo mediante autenticación previa.</li>
          <li>Cualquier dato personal o información identificable.</li>
          <li>Actividades automatizadas que puedan afectar la estabilidad o disponibilidad del Sitio.</li>
        </ul>
        <p>
          Makicol se reserva el derecho de limitar o bloquear el uso automatizado indebido y de ejercer las
          acciones legales que correspondan, sin perjuicio de suspender o restringir el acceso al Sitio.
        </p>
      </section>

      <section class="tc-section" id="s13">
        <h2>13. Servicios del Ecosistema Makicol</h2>
        <p>
          Además de estos Términos y Condiciones, cada servicio del Ecosistema Makicol cuenta con sus propias
          reglas de uso específicas:
        </p>
        <ul>
          <li>Makicol Marketplace</li>
          <li>Pagos Makicol</li>
          <li>Envíos Makicol</li>
        </ul>
      </section>

      <section class="tc-section" id="s14">
        <h2>14. Jurisdicción y Ley Aplicable</h2>
        <p>
          Estos Términos y Condiciones se rigen por la ley colombiana. Toda controversia derivada de su
          aplicación, interpretación, ejecución o validez será resuelta por los tribunales nacionales
          ordinarios competentes, salvo disposición específica de normas de orden público, como la legislación
          de protección al consumidor.
        </p>
        <p>
          Para todos los efectos relacionados con estos Términos y Condiciones y con el uso del Sitio,
          <strong> Makicol Marketplace S.A.S.</strong> (NIT de ejemplo: 900.000.000-0) establece como domicilio
          <em> [Dirección de ejemplo], Bogotá D.C., Colombia</em>.
        </p>
      </section>

      <p class="tc-footer-note">
        Este contenido fue generado como plantilla de referencia y debe adaptarse a la operación real de
        Makicol, sus servicios vigentes y la normativa colombiana aplicable antes de publicarse.
      </p>

    </div>
  `,
})
export class TerminosComponent {}
