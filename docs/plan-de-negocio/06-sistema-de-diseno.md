# 06 — Sistema de diseño de la web `proposal`

> Dirección visual y tokens para el rediseño de la web. Decisión del usuario (26-oct-2026):
> **Artesanal cálido y editorial**. Rige `00-reglas-del-proceso.md` (la web es la presentación).
> Reemplaza el enfoque visual anterior (hero "tech oscuro" + secciones beige + hack de colores de Tailwind).

## 1. Dirección: artesanal cálido y editorial

- **Sensación:** hecho a mano, cálido, premium, con reposo editorial (mucho espacio en blanco, tipografía
  grande, lectura cómoda). Un **solo lenguaje visual** en todo el recorrido, sin el salto hero oscuro ↔ secciones claras.
- **Audiencia:** inversionistas y patrocinadores. Serio pero con alma; nada de saturación ni decoración vacía.
- **Qué se retira:** orbes flotantes, grids, glow y blur del hero; estilos inline con hex sueltos; el hack de
  reasignar `sky`/`amber` de Tailwind y los parches `section:not(#hero)...`.

## 2. Paleta

Base clara tipo papel; verde Makicol como color principal; dorado y terracota como acentos cálidos.
Acentos (azul, rojo) solo en dosis mínimas, nunca como fondo grande.

| Token | Hex | Uso |
|---|---|---|
| `--mk-paper` | `#FBF8F0` | Fondo general (papel crema). |
| `--mk-paper-alt` | `#F4EFE3` | Fondo de sección alterna (banda cálida sutil). |
| `--mk-surface` | `#FFFFFF` | Tarjetas, navbar, paneles. |
| `--mk-ink` | `#23312A` | Texto principal (verde casi negro, más cálido que el negro puro). |
| `--mk-ink-soft` | `#5A6B60` | Texto secundario. |
| `--mk-green` | `#2C7350` | **Primario** — fondos de botón, pills activas, banners, acentos fuertes. |
| `--mk-green-deep` | `#1C4D36` | Hover de primario, texto sobre claro, títulos de marca. |
| `--mk-green-tint` | `#E7F0EA` | Fondos suaves, chips, hover de filas. |
| `--mk-terracotta` | `#C46A4B` | Acento cálido artesanal (destacados, iconos, detalles). |
| `--mk-terracotta-tint` | `#F6E7DF` | Fondo suave del acento cálido. |
| `--mk-gold` | `#C9A227` | Bordes, separadores y detalles finos (dorado maduro, menos chillón que el amarillo puro). |
| `--mk-sand` | `#E8DEC6` | Bordes suaves, divisores sobre papel. |

**Acentos puntuales (solo detalles, nunca fondo grande):** azul `#2F5C9E`, rojo/alerta `#B23A48`.
**Estados semánticos:** éxito = `--mk-green`; aviso/propuesta = `--mk-gold` sobre `--mk-terracotta-tint`;
error = rojo acento.

**Regla de marcas de contenido (regla 9):**
- "en el demo hoy" → verde (`--mk-green-tint` fondo, `--mk-green-deep` texto).
- "propuesta / no existe hoy" → ámbar cálido (`--mk-terracotta-tint` fondo, texto `#8A5A2B`).

## 3. Tipografía (se conserva)

- **Títulos / wordmark:** Plus Jakarta Sans (700–800).
- **Cuerpo / UI:** Montserrat (400–600).
- **Escala editorial:** títulos grandes y aireados; cuerpo 16–18px; interlineado cómodo (1.6–1.7).

## 4. Componentes base (limpios, con tokens)

- **`mk-section`**: contenedor de sección con ancho máximo (~1100px), padding vertical generoso, fondo papel o
  alterno. Rótulo de momento del recorrido arriba (ver §6).
- **`mk-card`**: tarjeta blanca, radio 14–16px, sombra suave, borde fino `--mk-sand`. (Sustituye `glass-card`;
  se retira el borde izquierdo dorado como estilo por defecto, pasa a ser variante.)
- **`mk-badge`**: chip de estado/momento (verde, ámbar o neutro).
- **`mk-btn` / `mk-btn-ghost`**: botón primario (fondo verde, texto claro) y secundario (contorno).
- **`mk-eyebrow`**: etiqueta pequeña en mayúsculas sobre el título de sección.
- **`mk-divider`**: separador fino dorado, discreto.

## 5. Reglas de implementación

1. **Tokens, no hex sueltos.** Todo color sale de las variables `--mk-*`. Prohibido hex inline en los
   componentes nuevos (alineado con el espíritu del front real).
2. **Sin reasignar paletas de Tailwind.** Se elimina el truco de `sky`/`amber` y los parches `:not(#hero)`.
   Se usan clases/utilidades propias `mk-*` o utilidades de Tailwind neutrales.
3. **Un solo lenguaje visual.** Mismo fondo de familia (papel) en todo; el contraste se logra con bandas
   alternas (`--mk-paper` / `--mk-paper-alt`) y tarjetas, no con un hero oscuro aparte.
4. **Decoración mínima.** Nada de orbes, grids ni glow. A lo sumo, texturas sutiles o un filete dorado.
5. **Accesibilidad.** Contraste AA en texto; foco visible; no depender solo del color para el significado
   (las marcas de estado llevan texto, no solo color).

## 6. El recorrido y sus momentos (visual)

Cada sección muestra un `mk-eyebrow` con el momento del recorrido (regla 7):
- **Qué buscamos** → eyebrow verde.
- **Qué tenemos hoy** → eyebrow con check, acento verde (lo construido y verificado).
- **A dónde vamos** → eyebrow ámbar (lo propuesto).

## 7. Alcance del cambio

- `styles.css`: reescribir tokens y utilidades `mk-*`; retirar el hack de `sky`/`amber` y los parches de texto.
- Componentes nuevos del Bloque B: construidos solo con el nuevo sistema.
- Componentes existentes (hero, financial, navbar, apéndices): se migran al nuevo sistema a medida que el
  Bloque B los toca. Mientras tanto siguen funcionando (los tokens viejos se mantienen como alias hasta migrar).
