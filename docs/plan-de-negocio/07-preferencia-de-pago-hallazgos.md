# 07 — Preferencia de pago: hallazgos y plan spec-driven

> Evaluación de cómo funciona hoy la preferencia de pago en los tres proyectos y plan para convertirla de
> un dato informativo global en una elección lógica por artesano. Rige el proceso spec-driven del front
> (`specs/process/spec-feature.md`) y las reglas de `AGENTS.md` (el backend es contrato; se toca solo con
> autorización expresa, registrando `BR-n`).

## 1. Cómo funciona hoy (verificado en código, 26-oct-2026)

### Backend (`PROYECTO_MARKETPLACE_MAKICOL`)

- **DTO de entrada:** `CreateOrderRequestDto(List<CreateOrderItemDto> Items, string? PaymentMethodPreference)`
  — una **sola** preferencia para todo el carrito (`Dtos.cs`).
- **Perfil del artesano:** `ArtisanProfile.PaymentMethod` es **un solo** string (`nvarchar(20)`, def. `nequi`).
  No hay lista de medios aceptados ni campo de modelo (A/B).
- **Checkout** (`CreateOrdersHandler`): agrupa el carrito por artesano y crea **un pedido por artesano**, pero
  copia **la misma** `PaymentMethodPreference` a todos los pedidos del grupo. No valida que el medio elegido sea
  aceptado por cada artesano (no existe tal lista).
- **Persistencia:** `Order.PaymentMethodPreference` (`nvarchar(20)`), comentado como "preferencia informativa;
  el cobro se coordina fuera de la plataforma".
- **Salida:** `OrderDto.PaymentMethodPreference` se devuelve tal cual.

### Front (`makicol-marketplace-web`)

- **Página de pago** (`payment-page.component.ts`): muestra una lista **global** de métodos
  (`SUGGESTED_PAYMENT_METHODS`: nequi, daviplata, bancolombia, efectivo) y el comprador elige **uno** para todo
  el carrito. Texto actual: "El pago se coordina directamente con el artesano. Makicol no procesa pagos".
- **Contrato consumido:** `POST /orders` con una preferencia; coincide con el backend.
- **Reglas existentes:** `CART-001..007` (revalidación del carrito). **No hay reglas CHK/PAY** de pago todavía.
- **BR relacionadas:** `BR-7` (el pedido no guarda dirección ni notas; el front ya los pide y los descarta).

### El problema lógico

El comprador elige un medio global que **puede no ser aceptado** por alguno de los artesanos del carrito, y
ese medio se copia igual a todos los pedidos. Como el carrito ya se divide en un pedido por artesano, lo
lógico es que **cada artesano declare qué medios acepta** y que el checkout **pida una preferencia por grupo
(por artesano)**, mostrando solo lo que ese artesano acepta.

## 2. Objetivo

Convertir la preferencia de pago de un dato informativo **global** a una elección **por artesano**, coherente
con "un pedido por artesano" y con el modelo B (directo) del plan de negocio. Sigue siendo informativa (la
plataforma no procesa el cobro en esta etapa); lo que cambia es que sea **correcta y por grupo**.

Esto materializa las reglas candidatas ya anotadas en `analisis-plan-de-negocio.md`:
`PAY-001` (checkout agrupa y muestra solo los medios del artesano), `PAY-002` (cada grupo exige medio),
`PAY-004` (artesano sin medios no vende), `PAY-005` (el pedido guarda el medio por pedido).

## 3. Cambios necesarios

### 3.1 Backend — requiere `BR` + autorización expresa (separadas: editar / compilar / desplegar)

| Cambio | Detalle | Riesgo |
|---|---|---|
| **BR-A** Medios aceptados por artesano | Añadir a `ArtisanProfile` una lista `AcceptedPaymentMethods` (p. ej. JSON como `Materials`), además o en vez del `PaymentMethod` único. Exponerla en `ArtisanProfileDto` y aceptarla en registro/`PUT me`. | medio (migración aditiva + perfil) |
| **BR-B** Preferencia por artesano en el checkout | Cambiar `CreateOrderRequestDto` para aceptar una preferencia **por artesano** (p. ej. `List<ArtisanPaymentChoice { ArtisanId, PaymentMethodPreference }>` o un mapa). El handler asigna a cada pedido su preferencia. | medio (cambia contrato de `POST /orders`) |
| **BR-C** Validación de medio aceptado | El checkout rechaza (`409`/`400`) si el medio elegido para un artesano no está en su lista de aceptados; un artesano sin medios no puede vender (coherente con `PAY-004`). | medio (nueva validación) |

> Nota: `BR-B` **cambia** un contrato existente (`POST /orders`), no solo añade. Es el de mayor cuidado:
> el front debe adaptarse en el mismo paso o mantener compatibilidad.

### 3.2 Front (`makicol-marketplace-web`) — feature con spec, plan y tareas

- Nueva feature `specs/features/NNN-pago-por-artesano/` con reglas `PAY-001..005`.
- **Perfil del artesano:** UI para declarar los medios aceptados (en `libs/roles/artisan/...`).
- **Página de pago:** agrupar por artesano (el `CartStore` ya tiene `groupedByArtisan()`), y por cada grupo
  mostrar **solo** los medios aceptados por ese artesano y exigir elegir uno.
- **Store/servicio de pedidos:** `toCreateOrderRequest` pasa a enviar una preferencia por artesano.
- **Catálogo de medios:** hoy es una constante en el front (`SUGGESTED_PAYMENT_METHODS`); decidir si pasa a
  venir del backend o se mantiene en el front como enum compartido.
- **Mientras no se autorice el backend:** el front puede mostrar los medios por artesano usando el
  `PaymentMethod` único actual como "único medio aceptado", y seguir enviando una sola preferencia (degradado),
  anotando la limitación.

### 3.3 Proyecto propuesta (`makicol_marketplace_poposal`)

- La web ya describe esto como `estado objetivo` (sección Operaciones y fichas `ArtisanPaymentMethod`,
  `ShipmentStatus`). Cuando el cambio se implemente y despliegue, actualizar la marca de "propuesta" a "hoy".

## 4. Plan paso a paso (spec-driven)

Orden que respeta `AGENTS.md`: primero la spec y las `BR`, y no se toca el backend sin autorización.

1. **Registrar las BR** (A, B, C) en `specs/contract/backend-change-requests.md` del front, en estado
   `pendiente` → `propuesta` (qué cambia, por qué, contrato afectado, riesgo).
2. **Crear la feature** `specs/features/NNN-pago-por-artesano/`:
   - `spec.md`: qué y por qué; reglas `PAY-001..005`; pendientes; fuera de alcance.
   - Revisar ambigüedades con el usuario (decisiones de §5).
3. **Decidir con el usuario** los puntos abiertos (§5).
4. **`plan.md`:** cómo, por capas: libs del front afectadas, cambios de perfil y checkout, contrato consumido.
5. **`tasks.md`:** pasos pequeños; tests antes del código; cada test lleva el ID de la regla.
6. **Front primero, en modo degradado** (sin tocar backend): agrupar el pago por artesano usando el
   `PaymentMethod` único actual como único medio. Esto ya mejora la lógica sin cambiar el contrato.
7. **Autorización del backend:** cuando el usuario autorice las BR, implementar A, B, C; actualizar
   `api-contract.md`, el front (envío por artesano) y el estado de las BR.
8. **Verificar:** `lint` sin warnings, `test` de lo tocado, `build` de producción. Tests con el ID de la regla.
9. **Actualizar la propuesta:** cambiar las marcas de `estado objetivo` a `hoy` en la web.
10. **Cerrar** con `specs/process/spec-close.md`.

## 4b. Seed demo y comunicación del cambio de datos (26-oct-2026)

Al cambiar el backend, se revisó el `DemoDataSeeder`. Hallazgo: todos los artesanos demo nacían con un solo
medio (`nequi`), así que tras la migración quedarían todos con `["nequi"]` y la feature no luciría. Decisiones:

- **Reparto demo (decidido):** Rosa `nequi+bancolombia`; María `nequi+daviplata+efectivo`; Carmen
  `bancolombia`; Luis (pendiente) **sin medios** (demuestra PAY-004). Aplicado en el seeder.
- **Cómo se aplica/comunica el cambio de datos (decidido, escenarios A y B):**
  - **A — demo/desarrollo:** el `DemoDataSeeder` actualiza los medios **automáticamente** al sembrar, pero solo
    si el perfil sigue en su valor por defecto (vacío o `["nequi"]` del backfill). Nunca pisa ediciones hechas
    desde la UI. Es idempotente, igual que la realineación de bios.
  - **B — producción:** la migración `AddArtisanAcceptedPaymentMethods` hace **backfill** de cada artesano con
    su medio único; a partir de ahí, cada artesano edita sus medios desde la UI (feature 005).
- Los pedidos demo usan como preferencia un medio que el artesano acepta (coherencia con BR-14).

## 5. Decisiones del usuario (26-oct-2026)

1. **Medios por artesano:** **varios** (lista de medios aceptados por artesano). **(decidido)**
2. **Catálogo de medios:** se mantiene como **enum compartido en el front** por ahora (no viene del backend). **(decidido)**
3. **Orden de ejecución:** **front primero en modo degradado** (usando el `PaymentMethod` único actual como
   único medio aceptado, agrupando el pago por artesano); backend después, con autorización. **(decidido)**
4. **Modelo A/B por artesano:** **se deja para una feature posterior**; este alcance cubre solo los medios de pago. **(decidido)**
5. **Efectivo:** se mantiene **"efectivo contra entrega" simple**; separar el contra entrega por transportadora
   (O3d/O12) queda fuera de este alcance. **(decidido)**
