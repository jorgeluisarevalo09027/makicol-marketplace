# 03 — Verificación técnica contra el backend

> Resultado de contrastar los apéndices técnicos de la propuesta contra el código real de
> `PROYECTO_MARKETPLACE_MAKICOL` (consulta del 26-oct-2026). Rige la regla 9 de `00-reglas-del-proceso.md`:
> todo detalle técnico es `espejo del backend hoy` o `estado objetivo` con su explicación.
>
> **Fuente del backend:** `Makicol.Domain/Entities/*.cs`, `Makicol.Infrastructure/Data/AppDbContext.cs`,
> `Makicol.Infrastructure/Data/StatusSeeder.cs`, `Makicol.WebApi/Controllers/*.cs`.

## Resumen

| Apéndice técnico | ¿Sincronizado hoy? | Acción |
|---|---|---|
| Diagrama ER — imagen `er-diagram-v7.puml` / SVG | **Sí** | Mantener. Ya se derivó de las entidades del backend. |
| Diagrama ER — fichas interactivas del componente `database-design` | **No** | Corregir: usan nombres del diseño v6 (`Mk*`, esquema `makicol`, "Feria Artesanal") que el backend no adoptó. |
| Estados del pedido | **Sí** (con un matiz) | Mantener; aclarar que son 5 estados, no 4. |
| Contrato de API | **Sí** | Mantener. La página apunta al Swagger real y sus reglas coinciden con el código. |
| Costos de infraestructura Azure | **Corregido** | Front Door (no usado) → Static Web Apps (front real). App Service, SQL y Blob confirmados. |

## 1. Modelo de datos (ER)

### 1.1 La imagen del diagrama v7 es `espejo del backend hoy`

El `er-diagram-v7.puml` coincide con las entidades reales. Entidades verificadas en el backend
(`Makicol.Domain/Entities` + `AppDbContext`):

**Identidad:** `User`, `RefreshToken`, `BuyerProfile`, `ArtisanProfile`, `SupportAgent`,
`ArtisanVerificationStatus`, `ArtisanVerificationStatusTransition`.
**Catálogo:** `Product`, `ProductImage`, `Review`, `WishlistItem`.
**Pedidos:** `Order`, `OrderItem`, `OrderStatus`, `OrderStatusTransition`, `InternationalShipment`,
`InternationalShipmentStatus`, `InternationalShipmentStatusTransition`.
**Soporte:** `SupportCase`, `SupportMessage`, `SupportCaseStatus`, `SupportCaseStatusTransition`, `FaqItem`.
**Contenido:** `Story`, `StoryImage`.
**Auditoría:** `ActivityLog`, `MonthlyMetric`.

Son **29 tablas** (23 entidades + tablas de estado/transición contadas aparte). Los nombres de tabla
reales **no llevan prefijo `Mk` ni esquema `makicol`**: son `User`, `Order`, `Product`, etc., en el esquema
`dbo` (ver `AppDbContext.OnModelCreating`, cada `e.ToTable("User")`, `e.ToTable("Order")`…).

### 1.2 Las fichas interactivas están desincronizadas (`contradicción`)

El componente `src/app/features/database-design/database-design.component.ts` describe las entidades con los
nombres del **diseño v6** (`MkUser`, `MkRefreshToken`, `MkOrder`, esquema `makicol`, coexistencia aislada con
"Feria Artesanal"). El propio changelog de la página ya advierte, en la nota v7, que el backend **no adoptó**
ese diseño. Resultado: la imagen (v7) y las fichas (v6) se contradicen en la misma página.

**Decisión de sincronía:** las fichas deben pasar a `espejo del backend hoy` (nombres sin `Mk`, esquema `dbo`,
sin "Feria Artesanal"). El relato de coexistencia con Feria es `estado objetivo` que no se cumplió; o se retira,
o se mueve a una nota histórica rotulada. **Acción para el paso 3 (rediseño de la web).**

### 1.3 Diferencias de detalle a reflejar (el backend tiene más de lo que el diagrama resalta)

| Campo / entidad | En el backend hoy | Nota |
|---|---|---|
| `ArtisanProfile.PaymentMethod` | **un solo** valor (`nvarchar(20)`, por defecto `nequi`) | Confirma O3c: hoy no hay lista de medios ni campo de modelo A/B. |
| `ArtisanProfile.Materials` | lista serializada como JSON | — |
| `ArtisanVerificationStatus.AllowsPublishing` | existe y es `true` solo en "Verificado" | La regla de publicar es dato, no nombre. |
| `Order.PaymentMethodPreference` | `nvarchar(20)`, **informativa** | Confirma O1/O2: el cobro se coordina fuera de la plataforma. |
| `Order.CheckoutGroupId` | agrupa los pedidos de un mismo carrito | Un pedido por artesano (D2). |
| `Product.Stock` | `int?` (null = bajo pedido / ilimitado) | — |
| `Product.IsActive` | booleano simple, excepción intencional al patrón `*Status` | — |
| `InternationalShipment` | existe como entidad **de solo lectura** | Confirma O9: no hay endpoints para crearlo ni avanzarlo. |
| `Story` / `StoryImage` | contenido editorial (JSON de bloques) | No aparece destacado en la narrativa de negocio; es real. |

## 2. Estados del pedido (`espejo del backend hoy`)

Fuente: `StatusSeeder.cs`. Estados reales de `OrderStatus`:

| Id | Nombre | Terminal | Transición permitida |
|---|---|---|---|
| 1 | Recibido | no | → En preparación (artesano); → Cancelado (comprador) |
| 2 | En preparación | no | → Enviado (artesano) |
| 3 | Enviado | no | → Entregado (comprador) |
| 4 | Entregado | **sí** | — |
| 5 | Cancelado | **sí** | — |

**Matiz a corregir en la web:** la ficha `MkOrderStatus` del componente dice "Recibido, En preparación,
Enviado, Entregado" (4 estados) y omite **Cancelado** (id 5). Son **5 estados**.

**Relación con la propuesta de pagos y envíos (O5, O12):** los estados nuevos propuestos (`Novedad`,
`Recaudado`, `Devolución`, `Devuelto`, `Liquidado`, `GuiaGenerada`) **no existen** en el backend. Son
`estado objetivo` y requieren `BR` + autorización. La web debe mostrarlos como propuesta, nunca como existentes.

Otros catálogos de estado verificados:
- `SupportCaseStatus`: Abierto, En proceso, Resuelto, Cerrado (+ reapertura Cerrado → Abierto).
- `ArtisanVerificationStatus`: Pendiente, Verificado, Rechazado.
- `InternationalShipmentStatus`: Preparación, Trámites de exportación, En tránsito, Aduana EE.UU., Entregado
  (catálogo presente; sin endpoints de uso).

## 3. Contrato de API (`espejo del backend hoy`)

Fuente: `Makicol.WebApi/Controllers/*.cs` y `Program.cs`. La página `api-contract` del prototipo **ya está
sincronizada**: no duplica el contrato, enlaza al Swagger real y declara reglas que el código cumple.

**Reglas de diseño verificadas:**
- Rutas bajo `/api/...` sin prefijo `makicol` (`[Route("api/orders")]`, `[Route("api/products")]`, `[Route("api/auth")]`).
- Listados paginados (`PagedResult<T>` con `page`/`pageSize`).
- Estados como objeto id + nombre, desde tablas de catálogo.
- Cuatro roles: `buyer`, `artisan`, `support`, `auditor` (`Roles` en `Identity.cs`).
- Autenticación: JWT propio (emisor, audiencia, vigencia validados en `Program.cs`), rate limiting por IP en
  `login` y `refresh` (`auth-login`), CORS cerrado por defecto fuera de Development.

**Endpoints reales (muestra):**

| Recurso | Endpoints | Autorización |
|---|---|---|
| Auth | `POST /api/auth/register`, `/login`, `/refresh`, `/logout`; `GET/PUT /api/auth/me` | público / autenticado |
| Pedidos | `POST /api/orders`, `GET /api/orders`, `GET /api/orders/{id}`, `PATCH /api/orders/{id}/status` | buyer / según rol |
| Productos | `GET /api/products` (+ filtros, facets, categorías), `POST/PUT`, imágenes, reseñas | público / artisan / buyer |

**Coherente con la propuesta:** `POST /api/orders` recibe **una** preferencia de pago por carrito y crea un
pedido por artesano (confirma O1 y O3c). Cambiar a una preferencia por artesano sería `BR` + autorización.

## 4. Costos de infraestructura Azure (`espejo del backend hoy` + `estado objetivo`)

Fuente: `financial/cost-table/cost-table.component.ts` contra `Program.cs`.

Fuentes: `financial/cost-table/cost-table.component.ts`, `Program.cs`, `azure-pipelines.yml` (backend) y la
URL del demo del front (`azurestaticapps.net`).

**Infraestructura real (verificada 26-oct-2026):**

| Capa | Servicio real | Evidencia |
|---|---|---|
| Front | **Azure Static Web Apps** | el demo del front corre en `*.azurestaticapps.net` (hero de la propuesta) |
| Back | **Azure App Service** (.NET) | `Program.cs` usa `ForwardedHeaders` para el proxy de App Service; el pipeline publica un artefacto web .NET |
| Datos | Azure SQL Database | EF Core + Azure SQL |
| Archivos | Azure Blob Storage | `BlobFileStorage`, proveedor `AzureBlob` |

| Servicio en la tabla de costos | ¿Correcto? | Marca |
|---|---|---|
| Azure App Service | Sí (backend) | espejo del backend hoy |
| Azure SQL Database | Sí | espejo del backend hoy |
| Azure Blob Storage | Sí | espejo del backend hoy |
| ~~Azure Front Door~~ → **Azure Static Web Apps** | **Corregido** | espejo del backend hoy |

**Corrección aplicada:** la tabla listaba **Azure Front Door**, que no se usa. El front se sirve con **Azure
Static Web Apps**, que ya incluye SSL, CDN y distribución global (lo que Front Door aportaría). Se reemplazó en
`cost-table.component.ts` (Free hasta ~100 artesanos; Standard ~USD 9/mes al escalar).

La tabla sigue rotulada como "estimaciones propias sin cotización vigente; verificar en la calculadora de Azure".
No aparece ningún servicio de identidad gestionada (Auth0 / Entra); coherente con el JWT propio de hoy. Cuando
se decida la migración de autenticación (A8), su costo entra aquí como rubro nuevo.

## Hallazgos para el mapa de contenido

- La fila "Diagrama ER" de `01-mapa-de-contenido.md` pasa de `por verificar` a: **imagen** `espejo del backend
  hoy` (verificada); **fichas** `contradicción` (corregir en el paso 3).
- La fila "Estados del pedido" pasa a `espejo del backend hoy`, con la corrección de incluir "Cancelado".
- La fila "Contrato de API" pasa de `por verificar` a `verificado` / `espejo del backend hoy`.
- La fila "Costos de infraestructura Azure" pasa a `verificado`: App Service (back), Static Web Apps (front),
  Azure SQL y Blob. Se corrigió Front Door (no usado) por Static Web Apps.

## 5. Descubrimiento del catalogo (`estado objetivo`)

> Feature 007-descubrimiento-catalogo del front. Propuesta de backend registrada como BR-15 y BR-16 en
> `specs/contract/backend-change-requests.md` del front. **No existe en el servicio desplegado todavia**:
> a la fecha esta editado y compilado en una rama de feature, sin migrar la base de datos ni desplegar.
> Mientras no se despliegue y verifique, todo lo de esta seccion es `estado objetivo`.

### 5.1 Endpoints nuevos (BR-15)

Tres endpoints publicos bajo `/api/discovery`, cada uno con intencion de negocio propia, que alimentan las
tres secciones de la home del comprador (hoy esa home exprime el listado generico sin logica por seccion):

| Endpoint | Que devuelve | Personaliza |
|---|---|---|
| `GET /api/discovery/featured` | Curaduria global de piezas (mas vendidas + mejor valoradas) | No |
| `GET /api/discovery/artisans` | Artesanos por rating efectivo (umbral de confianza de 3 resenas) | No |
| `GET /api/discovery/for-you` | Piezas afines al comprador (wishlist + compras) o vista default | Si, con token |

Patron de diseno nuevo: **endpoints publicos con degradacion**. Con token de comprador valido, `for-you`
responde una vista personalizada; sin token o sin senal de afinidad, devuelve una vista default. Nunca
responden `401`. Hoy es `estado objetivo`; el estado final sera `espejo del backend hoy` cuando el
servicio los exponga y se verifiquen contra el Swagger.

### 5.2 Rating materializado e indices (BR-16)

Para que esas consultas sean rapidas e indexables, la propuesta materializa el rating y anade indices:

- `Product` gana `RatingAverage` y `RatingCount` (hoy el rating se calcula al vuelo en cada peticion).
- `ArtisanProfile` gana `RatingEffective` y `RatingCount`. Regla de cold-start (DISC-004): el artesano
  vale `5.0` mientras acumula menos de 3 resenas verificadas; al alcanzar 3, pasa al promedio real de las
  resenas de sus productos. Se apoya en el invariante ya existente de que una resena implica un pedido
  `Entregado` (`CreateReviewHandler`).
- Indices compuestos nuevos en `Product`: `(IsActive, SoldCount)`, `(IsActive, CreatedAt)` y
  `(IsActive, Category, SoldCount)`.
- Los valores materializados se recalculan al crear una resena, y la migracion incluye un backfill para los
  datos existentes. El seeder demo tambien recalcula tras sembrar resenas (quedan consistentes tras el deploy).

Hoy es `estado objetivo`. Al desplegar y verificar, el diagrama ER sube de version (v8) con los campos nuevos
y esta seccion pasa a `espejo del backend hoy`.
