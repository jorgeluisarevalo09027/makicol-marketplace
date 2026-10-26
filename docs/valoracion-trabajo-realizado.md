# Valoración del trabajo de desarrollo realizado — Makicol

> Estimación del valor de reposición, en pesos colombianos (COP), del trabajo invertido en los
> tres componentes del proyecto Makicol hasta el **19 de octubre de 2026**: backend .NET,
> frontend Angular/Nx y propuesta de negocio (este repositorio).
>
> **Uso previsto:** insumo cuantitativo para la propuesta de negocio ante inversionistas.
> **No es** una tasación formal ni una valuación de equity del producto (ver §7).

## 1. Resumen ejecutivo

| Escenario de valoración | Rango estimado (COP) | ≈ USD (TRM 3.174,67) |
|---|---|---|
| Costo de equipo empleado (conservador) | $30 – 70 millones | $9.4 – 22 K |
| Freelance senior local (caso base) | $45 – 90 millones | $14 – 28 K |
| Agencia / nearshore | $60 – 150 millones | $19 – 47 K |

**Rango recomendado para la propuesta: COP $50 – 95 millones (~USD 16 – 30 K)**
como *valor de reposición del desarrollo acumulado* (lo que costaría reproducir hoy este
alcance con talento senior en el mercado colombiano).

## 2. Inventario medido del trabajo (19-oct-2026)

| Componente | Alcance medido | Período de commits |
|---|---|---|
| Backend `PROYECTO_MARKETPLACE_MAKICOL` | 66 archivos `.cs`, ~10.600 LOC. Clean Architecture en 4 capas (Domain / Application / Infrastructure / WebApi); autenticación JWT; EF Core + Azure SQL; abstracción `IFileStorage` con storage local y Azure Blob; rate limiting; middleware de excepciones; pipeline de validación; 4 migraciones; seeders idempotentes (estados, FAQ, demo con 9 usuarios en 4 roles: comprador, artesano, soporte, auditor); pipeline `azure-pipelines.yml` | 15-sep → 19-oct (17 commits) |
| Frontend `makicol-marketplace-web` | Monorepo Nx: 43 proyectos con boundaries por capa/scope enforzados por ESLint; ~25.800 LOC (ts/html/scss); design system propio de 30 componentes `Mk*`; 159 archivos de tests (Vitest); 6 suites e2e (Playwright); 4 shells por rol + área pública; NgRx Signals + Tailwind v4; 39 documentos de especificación (~6.900 líneas) + ~300 KB de documentación de arquitectura | 5-oct → 19-oct (30 commits) |
| Propuesta `makicol_marketplace_poposal` | ~8.300 LOC Angular: sitio de propuesta con simulador interactivo de costos Azure, tabla de infraestructura, secciones de arquitectura, contrato API, diseño de base de datos (6 iteraciones del diagrama ER en `docs/`), internacionalización y prototipo navegable del marketplace por rol | 7-jul → 8-oct (16 commits) |

Desarrollado por un único autor con asistencia de IA — hecho relevante para la metodología (§3).

## 3. Metodología: por qué "valor de reposición"

Se valora **lo que costaría reproducir este resultado en el mercado**, no las horas reales
invertidas. Razones:

- El desarrollo fue asistido por IA, lo que hace las horas reales incomparables con la
  productividad tradicional. Para un inversionista la pregunta relevante es *"¿cuánto vale
  tener esto construido?"*, no *"¿cuántas horas se sentó alguien?"*.
- Las líneas de código miden volumen, no valor: el rango de horas-equivalente se ajusta por
  calidad verificable (arquitectura por capas, 159 specs, design system propio, seeders
  idempotentes, CI) y por trabajo no visible en el LOC (diseño del dominio, modelo de datos
  en 6 iteraciones, especificaciones, proceso spec-driven).

Se triangula con **tres métodos** para que ningún supuesto único domine el resultado.

## 4. Datos de mercado (Colombia, 2025-2026)

| Referencia | Valor | Fuente |
|---|---|---|
| Freelance junior | COP $30–50 K/h | izaweb, andredesignmarketing |
| Freelance mid | COP $50–80 K/h | izaweb, andredesignmarketing |
| **Freelance senior full-stack** | **COP $80–150 K/h** | andredesignmarketing, izaweb |
| Salario senior empleado | COP $7–12 M/mes | UCC, Computrabajo (media $4,65 M; senior alto) |
| Costo empleador sobre salario | +29–32 % (prestaciones/parafiscales) | Toku (feb-2025) |
| Costo hora empleado senior | ~COP $55–95 K/h | derivado: $9–15,8 M costo mensual / ~168 h |
| Nearshore senior Colombia | USD $55–88/h | Index.dev, Saldo (tarifas plataformas) |
| Agencia local pequeña/mediana | COP $60–120 K/h | izaweb |
| Agencia grande Bogotá/Medellín | COP $100–200 K+/h | izaweb |
| Proyecto tipo "producto operativo con backend y roles" | COP $32–60 M | Granweb (2026) |
| Proyecto tipo "plataforma empresarial" | COP $72–140 M+ | Granweb (2026) |
| Plataforma a la medida / SaaS | COP $12–30 M+ por módulo | Softhian, SkyCode |
| **TRM 19-oct-2026** | **$3.174,67 COP/USD** | Superfinanciera vía Portafolio |

## 5. Estimación por método

### Método A — Reposición bottom-up (horas-equivalente × tarifa)

Horas que un equipo senior tardaría en producir este alcance *con este nivel de acabado*:

| Componente | Horas eq. | Justificación |
|---|---|---|
| Backend | 160 – 220 h | Diseño de dominio multi-rol, clean architecture, integraciones Azure (SQL, Blob), seguridad (JWT, rate limit, CORS), seeders idempotentes, migraciones |
| Frontend | 260 – 340 h | Monorepo con boundaries, 30 componentes de design system, 4 apps de rol + pública, 159 specs unitarios, e2e, temas por rol |
| Propuesta / plan de negocio | 90 – 130 h | Modelo financiero interactivo, diseño de BD iterado 6 veces, sitio de propuesta, prototipo navegable |
| Specs / arquitectura / QA / DevOps | 40 – 60 h | ~6.900 líneas de specs, docs de arquitectura, pipelines, evaluación de estado |
| **Total** | **550 – 750 h** | |

Valoración por escenario de tarifa:

| Tarifa | Cálculo | Resultado |
|---|---|---|
| Empleado senior ($55–95 K/h) | 550–750 h × $55–95 K | **$30 – 71 M** |
| Freelance senior ($80–120 K/h, rango medio) | 550–750 h × $80–120 K | **$44 – 90 M** |
| Agencia ($100–160 K/h) | 550–750 h × $100–160 K | **$55 – 120 M** |

### Método B — Costo de equipo empleado

550–750 h ≈ 3,3 – 4,5 meses-hombre a jornada completa (~168 h/mes).
Costo mensual empleador senior: $9 – 15,8 M → **$30 – 71 M**.
Un equipo real de 2–3 personas con esa carga tardaría más calendario por coordinación;
agregando ~20 % de overhead de gestión/diseño: **$36 – 85 M**.

### Método C — Benchmark de mercado (qué cobra una agencia por este alcance)

Un marketplace con backend propio, 4 roles, catálogo/pedidos/reseñas/soporte/auditoría,
design system propio, cobertura de tests y despliegue en Azure cae entre el tier
"producto operativo" ($32–60 M, Granweb) y "plataforma empresarial" ($72–140 M+):
por madurez técnica queda en la zona alta → **$60 – 120 M**. Más la propuesta de negocio
documentada (plan financiero, ER, contrato API): **$70 – 140 M**.

### Triangulación

| Método | Rango (COP M) |
|---|---|
| A — bottom-up (caso base freelance) | 44 – 90 |
| B — equipo empleado | 36 – 85 |
| C — benchmark agencia | 70 – 140 |
| **Intersección ponderada** | **50 – 95** |

## 6. Rango recomendado y sensibilidad

**Recomendado: COP $50 – 95 M (~USD 16 – 30 K)** como valor de reposición del desarrollo.

Factores que empujan al extremo alto:
- Nivel enterprise verificable: lint con boundaries, 159 specs, design system propio,
  seeders idempotentes, proceso spec-driven documentado.
- Cuatro roles funcionales completos (comprador, artesano, soporte, auditor) + área pública.
- Trabajo de producto incluido: especificaciones, modelo de datos iterado, propuesta
  financiera con costos de infraestructura.

Factores que moderan el extremo alto:
- Backend sin proyecto de tests automatizados (documentado en `EVALUACION-ESTADO.md` §5.3).
- Fase 11 pendiente: pipeline front, CSP, umbrales de cobertura, reglas ESLint duras.
- Hallazgos abiertos de seguridad/config (rate limiter por IP, CORS fallback).

## 7. Disclaimers

- **Valor del trabajo ≠ valor del producto ni de la empresa.** Esto es un piso de inversión
  acumulada (costo de reposición), no una valuación por múltiplos, DCF ni tracción.
- Las horas son **equivalentes de mercado**, no horas cronometradas; el desarrollo real fue
  más rápido por asistencia de IA, lo cual es en sí una ventaja competitiva a comunicar.
- Las cifras de LOC/archivos son reproducibles (ver §8). Las tarifas citan fuentes públicas
  con fecha de consulta 19-oct-2026; la TRM varía diariamente.

## 8. Reproducibilidad de las métricas

Desde la raíz de cada repo (PowerShell):

```powershell
# Backend — LOC en C# (excluye obj/bin)
$f = Get-ChildItem -Recurse -Include *.cs -File | ? { $_.FullName -notmatch 'obj|bin' }
$f.Count; ($f | Get-Content | Measure-Object -Line).Lines

# Frontend — LOC ts/html/scss en apps, libs, tools
$ts = Get-ChildItem -Recurse -Include *.ts,*.html,*.scss -File -Path apps,libs,tools
$ts.Count; ($ts | Get-Content | Measure-Object -Line).Lines

# Tests front
(Get-ChildItem -Recurse -Include *.spec.ts -File apps,libs).Count

# Propuesta — LOC en src
$p = Get-ChildItem -Recurse -Include *.ts,*.html,*.scss -File -Path src
$p.Count; ($p | Get-Content | Measure-Object -Line).Lines
```

## Fuentes consultadas (19-oct-2026)

- Portafolio — TRM 19-oct-2026: $3.174,67. https://www.portafolio.co/economia/finanzas/precio-del-dolar-hoy-en-colombia-asi-cotiza-la-divisa-este-lunes-19-de-octubre-504692
- Index.dev — LATAM Developer Rates 2025 (Colombia senior $68–88 USD/h). https://www.index.dev/blog/latam-developer-hourly-rates
- Toku — Software Engineer Salary Colombia 2025. https://www.toku.com/rates/software-engineer-salary-hiring-rates-colombia
- Computrabajo — salario desarrollador sénior Colombia. https://co.computrabajo.com/salarios/desarrollador-senior
- UCC — ¿Cuánto gana un programador en Colombia? https://blog.ucc.edu.co/cuanto-gana-programador-colombia
- Izaweb — Precios páginas web Colombia 2025. https://izaweb.com.co/blog/cuanto-cuesta-pagina-web-colombia-precios-reales-2025
- AndreDesign — ¿Cuánto cobra un desarrollador web? https://andredesignmarketing.com/cuanto-cobra-un-desarrollador-web/
- Granweb — Costo de una app en Colombia 2026. https://www.granweb.io/co/blog/desarrollar-una-app-colombia-2026
- SkyCode — Cotizador de desarrollo de software. https://skycode.agency/cotizador
- Softhian — Precios de software en Colombia. https://softhian.com/precios
