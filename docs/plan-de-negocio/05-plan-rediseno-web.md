# 05 — Plan de rediseño de la web `proposal`

> Spec/plan para reorganizar el proyecto Angular `proposal` como un recorrido narrativo de plan de negocio.
> Rige `00-reglas-del-proceso.md` (la web es la presentación; la fuente son los documentos `docs/plan-de-negocio/`),
> la estructura de `02-estructura-objetivo.md` y las correcciones técnicas de `03-verificacion-tecnica-backend.md`.
> Este documento es el **qué y el porqué**; las tareas concretas van en la sección final.
>
> **Estado: borrador, pendiente de aprobación del usuario antes de tocar código.**

## 1. Objetivo

Que la web guíe al lector en el recorrido de tres momentos (regla 7) —**qué buscamos → qué tenemos hoy → a
dónde vamos**— explicando lo necesario en el hilo principal y dejando los detalles profundos al final (regla 8),
con todo detalle técnico sincronizado con el backend o rotulado como `estado objetivo` (regla 9).

## 2. Qué hay hoy vs. qué se busca

**Hoy** la página principal (`proposal.component.ts`) renderiza cuatro bloques organizados por módulo técnico:
`hero → financial → technical → architecture`. El navbar ofrece: Inicio, Módulo Financiero, Plataforma técnica,
Arquitectura. Es una organización **por tema técnico**, no por narrativa de negocio. Los apéndices
(envíos internacionales, back-office, base de datos, contrato API) cuelgan como rutas sueltas enlazadas desde
el hero.

**Se busca** una organización **por narrativa de negocio** (las 13 secciones de `02`), con los apéndices
agrupados de forma explícita al final como "detalles profundos".

## 3. Mapa: secciones del plan → bloques de la web

| § (estructura objetivo) | Momento | Bloque en la web | Origen |
|---|---|---|---|
| §1 Resumen ejecutivo | Qué buscamos | Hero (reescrito) | `hero` actual |
| §2 Descripción del negocio | Qué buscamos | Bloque "Qué es Makicol" | nuevo (de `04` §3) |
| §3 Problema y solución | Qué buscamos | Bloque "Problema y solución" | nuevo (de `04` §3) |
| §4 Análisis de mercado | Qué buscamos | Bloque "Mercado" | nuevo (de `04` §4) |
| §5 Competencia y ventaja | Qué buscamos | Bloque "Competencia" | nuevo (de `04` §5) |
| §6 Modelo de negocio | A dónde vamos | Bloque "Modelo B, patrocinio" | nuevo (de `analisis` O3) |
| §7 Producto y plataforma | Qué tenemos hoy | Bloque "El demo construido" | `technical` + demo + roles |
| §8 Marketing y adquisición | A dónde vamos | Bloque "Cómo crecemos" | nuevo (de `04` §8) |
| §9 Operaciones | A dónde vamos | Bloque "Pagos, envíos, identidad" | nuevo (de `analisis` O/A) |
| §10 Organización y equipo | Qué buscamos | Bloque "Equipo y aliados" | nuevo (de `analisis` + `04` §10) |
| §11 Hitos y métricas | A dónde vamos | Bloque "Plan y fases" | nuevo (de `04` §11) |
| §12 Plan financiero | A dónde vamos | `financial` (reubicado) + valoración | `financial` + `valoracion` |
| §13 Apéndices | Detalles | Sección "Detalles profundos" con accesos | rutas existentes |

**Qué pasa con los bloques actuales:**
- `hero` → se reescribe como §1 (resumen ejecutivo del recorrido).
- `financial` → se conserva, se mueve a §12 y su encabezado se ajusta ("Módulo 01" deja de tener sentido).
- `technical` → se reubica en §7 (producto) y aporta a §13.
- `architecture` → pasa a §13 (apéndice), con marca de sincronía.

## 4. Principios de diseño del recorrido

1. **Un hilo, tres momentos.** Un rótulo visible indica en qué momento está el lector
   (Qué buscamos / Qué tenemos hoy / A dónde vamos).
2. **Navbar por narrativa.** Los enlaces dejan de ser "Módulo Financiero/Técnico" y pasan a los momentos o a
   las secciones clave (p. ej. Visión · Mercado · Producto · Modelo · Plan · Detalles).
3. **Detalles al final.** Una sección "Detalles profundos" agrupa los accesos a los apéndices, en vez de
   dispersarlos en el hero.
4. **Marcas de estado visibles.** Lo que es `estado objetivo` (pagos, envíos, Auth0, estados nuevos) lleva un
   distintivo visual de "propuesta / no implementado"; lo verificado puede mostrar "en el demo hoy".
5. **Reutilizar lo que existe.** `SectionHeaderComponent`, la paleta, `glass-card` y los componentes de
   apéndice se conservan; no se rehace el design system.

## 5. Componentes: crear / cambiar / reutilizar

**Reutilizar sin cambios:** `SectionHeaderComponent`, estilos globales (`glass-card`, paleta, animaciones),
`cost-table`, y los componentes de apéndice `international-shipping`, `backoffice-evaluation`, `api-contract`.

**Cambiar:**
- `proposal.component.ts`: nueva composición del recorrido (todas las secciones nuevas + reubicadas).
- `navbar.component.ts`: enlaces por narrativa; mantener el comportamiento de scroll.
- `hero.component.ts`: reescribir como resumen ejecutivo; mover los enlaces de apéndice a la sección de detalles.
- `financial.component.ts`: reubicar a §12; ajustar el encabezado ("Módulo 01" → "Plan financiero").
- `database-design.component.ts`: **corrección técnica obligatoria** (ver §6).

**Crear (bloques narrativos nuevos, un componente por sección):**
`business-description` (§2), `problem-solution` (§3), `market` (§4), `competition` (§5), `business-model` (§6),
`product` (§7, puede absorber `technical`), `growth` (§8), `operations` (§9), `team` (§10), `roadmap` (§11),
`deep-dives` (§13, el índice de detalles). Cada uno consume el contenido ya redactado en `04` y en
`analisis-plan-de-negocio.md`.

## 6. Correcciones técnicas obligatorias (de `03`)

1. **Fichas de `database-design`:** reemplazar los nombres del diseño v6 (`MkUser`, `MkOrder`, esquema
   `makicol`, relato de "Feria Artesanal") por los **nombres reales del backend** (`User`, `Order`, esquema
   `dbo`, sin prefijo). La imagen v7 ya es correcta; se alinean las fichas con ella.
2. **Estado "Cancelado":** la ficha de estados del pedido debe listar los **5** estados (Recibido, En
   preparación, Enviado, Entregado, Cancelado), no 4.
3. **Estados nuevos de pagos y envíos** (`Novedad`, `Recaudado`, `Devolución`, `Devuelto`, `Liquidado`,
   `GuiaGenerada`): mostrarlos siempre con distintivo `estado objetivo` / "propuesta, no existe hoy".
4. **Relato de "Feria Artesanal":** retirarlo o moverlo a una nota histórica rotulada; el backend no lo adoptó.

## 7. Entregable y verificación

- La web compila (`ng build`) y conserva el comportamiento de navegación (scroll suave, menú móvil, SSR).
- Ninguna afirmación nueva en la web sin respaldo en la fuente (regla 10).
- Los apéndices técnicos llevan su marca de sincronía (regla 9).

## 8. Plan de tareas (estado)

**Bloque A — Correcciones técnicas:** ✅ completado (26-oct-2026)
1. ✅ Fichas de `database-design` a nombres reales del backend; "Cancelado" añadido; estados nuevos rotulados
   como propuesta; relato de Feria convertido en nota histórica; distintivo de sincronía por ficha.

**Bloque B — Reestructuración narrativa + rediseño visual:** ✅ completado (26-oct-2026)
0. ✅ Sistema de diseño nuevo ("artesanal cálido y editorial") en `styles.css` (ver `06-sistema-de-diseno.md`);
   retirado el hack de `sky`/`amber` y los parches `:not(#hero)`; alias de compatibilidad para lo no migrado.
2. ✅ `hero` reescrito como §1 (resumen ejecutivo), fondo claro, sin orbes.
3. ✅ Bloques "Qué buscamos": `problem-solution` (§2-§3) y `market` (§4-§5).
4. ✅ `product` (§7, el demo construido) y `business-model` (§6).
5. ✅ `operations` (§9) y `roadmap` (§8 crecimiento + §11 plan y métricas).
6. §10 "equipo y aliados": **pendiente** (contenido breve; se puede integrar en hero o en una franja propia).
7. ✅ `financial` reubicado a §12, encabezado ajustado y marcado como "A dónde vamos".
8. ✅ `deep-dives` (§13): agrupa los accesos a los apéndices con su marca de sincronía.
9. ✅ `navbar` con navegación por narrativa.
10. ✅ `proposal.component.ts` recompuesto con el recorrido completo en orden.
11. ✅ Verificado: `ng build` de producción en verde.

### Cierre de pendientes (26-oct-2026)

- ✅ §10 "equipo y aliados": `team` creado con los datos y fotos de Jorge y Rafael; integrado en el recorrido
  (momento "Qué buscamos") y en el navbar.
- ✅ Apéndices migrados al sistema de diseño nuevo: `api-contract`, `backoffice-evaluation`,
  `international-shipping`, `database-design` y los subcomponentes de `technical` (hex de marca → tokens `--mk-*`).
- ✅ La comparación PWA vs. nativa (viejo `technical`) reubicada como apéndice en §13: página standalone en
  `/plataforma-tecnica`, enlazada desde "Detalles profundos".

### Pendiente menor (no bloquea)

- Retirar los alias de compatibilidad de `styles.css` cuando se confirme que ningún componente los usa.
- Revisar gradientes decorativos residuales en los apéndices largos (fondos radiales) si se quiere pulir más.

## 9. Decisiones de ejecución (decididas 26-oct-2026)

1. **Orden:** Bloque A (correcciones técnicas) primero, luego Bloque B (narrativa). **(decidido)**
2. **Modo:** incremental, sección por sección, con revisión del usuario en cada bloque. **(decidido)**
3. **Estilo:** mantener la estética actual (hero oscuro, secciones claras, paleta y design system existentes);
   redactar el texto más conciso y ejecutivo, menos denso. **(decidido)**
