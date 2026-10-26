# 00 — Reglas del proceso del plan de negocio

> Fuente única de cómo se concilia la propuesta de Makicol en un plan de negocio ordenado y visual.
> Los demás documentos (`01-mapa-de-contenido.md`, `02-estructura-objetivo.md`) la enlazan, no la copian.

## Principio rector

El plan de negocio describe **el plan para producción**; el demo es **la evidencia de lo que existe hoy**.
Cuando difieren, se dice explícito: *"en el demo es así; en producción será así"*.
(Heredado de `docs/analisis-plan-de-negocio.md`.)

El entregable es doble:

- Los documentos en `docs/plan-de-negocio/` son la **fuente**: el guion con estados y fuentes.
- El proyecto Angular `proposal` es la **presentación**: la web ordenada y visual que consume esa fuente.

La web manda en experiencia; el documento manda en verdad. Cuando la web muestre un dato, ese dato debe
existir y estar fechado en la fuente.

## Siempre

1. **Cada afirmación lleva su estado:** `verificado` (con fuente), `propuesta` (análisis propio) o
   `pendiente` (falta decidir o confirmar). Nada se presenta como hecho sin fuente.
2. **Cada dato externo lleva fuente y fecha de consulta.** Tarifas, condiciones de Servientrega, precios de
   Auth0 / Azure, aranceles, etc.
3. **El backend es contrato observado.** El plan documenta lo que el backend hace hoy, no lo que debería
   hacer. Cualquier cambio de backend se registra como `BR-n` y requiere autorización expresa del usuario.
4. **IDs estables para las decisiones.** Se conservan los prefijos ya en uso (`O`, `A`, `B`, `F`, `PAY`,
   `AUTH`…) y se mapean a la sección del plan que los consume; no se reutilizan ni se renumeran.
5. **Cambiar primero el documento cuando cambia una decisión** (igual que en el front se cambia primero la spec).
6. **Español neutro, frases cortas, sin relleno.**
7. **Recorrido narrativo único.** La web guía al lector en una secuencia clara:
   *qué buscamos (visión) → qué tenemos hoy (demo, verificado) → a dónde vamos (plan para producción)*.
   Cada sección deja claro en cuál de los tres momentos está.
8. **Detalles al final, por capas.** El recorrido principal explica lo necesario; los detalles profundos
   (modelo de datos, contrato API, investigación de pagos y envíos, autenticación) van en accesos al final y
   no interrumpen la narrativa.
9. **Todo detalle técnico declara su sincronía con el backend.** Lleva una de dos marcas:
   - `espejo del backend hoy`: refleja el estado actual, con fuente al código o al Swagger.
   - `estado objetivo`: describe el futuro y dice explícito *"hoy es X; el estado final sería Y debido a Z"*.

   No se publica un detalle técnico sin una de las dos marcas.
10. **Paridad web ↔ documento.** Ninguna afirmación aparece en la web si no está respaldada en la fuente con
    su estado. Si se cambia la fuente, se actualiza la web, y a la inversa.

## Pide autorización expresa antes de

- Resolver un punto `pendiente` (texto legal, cobertura, prioridades, cifras sin cotizar).
- Tocar el backend o registrar algo distinto a lo que hoy hace.
- Inventar una cifra: si no hay fuente, el rubro queda **"por cotizar"**.
- Cambiar la estructura de secciones acordada en `02-estructura-objetivo.md`.

## Nunca

- Presentar una `propuesta` o un `pendiente` como si fuera un hecho verificado.
- Borrar material existente al reubicarlo: se mueve y se marca su estado, no se pierde.
- Mezclar "lo que existe hoy" con "lo que será en producción" sin rotularlo.
- Publicar un diagrama o detalle técnico desactualizado sin marcarlo como `estado objetivo` y sin explicar
  la diferencia con lo que hay hoy.

## Estados de un bloque de contenido (vocabulario común)

| Estado | Significado |
|---|---|
| `decidido` | Hay una decisión del usuario registrada (con fecha). |
| `borrador` | Redactado, pendiente de revisión del usuario. |
| `pendiente` | Falta una decisión, una cifra o una verificación externa. |
| `por verificar` | Afirmación con fuente secundaria o contradictoria; hay que confirmarla. |
| `contradicción` | Dos documentos (o doc vs prototipo) dicen cosas distintas; hay que conciliar. |

## Sincronía con el backend (para detalles técnicos)

| Marca | Significado |
|---|---|
| `espejo del backend hoy` | El diagrama o la descripción refleja el estado actual, con fuente al código o al Swagger. |
| `estado objetivo` | Describe el futuro; acompaña la explicación "hoy es X; el estado final sería Y debido a Z". |
| `no aplica` | El bloque no es un detalle técnico (narrativa, mercado, financiero). |
