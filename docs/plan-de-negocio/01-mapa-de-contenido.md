# 01 — Mapa de contenido

> Inventario que ubica cada bloque existente de la propuesta en la sección del plan de negocio que le
> corresponde (ver `02-estructura-objetivo.md`), con su estado y su sincronía con el backend
> (ver `00-reglas-del-proceso.md`). Es el puente entre lo que ya hay y la estructura destino.
>
> **Estados:** `decidido` · `borrador` · `pendiente` · `por verificar` · `contradicción`.
> **Sincronía:** `espejo del backend hoy` · `estado objetivo` · `no aplica`.

## Fuentes inventariadas

- `docs/analisis-plan-de-negocio.md` — análisis por temas (O1–O12 pagos y envíos, A1–A8 autenticación,
  B1–B7 plan de negocio, F1–F7 flujos por rol).
- `docs/valoracion-trabajo-realizado.md` — valoración del desarrollo (COP $50–95 M).
- `docs/prompt-verificacion-valoracion.md` — utilitario de verificación de la valoración.
- `docs/database/` — diagrama ER (7 versiones) y fuentes PlantUML.
- `docs/diagramas/` — autenticación, arquitectura, compra completa, pago y envío.
- Prototipo Angular `src/app/features/` — hero, financial, technical, architecture, api-contract,
  database-design, backoffice-evaluation, international-shipping.

## Mapa: bloque existente → sección del plan

| Bloque existente | Fuente | Sección destino (§) | Estado | Sincronía backend |
|---|---|---|---|---|
| Visión / qué es Makicol | hero (prototipo), README | §1 Resumen ejecutivo, §2 Descripción | borrador | no aplica |
| Equipo (Jorge, Rafael) | `analisis-plan-de-negocio.md` encabezado | §2 Descripción, §10 Organización | borrador | no aplica |
| Problema del artesano del Caribe | implícito en propuesta | §3 Problema y solución | pendiente | no aplica |
| Análisis de mercado (artesanía, comprador internacional) | disperso / implícito | §4 Análisis de mercado | pendiente | no aplica |
| Competencia y diferenciación | — | §5 Competencia y ventaja | pendiente | no aplica |
| Dos modelos de cobro A/B; se empieza por B sin comisión | O3, O3b | §6 Modelo de negocio | decidido | no aplica |
| Financiación: patrocinio primero | O3 (decisión 4) | §6 Modelo, §12 Financiero | decidido | no aplica |
| El artesano elige modelo por artesano | O3b, O8.1 | §6 Modelo | decidido | estado objetivo |
| Reglas de checkout por artesano (PAY-001..005) | O3c | §9 Operaciones, §13 Apéndice pagos | pendiente | estado objetivo |
| Efectivo = contra entrega por transportadora (PAY-006..008) | O3d, O8.3 | §9 Operaciones, §13 Apéndice pagos | decidido | estado objetivo |
| Mapa de estados envío → pedido | O5 | §13 Apéndice pagos y envíos | propuesta / pendiente | estado objetivo |
| Proceso simulado para el demo; simulación en backend | O6, O8.5 | §9 Operaciones | decidido | estado objetivo |
| Impacto / inventario de cambios | O7 | §9 Operaciones, §11 Hitos | borrador | estado objetivo |
| Envíos internacionales (fase futura, no ejecutada) | O9 | §13 Apéndice (rotulado futuro) | decidido (no ejecutar) | estado objetivo |
| Asesoría legal: necesaria, por cotizar | O10, O8.8 | §10 Organización, §12 Financiero | pendiente | no aplica |
| Servientrega para el piloto; contrato de la plataforma | O11, O8.7 | §9 Operaciones, §13 Apéndice envíos | decidido / por verificar | estado objetivo |
| Contra entrega: casos y estados nuevos | O12, O8.9 | §13 Apéndice envíos | decidido / pendiente | estado objetivo |
| Autenticación actual del demo (JWT propio) | A1 | §7 Producto, §13 Apéndice auth | verificado | espejo del backend hoy |
| Requisitos del reemplazo de auth | A2 | §9 Operaciones, §13 Apéndice auth | borrador | estado objetivo |
| Opciones de identidad (Auth0, Entra, propio, Keycloak) | A3–A4 | §13 Apéndice auth | borrador / por verificar | estado objetivo |
| Elección Auth0 para el piloto; MFA soporte/auditor | A8, O8.11 | §9 Operaciones | decidido / por verificar | estado objetivo |
| Migración antes del piloto | A8, O8.11 | §11 Hitos | decidido | estado objetivo |
| Flujo del comprador (demo) | F2 | §7 Producto | borrador | espejo del backend hoy |
| Flujos de artesano, soporte, auditor | F3–F7 | §7 Producto | borrador | espejo del backend hoy |
| Diagrama de arquitectura (demo hoy / producción) | `diagramas/b5-*` | §13 Apéndice arquitectura | borrador | mixto (hoy + objetivo) |
| Diagrama ER — imagen v7 | `docs/database/er-diagram-v7.puml` | §13 Apéndice base de datos | verificado (ver `03`) | espejo del backend hoy |
| Diagrama ER — fichas interactivas | `database-design` (prototipo) | §13 Apéndice base de datos | **contradicción** (ver `03`) | corregir a espejo del backend hoy |
| Contrato de API | api-contract (prototipo), Swagger | §13 Apéndice contrato API | verificado (ver `03`) | espejo del backend hoy |
| Evaluación back-office (separar storefront/back-office) | backoffice-evaluation | §13 Apéndice arquitectura | borrador | estado objetivo |
| Valoración del trabajo (COP $50–95 M) | `valoracion-trabajo-realizado.md` | §12 Plan financiero | verificado (con disclaimers) | no aplica |
| Costos de infraestructura Azure (simulador) | financial (prototipo) | §12 Plan financiero | verificado y corregido (ver `03`) | espejo del backend hoy (Static Web Apps + App Service + SQL + Blob) |

## Lo que la web ya tiene vs. la estructura objetivo

| Sección web actual | ¿Dónde encaja en el plan? | Observación |
|---|---|---|
| hero | §1 / §2 | Entrada del recorrido; falta hilar la narrativa de los tres momentos. |
| financial | §12 | Simulador de costos Azure; verificar que refleja el backend actual. |
| technical | §7 / §13 | Mezcla producto y detalle técnico; separar narrativa de apéndice. |
| architecture | §13 | Apéndice; marcar sincronía (hoy vs objetivo). |
| api-contract | §13 | Apéndice; contrastar con Swagger. |
| database-design | §13 | Apéndice; **contrastar ER con el backend**. |
| backoffice-evaluation | §13 | Apéndice; es una evaluación, no decisión. |
| international-shipping | §13 | Apéndice; mantener rótulo "fase futura, no ejecutada". |

## Huecos detectados (sin material hoy)

Secciones de la estructura objetivo que **no tienen contenido** en los documentos ni en el prototipo y
que habrá que construir:

- §3 Problema y solución (hay contexto implícito, falta redactarlo como sección).
- §4 Análisis de mercado (tamaño, demanda, comprador internacional).
- §5 Competencia y ventaja diferencial.
- §8 Marketing y adquisición de los dos lados del marketplace.
- §11 Hitos y métricas (hay fases sueltas; falta la línea de tiempo y las métricas de éxito del piloto).

## Verificaciones técnicas contra el backend

Completadas el 26-oct-2026 (detalle en `03-verificacion-tecnica-backend.md`):

1. **Diagrama ER** — la imagen v7 es fiel al backend (29 tablas, sin prefijo `Mk`, esquema `dbo`). **Las fichas
   interactivas del componente `database-design` están desincronizadas** (usan nombres v6 `Mk*` y el relato de
   "Feria Artesanal" que el backend no adoptó): corregir en el paso 3.
2. **Contrato de API** — la página `api-contract` está sincronizada; apunta al Swagger real y sus reglas se
   cumplen en el código.
3. **Estados del pedido** — 5 estados reales (Recibido, En preparación, Enviado, Entregado, **Cancelado**); la
   ficha de la web omite "Cancelado": corregir en el paso 3.
4. **Costos de infraestructura** — reales: Static Web Apps (front), App Service (back), Azure SQL y Blob.
   Se corrigió Front Door (no usado) por Static Web Apps.

Correcciones de la web derivadas de la verificación (para el paso 3):
- Fichas de `database-design`: renombrar a los nombres reales del backend y retirar/rotular el relato de Feria.
- Ficha `MkOrderStatus`: añadir el estado "Cancelado".
- Estados nuevos de pagos y envíos (`Novedad`, `Recaudado`, etc.): mostrarlos siempre como `estado objetivo`.
