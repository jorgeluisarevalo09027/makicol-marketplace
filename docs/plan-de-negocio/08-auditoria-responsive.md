# 08 — Auditoría de responsive design

> Revisión del comportamiento responsive del sitio de la propuesta (`makicol_marketplace_poposal`, Angular 22
> standalone). El objetivo es documentar, sin corregir código todavía, los problemas de visualización en
> pantallas pequeñas (~360–414 px) y tablet (~768 px). El análisis se basa en el CSS, las clases y la
> estructura de cada componente; no hay capturas de pantalla.

## 1. Alcance y método

El sitio tiene dos generaciones de componentes conviviendo:

- **Grupo A — recorrido principal** (`src/app/features/`: `hero`, `problem-solution`, `market`, `team`,
  `product`, `business-model`, `operations`, `roadmap`, `financial`, `deep-dives`; y `src/app/shared/navbar`,
  `section-header`). Usa Tailwind con breakpoints y, en varios casos, grids inline con `@media` propios.
  El navbar tiene menú móvil funcional.
- **Grupo B — apéndices** (rutas aparte, carga diferida: `database-design`, `api-contract`,
  `backoffice-evaluation`, `international-shipping`, `technical`). Usa estilos **inline** con anchos fijos
  (`max-width:1000/1100px`, `padding:0 20px`) y `@media` manuales por componente.

El `index.html` ya incluye `<meta name="viewport" content="width=device-width, initial-scale=1">` y
`styles.css` aplica `body { overflow-x: hidden; }`, lo que **oculta** el desbordamiento horizontal pero no lo
resuelve: el contenido afectado queda recortado o comprimido en móvil.

Se revisaron los `.ts` (template inline) de todos los componentes de ambos grupos, la hoja global
`src/styles.css` (utilidades `glass-card`, `mk-eyebrow`, `mk-badge`, `section-*`, `mk-*`, variables `--mk-*`)
y la tabla `financial/cost-table`. El componente `architecture` (`arch-diagram`, `scalability-phases`) existe
en el repo pero **no está enrutado ni importado** en el recorrido, por lo que queda fuera del alcance.

Prioridad: **Alta** = rompe la lectura o genera desbordamiento/recorte en móvil; **Media** = degrada la
experiencia o la ergonomía táctil sin romperla; **Baja** = pulido y consistencia.

## 2. Hallazgos — componentes compartidos (`shared`)

| # | Prioridad | Componente / archivo | Hallazgo | Recomendación |
|---|---|---|---|---|
| 1 | **Alta** | `shared/section-header/section-header.component.ts` | El `<h2>` del título lleva `style="...white-space: nowrap;"`. Títulos largos como "Costos, financiación y valor del trabajo" o "Un sector grande, en crecimiento y poco digitalizado" no pueden partir de línea; a ~360–414 px fuerzan desbordamiento (oculto por `overflow-x:hidden` del body → texto recortado). Además el título va flanqueado por dos filetes dorados (`flex-1`) que compiten por el ancho. | Quitar `white-space: nowrap` y dejar que el título fluya en varias líneas; o aplicarlo solo desde `sm:`/`md:` hacia arriba. En móvil, considerar ocultar o acortar los filetes dorados laterales (`max-width:140px`) para que el título tenga el ancho completo. |
| 2 | Media | `shared/section-header` | `text-3xl sm:text-4xl` (≈1.875→2.25 rem) sí escala, pero combinado con el `nowrap` del hallazgo #1 el beneficio se pierde. El `mb-12` (3 rem) y el `w-14 h-14` del ícono son fijos y correctos. | Al resolver #1, el tamaño ya escala bien. Opcional: reducir el margen inferior en móvil (`mb-8 md:mb-12`). |
| 3 | Media | `shared/navbar/navbar.component.ts` | El menú móvil **funciona** (toggle con signal `menuOpen`, íconos hamburguesa/✕, links a ancho completo con `text-align:left`). Los enlaces `.mk-navlink` tienen `padding: 0.5rem 0.9rem` → alto ≈ 32 px, por debajo del mínimo táctil recomendado (~44 px). En el panel desplegable los links quedan muy juntos verticalmente (`gap:0.25rem`). | Subir el `padding` vertical de `.mk-navlink` a ~`0.75rem` en el menú móvil (o `min-height:44px`) y aumentar el `gap` del panel a ~`0.5rem`. |
| 4 | Baja | `shared/navbar` | El contenedor usa inline `max-width:1100px; padding:0 1.25rem`, fuera del patrón Tailwind del resto del recorrido. En móvil el padding de 1.25 rem es razonable, no genera problema, pero rompe homogeneidad. | Al homogeneizar, migrar a `max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8` como el resto del Grupo A. |

## 3. Hallazgos — recorrido principal (Grupo A)

| # | Prioridad | Componente / archivo | Hallazgo | Recomendación |
|---|---|---|---|---|
| 5 | **Alta** | `hero/hero.component.ts` | Las "tres claves" usan grid inline `grid-template-columns:repeat(3,1fr)` **sin `@media`** que lo colapse. A 360–414 px quedan 3 tarjetas de ~110 px con texto apretado ("Arranque regional, con expansión nacional por fases" en una columna estrechísima). | Añadir media query que pase a 1 columna en móvil (patrón del resto: `@media (max-width:760px){ grid-template-columns:1fr }`), o migrar a `grid-cols-1 sm:grid-cols-3`. |
| 6 | Baja | `hero/hero.component.ts` | El `<h1>` usa `font-size:clamp(2.2rem, 5.5vw, 3.6rem)` y el subtítulo `clamp(1.3rem, 2.5vw, 1.8rem)`: escalan bien. Los CTA son `.mk-btn`/`.mk-btn-ghost` con `padding:0.85rem 1.6rem` (alto táctil correcto) y el contenedor hace `flex-wrap`. Sin problema real; se anota como referencia del patrón deseable. | Mantener como patrón de referencia para los grids que sí fallan. |
| 7 | **Alta** | `operations/operations.component.ts` | Grid principal `repeat(3,1fr)` que colapsa **directo a 1 columna** en `@media (max-width:900px)`. En tablet (768 px) ya está en 1 columna (pierde el aprovechamiento de 2 columnas), pero el problema mayor es que no hay escalón intermedio. Funciona, pero desperdicia ancho en tablet. | Añadir escalón intermedio de 2 columnas para tablet: `@media (max-width:900px){repeat(2,1fr)}` + `@media (max-width:560px){1fr}`, como hace `product`. |
| 8 | Media | `business-model/business-model.component.ts` | La fila "Cómo se financia" es `repeat(4,1fr)` y la comparativa A/B es `repeat(2,1fr)`; ambas colapsan a `1fr` en `@media (max-width:820px)`. El salto de 4→1 columna deja las 4 fuentes de financiación en una sola columna muy larga en tablet. | Añadir escalón de 2 columnas para la fila de 4 (`@media (max-width:900px){repeat(2,1fr)}`) antes de colapsar a 1. |
| 9 | Media | `product/product.component.ts` | Correcto como referencia: `repeat(4,1fr)` → `repeat(2,1fr)` a 900 px → `1fr` a 560 px, con dos escalones. Se anota como el patrón a replicar en #5, #7, #8, #10. | Usar como plantilla de breakpoints para los grids de 3–4 columnas del Grupo A. |
| 10 | Media | `roadmap/roadmap.component.ts` | Las métricas (`repeat(4,1fr)`) y el crecimiento (`repeat(2,1fr)`) colapsan directo a `1fr` en `@media (max-width:820px)`. Cuatro métricas en una columna única en tablet desperdician ancho. La línea de tiempo de fases (flex column con círculos de 2.5 rem) sí responde bien. | Igual que #8: escalón de 2 columnas para la fila de 4 métricas antes de 1. |
| 11 | Baja | `market/market.component.ts` | Bien resuelto: `.mk-stats` pasa de 4→2 columnas a 900 px y la tabla de competencia (`.comp-row` grid `1.2fr 1fr 1.3fr`) colapsa a 1 columna ocultando el encabezado (`.comp-head{display:none}`) a 760 px. Nota menor: al colapsar, las celdas pierden sus etiquetas de columna (Canal/Qué es/Límite), lo que puede confundir en móvil. | Opcional: en móvil anteponer la etiqueta de cada celda (p. ej. con `::before` o un `<span>` de rótulo) para no perder el contexto de columna. |
| 12 | Baja | `problem-solution`, `team`, `deep-dives` | Todos colapsan correctamente a 1 columna (`.ps-grid` a 820 px, `.team-grid` y `.dd-grid` a 760 px). `team` usa foto `84×84` fija + texto en flex; en móvil estrecho el texto junto a la foto queda algo apretado pero legible. `deep-dives` usa `.dd-card` con `padding:1.5rem` (táctil amplio, correcto). | Sin acción obligatoria. Opcional: en `team`, permitir que la tarjeta pase la foto arriba del texto (`flex-direction:column`) en móviles muy estrechos. |

## 4. Hallazgos — plan financiero y tabla de costos

| # | Prioridad | Componente / archivo | Hallazgo | Recomendación |
|---|---|---|---|---|
| 13 | **Alta** | `financial/cost-table/cost-table.component.ts` | La tabla usa `grid grid-cols-12` (12 columnas: `col-span-5/3/2/2`) **sin prefijos responsive**. A 360–414 px las 12 columnas se mantienen: "Servicio" (ícono + nombre + descripción larga) queda en ~5/12 del ancho = ~150 px, ilegible; "Tier", "Base" y "Escalado" se comprimen a franjas mínimas. El contenedor `.glass-card` tiene `overflow-hidden`, así que no hay scroll horizontal: el contenido se aplasta. La fila total (`flex justify-between` con bloques `gap-6`) también se apiña. | Opción A (homogénea): envolver la tabla en un contenedor con `overflow-x:auto` y darle un `min-width` (p. ej. 640 px), como hacen las tablas de `international-shipping`. Opción B (mejor en móvil): en `< sm` renderizar cada servicio como tarjeta apilada (label + valor) en vez de rejilla de 12 columnas. |
| 14 | Media | `financial/cost-table` | Tipografía y badges con tamaños muy pequeños ya de base (`text-xs`, `text-[10px]` en otras tablas del mismo estilo); al comprimirse por el #13 se vuelven aún menos legibles. El `font-mono` de los montos ayuda, pero los `$` y cifras quedan pegados al borde derecho. | Al resolver #13 (scroll o tarjetas), el tamaño deja de ser crítico. Revisar que los montos conserven padding lateral. |
| 15 | Media | `financial/financial.component.ts` | El selector de escenario (presets 50/200/500/1000) usa `flex gap-2` con botones `px-3 py-1.5` (alto ≈ 30 px, por debajo de ~44 px táctil) junto al indicador de usuarios; en móvil estrecho los 4 botones + etiqueta + número pueden no caber en una línea cómoda. El resto de la sección usa `grid-cols-1 sm:grid-cols-3` correctamente (buen patrón). | Subir el alto táctil de los presets (`py-2`+) y permitir `flex-wrap` en la fila del selector. Mantener los `grid-cols-1 sm:grid-cols-3` del resto. |

## 5. Hallazgos — apéndices (Grupo B)

| # | Prioridad | Componente / archivo | Hallazgo | Recomendación |
|---|---|---|---|---|
| 16 | **Alta** | `technical/feature-matrix/feature-matrix.component.ts` | La matriz usa `grid grid-cols-12` (`col-span-4/4/4`) **sin responsive** y sin contenedor con scroll. A 360–414 px las tres columnas (Característica / PWA / Nativa) se comprimen; el detalle de cada rating ya se oculta en móvil (`hidden sm:block`), lo que ayuda, pero las etiquetas Excelente/Bueno/… y los íconos `●●●` quedan muy apretados. El filtro de categorías (`flex-wrap gap-2`, botones `px-3 py-1.5`) sí envuelve. | Envolver la matriz en `overflow-x:auto` con `min-width` (~560–640 px), o rediseñar a tarjetas apiladas por característica en `< sm`. Subir el alto táctil de los botones de filtro. |
| 17 | **Alta** | `technical/comparison-cards/comparison-cards.component.ts` | La tarjeta usa `grid grid-cols-1 lg:grid-cols-2` (bien: 1 columna hasta `lg`). Pero **dentro** de cada tarjeta hay `grid grid-cols-3` (métricas) y `grid grid-cols-2` (ventajas/limitaciones) **sin prefijos responsive**: a 360 px las 3 métricas y las 2 columnas de pros/cons se comprimen con textos `text-[10px]`/`text-xs` muy pequeños. | Hacer responsive los grids internos: métricas `grid-cols-1 xs:grid-cols-3` o mantener 3 pero con texto legible; pros/cons `grid-cols-1 sm:grid-cols-2` para que apilen en móvil. |
| 18 | Media | `technical/*` (matrix y cards) | Tamaños de fuente fijos muy pequeños: `text-[10px]` y `text-[11px]` en métricas, detalles y pills. En móvil quedan por debajo del mínimo cómodo de lectura. | Elevar a `text-xs` mínimo en móvil; reservar los `[10px]` para `sm:` hacia arriba. |
| 19 | Media | `technical/technical.component.ts` | El header del apéndice es inline `max-width:1100px; padding:0 20px` y el `<h1>` tiene `font-size:2.1rem` **fijo** (no escala). En 360 px, 2.1 rem para "Aplicación web vs. app nativa" es grande pero cabe; títulos de otros apéndices con `<br>` fuerzan saltos. Consistencia rota respecto al `clamp()` del Grupo A. | Migrar los `<h1>` de los apéndices a `font-size:clamp(1.6rem, 5vw, 2.1rem)` para que escalen; homogeneizar el contenedor a `px-4 sm:px-6 lg:px-8`. |
| 20 | **Alta** | `database-design/database-design.component.ts` — barra de controles del modal | La barra de zoom del modal del diagrama ER está `position:fixed; top:14px; right:14px; left:14px` con `justify-content:space-between` y `flex-wrap:wrap`. En móvil, la caja de texto de ayuda ("Usa la rueda del ratón… Arrastra… Doble clic…") ocupa casi todo el ancho y empuja los 4 botones de zoom (−, %, +, ✕) a una segunda fila pegada; el texto "rueda del ratón" además no aplica en táctil. Riesgo de solape/apiñamiento con el diagrama justo debajo. | En móvil ocultar o acortar el texto de ayuda (mostrar solo en `md:`), o cambiarlo por una pista táctil ("Pellizca para zoom · arrastra para mover"). Asegurar que los controles queden en una fila propia con separación del borde. |
| 21 | Media | `database-design` — modal, touch targets | Los botones de zoom son `38×38 px` (−, +, ✕) y el `%` tiene alto 38 px: justo por debajo del mínimo táctil (~44 px). El pan/zoom táctil está implementado (`touchstart/touchmove`) pero no hay gesto de pellizco (solo arrastre), lo que limita el zoom en móvil a los botones pequeños. | Subir los controles a ~`44×44 px`. Opcional: añadir zoom por pellizco (pinch) para móvil; hoy el zoom depende de rueda (desktop) o botones chicos. |
| 22 | Media | `database-design` — diagrama embebido | El diagrama ER en la vista normal está en un contenedor con `overflow-x:auto` y la imagen con `max-width:100%; height:auto`: correcto, el SVG se reduce al ancho y no desborda. La rejilla de entidades `.db-grid` colapsa bien (3→2 a 900 px, →1 a 600 px). Nota: al reducir el SVG a ~360 px de ancho, el diagrama de 29 tablas queda ilegible, aunque el modal lo compensa. | Sin acción estructural. El modal ya es la vía de lectura en móvil; ver #20/#21 para mejorarlo. |
| 23 | Media | `international-shipping/international-shipping.component.ts` | Buen patrón de referencia para tablas: las tablas (`.is-table`) van en contenedores `overflow-x:auto` y en `@media (max-width:800px)` reciben `min-width:640px` → scroll horizontal en vez de aplastarse. Los grids `.is-grid-3`/`.is-grid-2` colapsan a 1 columna a 800 px. Nota: hay un `style="overflow-x-auto: auto; overflow-x:auto;"` con una propiedad inventada (`overflow-x-auto`) junto a la válida; funciona por la segunda, pero es un residuo. | Replicar este patrón (`overflow-x:auto` + `min-width`) en `cost-table` (#13) y `feature-matrix` (#16). Limpiar la propiedad inválida `overflow-x-auto`. |
| 24 | Media | `international-shipping/shipping-flow-diagram/shipping-flow-diagram.component.ts` | Los nodos del flujo usan `flex-wrap:wrap` con botones `min-width:150px; max-width:190px`: en 360 px un nodo de 150 px cabe (1 por fila), correcto. El panel de detalle usa `flex` con `justify-content:space-between`; el `tag` tiene `white-space:nowrap`, que en etiquetas largas podría empujar el layout, aunque los tags actuales son cortos. Alto táctil de los nodos: amplio (padding 16px), correcto. | Sin acción urgente. Vigilar el `white-space:nowrap` del tag si se añaden etiquetas largas. |
| 25 | Media | `api-contract`, `backoffice-evaluation` | Son páginas de solo texto en tarjetas (`max-width:1000px; padding:0 20px`, header `flex-wrap:wrap`). No tienen grids ni tablas que desborden. Los `<h1>` usan `font-size:2.1rem` fijo (mismo caso que #19). Los enlaces del header (`font-size:0.82rem`) con `gap:16px` son pequeños como blanco táctil pero el `flex-wrap` evita desbordes. | Aplicar el `clamp()` a los `<h1>` (#19). Opcional: aumentar el área táctil de los enlaces del header en móvil. |
| 26 | Baja | Grupo B — paddings laterales fijos | Todos los apéndices usan `padding:… 20px` lateral fijo y secciones hero con `padding:48–56px 20px`. En 360 px, 20 px por lado es aceptable; los heroes con 56 px vertical son algo altos pero no rompen. Inconsistente con `px-4 sm:px-6 lg:px-8` del Grupo A. | Homogeneizar a utilidades Tailwind al migrar; no es urgente. |

## 6. Observaciones transversales

- **`overflow-x: hidden` en el `body`** enmascara los desbordamientos de los hallazgos #1, #5, #13, #16 y #17:
  no habrá barra de scroll horizontal, pero el contenido se recorta o se aplasta. Conviene resolver la causa,
  no confiar en el ocultamiento.
- **Patrón sano ya presente en el repo:** `international-shipping` (tablas con `overflow-x:auto` + `min-width`)
  y `product` (grids con dos escalones 4→2→1) son la referencia interna para homogeneizar el resto.
- **Touch targets:** varios controles quedan en ~30–38 px de alto (navlinks móviles, presets del financiero,
  botones de filtro de la matriz, controles del modal ER). El mínimo cómodo es ~44 px.
- **Tipografía fija:** los `<h1>` de los apéndices (`2.1rem` fijo) y los textos `text-[10px]/[11px]` de los
  componentes `technical` no escalan; el Grupo A ya usa `clamp()` y conviene extenderlo.

## 7. Resumen priorizado

### Prioridad Alta (romper lectura / desbordamiento en móvil)

1. **#1** `section-header`: `white-space: nowrap` en el título → recorte de títulos largos en móvil.
2. **#5** `hero`: grid de "tres claves" `repeat(3,1fr)` sin colapsar en móvil.
3. **#7** `operations`: grid `repeat(3,1fr)` sin escalón de 2 columnas (afecta tablet).
4. **#13** `financial/cost-table`: `grid-cols-12` sin responsive dentro de `overflow-hidden` → tabla aplastada.
5. **#16** `technical/feature-matrix`: `grid-cols-12` sin responsive ni scroll.
6. **#17** `technical/comparison-cards`: grids internos `grid-cols-3`/`grid-cols-2` sin responsive.
7. **#20** `database-design`: barra de controles del modal ER se apiña/solapa en móvil (texto de ayuda largo).

### Prioridad Media (ergonomía y aprovechamiento del ancho)

- Touch targets por debajo de ~44 px: **#3** (navlinks), **#15** (presets financiero), **#16/#18** (filtros y
  tipografía de `technical`), **#21** (controles del modal ER).
- Escalones de grid ausentes en tablet: **#8** (`business-model` 4→1), **#10** (`roadmap` 4→1).
- Tipografía fija que no escala: **#19/#25** (`<h1>` de apéndices a `clamp()`), **#18** (`text-[10px]`).
- Tablas/diagramas: **#14** (legibilidad de `cost-table`), **#22** (SVG ER minúsculo en móvil), **#23/#24**
  (`international-shipping`, ya correctos; limpiar `overflow-x-auto` inválido).

### Prioridad Baja (consistencia y pulido)

- **#2** márgenes del `section-header`, **#4** contenedor inline del navbar, **#6** hero (referencia),
  **#9/#11/#12** grids ya resueltos del Grupo A (referencia / rótulos de columna en `market`),
  **#26** paddings laterales fijos del Grupo B.

### Recomendación de enfoque

Homogeneizar hacia el patrón del Grupo A: grids con `grid-cols-1 sm:/md:/lg:` (o `@media` con dos escalones
4→2→1), tablas anchas dentro de `overflow-x:auto` con `min-width` (como `international-shipping`), títulos con
`clamp()` y sin `nowrap`, y controles con alto táctil ≥ 44 px. Las mayores ganancias están en `cost-table`,
`feature-matrix`, `comparison-cards`, el `hero` y el modal ER de `database-design`.
