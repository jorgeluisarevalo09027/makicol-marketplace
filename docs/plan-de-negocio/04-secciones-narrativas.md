# 04 — Secciones narrativas (huecos del plan)

> Borrador de las secciones del plan de negocio que no tenían contenido en los documentos ni en el prototipo
> (§3, §4, §5, §8, §11 de `02-estructura-objetivo.md`). Rige `00-reglas-del-proceso.md`: cada afirmación lleva
> su estado (`verificado` con fuente / `propuesta` / `pendiente`). Los puntos `pendiente` esperan decisión del
> usuario y están listados al final.

## §3 Problema y solución

### Equipo (datos del usuario, 26-oct-2026)

- **Jorge Luis Arévalo Murcia** — desarrollo. Full stack con más de 5 años de experiencia; estudiante de
  Análisis y Desarrollo de Software en el SENA. Backend, frontend y arquitectura.
- **Rafael José Granados Avendaño** — producto, turismo y artesanos. Más de 12 años como guía turístico;
  tecnólogo en Guianza Turística egresado del SENA.

### El problema (propuesta, con base documentada)

El artesano colombiano produce piezas con alto valor cultural, pero su acceso al mercado digital es limitado:

- El sector es grande y está disperso: **más de 25.000 artesanos caracterizados** por el Sistema Estadístico
  de la Actividad Artesanal (SIEAA), en los 32 departamentos (verificado: Artesanías de Colombia / tiendanube,
  2026). La convocatoria de Expoartesanías 2025 reunió **32.597 artesanos de 855 municipios**, un 56 % más que
  en 2024 (verificado: ProColombia, ago-2025).
- La actividad es de **predominio femenino** (71,6 % mujeres según la caracterización de Artesanías de
  Colombia) y mayoritariamente rural, lo que agrava la brecha digital.
- La venta en línea existe pero está concentrada en grandes plataformas generalistas: Artesanías de Colombia
  abrió una **Tienda Oficial en Mercado Libre** con más de 150 piezas (verificado: MinCIT). Ahí el artesano
  compite con todo el catálogo y sin un relato propio.

**El vacío (propuesta):** no hay un canal digital que combine (a) un marketplace pensado para artesanías del
Caribe colombiano, (b) la historia y trazabilidad del creador, y (c) un modelo que no le quite margen al
artesano. Las plataformas generalistas cobran comisión y diluyen la identidad; las ferias presenciales
(Expoartesano batió récord con **$4.606 millones en ventas** y 25.177 visitantes, verificado) son potentes pero
puntuales y locales.

### La solución (propuesta)

Makicol es un marketplace de artesanías colombianas con cuatro roles (comprador, artesano, soporte, auditor) y
un área pública, que:

- Da a cada artesano una **vitrina con su historia** (el backend ya tiene contenido editorial: `Story`).
- Arranca con el **modelo B (directo, sin comisión)**: el comprador paga al artesano y la plataforma registra
  el pedido y su estado (decidido; ver `01` y `analisis-plan-de-negocio.md` O3).
- Se financia primero con **patrocinio**, no con comisión (decidido; O3).
- Está construido: hay un demo funcional con backend propio desplegado en Azure (verificado; ver `03`).

## §4 Análisis de mercado

### Tamaño y contexto (verificado)

| Dato | Valor | Fuente |
|---|---|---|
| Artesanos caracterizados en Colombia | > 25.000 (SIEAA) | Artesanías de Colombia / tiendanube (2026) |
| Participación en convocatoria Expoartesanías 2025 | 32.597 artesanos, 855 municipios (+56 % vs 2024) | ProColombia (ago-2025) |
| Composición por género | 71,6 % mujeres, 28,4 % hombres | Artesanías de Colombia (caracterización) |
| Ventas Expoartesano "La Memoria" (feria) | $4.606 millones; 25.177 visitantes | Artesanías de Colombia |
| Comercio electrónico Colombia (proyección) | ~US$6.000 millones hacia fin de 2024 | designplus / CCCE (secundaria) |
| Crecimiento ventas online (3T 2022 vs 2021) | +40,1 % en valor; +18 % en transacciones | CCCE vía multivende (secundaria) |

> Las cifras de comercio electrónico provienen de fuentes secundarias; verificar con el informe directo de la
> Cámara Colombiana de Comercio Electrónico (CCCE) antes de usarlas en una cifra de mercado objetivo.

### Segmentos de comprador (decidido)

**Decisión del usuario:** el piloto prioriza el **comprador nacional**; el comprador internacional queda como
**fase futura**, ligado a los envíos internacionales (O9, `no ejecutada`).

1. **Comprador nacional** que busca piezas con identidad y trazabilidad del creador. **(foco del piloto)**
2. **Comprador internacional** (EE. UU.: turistas y diáspora) — `fase futura, no ejecutada` (O9).
3. Comprador institucional / regalo corporativo — propuesta sin validar, no prioritaria.

### Foco geográfico de arranque (decidido)

**Decisión del usuario:** el piloto arranca con el **Caribe colombiano** (Magdalena, La Guajira, Bolívar y
demás departamentos de la región), coherente con el origen en Santa Marta (FilSMar / Unimagdalena), y el plan
declara explícitamente una **expansión nacional por fases**. La captación, la logística (cobertura de
Servientrega) y el relato se construyen primero sobre la región; el crecimiento al resto del país es un hito
posterior (§11).

## §5 Competencia y ventaja diferencial

### Panorama competitivo (propuesta, con ejemplos verificados)

| Competidor / canal | Qué es | Límite para el artesano |
|---|---|---|
| Mercado Libre (Tienda Oficial de Artesanías de Colombia) | Marketplace generalista con tienda oficial del sector | Comisión; el artesano compite con todo el catálogo; sin relato propio |
| Tiendanube / Shopify y similares | Plataformas para montar tienda propia | El artesano asume costo, montaje y tráfico; no es un marketplace con demanda agregada |
| Ferias (Expoartesanías, Expoartesano) | Canales presenciales de alto impacto | Puntuales, estacionales y geográficamente limitados |
| Redes sociales (venta por WhatsApp/Instagram) | Canal informal dominante | Sin catálogo estructurado, sin trazabilidad, sin soporte ni auditoría |

### Ventaja diferencial de Makicol (propuesta)

- **Modelo B sin comisión** al arranque: el artesano conserva su margen (decidido).
- **Relato e identidad** del creador integrados (contenido editorial `Story` ya en el backend).
- **Nivel de producto construido y verificable**: cuatro roles, soporte, auditoría, trazabilidad
  (`ActivityLog`), design system propio (ver valoración y `03`).
- **Enfoque regional (Caribe)** como punto de partida, frente a plataformas nacionales genéricas (pendiente de
  confirmar el foco).

## §8 Marketing y adquisición

> Sección de las más débiles hoy: no hay material previo. Esto es un primer esqueleto (propuesta); varios
> puntos dependen de decisiones del usuario.

### Los dos lados del marketplace (propuesta)

- **Lado oferta (artesanos):** captación vía alianzas institucionales (Artesanías de Colombia, Unimagdalena,
  cámaras de comercio, ferias) y boca a boca. El gancho es "vende sin comisión y con tu historia".
- **Lado demanda (compradores):** contenido (historias de artesanos), redes sociales, y la marca de patrocinio.

### Palancas (propuesta, por priorizar)

1. Alianzas con el ecosistema artesanal y académico del Caribe.
2. Contenido editorial (las historias ya son parte del producto).
3. Patrocinador como altavoz de marca.

### Pendiente

- Presupuesto de marketing y canales concretos.
- Métrica de adquisición objetivo (costo por artesano activado, por comprador).

## §11 Hitos y métricas

### Fases (propuesta, derivada de decisiones existentes)

| Fase | Contenido | Estado |
|---|---|---|
| 0. Demo construido | Backend + front + propuesta (lo que existe hoy) | verificado (ver `03`) |
| 1. Preparación del piloto | Migración de autenticación (Auth0, MFA soporte/auditor), medios de pago por artesano, contra entrega Servientrega, simulación en backend | decidido en alcance; pendiente de ejecutar (requiere BR + autorización) |
| 2. Piloto | Operación real con un grupo acotado de artesanos y compradores | pendiente de definir alcance y fecha |
| 3. Escala | Expansión nacional por fases (fuera del Caribe), comisión opcional (modelo A), internacionalización (O9) | futuro (decidido como dirección) |

### Métricas de éxito del piloto (propuesta, por confirmar)

- Nº de artesanos activados y con al menos una venta.
- Nº de pedidos cerrados (recaudo realizado, O12).
- GMV del piloto (el backend ya agrega `MonthlyMetric.Gmv`).
- Casos de soporte por pedido y tiempo de resolución.

Faltan **valores objetivo** para cada métrica (decisión del usuario).

## Decisiones del usuario (26-oct-2026)

1. **Foco geográfico:** Caribe como arranque, con expansión nacional por fases. **(decidido)**
2. **Segmento de comprador del piloto:** nacional; internacional como fase futura (O9). **(decidido)**

## Puntos `pendiente` que requieren decisión del usuario

3. **Presupuesto y canales de marketing** (§8).
4. **Alcance y fecha del piloto** (§11): nº de artesanos, cuándo.
5. **Valores objetivo de las métricas de éxito** (§11).
6. **Cifra de mercado objetivo:** confirmar datos de la CCCE con la fuente primaria antes de publicarlos.
