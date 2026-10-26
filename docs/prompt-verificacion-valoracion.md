# Prompt para verificación independiente de la valoración Makicol

> Documento de trabajo para contrastar la estimación de `valoracion-trabajo-realizado.md`
> con otros modelos de IA. Contiene dos versiones del prompt y una plantilla de comparación.
>
> **Cómo usarlo:** copia el PROMPT A en un modelo con acceso a internet (ChatGPT, Claude,
> Gemini, Grok…) y el PROMPT B en uno sin navegación. Pega las respuestas en la tabla de
> comparación del §3. Para evitar sesgo, el prompt NO incluye las tarifas ni el resultado
> de nuestra estimación.

---

## 1. PROMPT A — para modelos con acceso a internet

```text
Actúa como un consultor senior en valoración de proyectos de software en Colombia.
Necesito una estimación confiable, en pesos colombianos (COP), del VALOR DEL TRABAJO
DE DESARROLLO REALIZADO en un proyecto llamado Makicol (marketplace de artesanías
colombianas), desarrollado por una sola persona con asistencia de IA.

## Alcance medido del trabajo (datos verificados al 19-oct-2026)

### Componente 1 — Backend .NET (repo "PROYECTO_MARKETPLACE_MAKICOL")
- 66 archivos C#, ~10.600 líneas de código.
- Clean Architecture en 4 capas: Domain, Application, Infrastructure, WebApi.
- Autenticación JWT, Entity Framework Core + Azure SQL.
- Abstracción IFileStorage con implementaciones LocalFileStorage y AzureBlob.
- Rate limiting, middleware global de excepciones, pipeline de validación.
- 4 migraciones EF Core; seeders idempotentes (estados, FAQ, datos demo con
  9 usuarios en 4 roles: comprador, artesano, soporte, auditor).
- Pipeline CI en azure-pipelines.yml. Backend desplegado en Azure App Service.
- Sin proyecto de tests automatizados.
- Período de commits: 15-sep → 19-oct-2026 (~5 semanas).

### Componente 2 — Frontend (repo "makicol-marketplace-web")
- Monorepo Nx, Angular 22 standalone, NgRx Signals, Tailwind v4.
- 43 proyectos internos con module boundaries enforceados por ESLint.
- ~25.800 líneas de código (ts/html/scss) en apps, libs y tools.
- Design system propio: 30 componentes "Mk*" (button, card, modal, data-table,
  chart, stepper, toast, etc.).
- 159 archivos de tests unitarios (Vitest); 6 suites e2e (Playwright).
- 4 aplicaciones por rol (comprador, artesano, soporte, auditor) + área pública.
- 39 documentos de especificación (~6.900 líneas) que gobiernan el desarrollo
  + ~300 KB de documentación de arquitectura.
- Período de commits: 5-oct → 19-oct-2026 (~2 semanas).

### Componente 3 — Propuesta de negocio (repo "makicol_marketplace_poposal")
- ~8.300 líneas Angular: sitio de propuesta ejecutiva con simulador interactivo
  de costos de infraestructura Azure, secciones de arquitectura, contrato API,
  diseño de base de datos (diagrama ER iterado 6 veces), internacionalización
  y prototipo navegable del marketplace por rol.
- Período de commits: 7-jul → 8-oct-2026 (intermitente).

### Contexto relevante
- Desarrollador único, trabajo asistido por IA (las horas REALES invertidas son
  menores que las horas-equivalente de mercado; valora el RESULTADO, no el
  esfuerzo cronometrado).
- Nivel de acabado: alto en frontend (tests, boundaries, design system,
  spec-driven); sólido en backend (arquitectura limpia, integraciones Azure)
  aunque sin tests; documentación de producto extensa.
- Funcionalidad: marketplace multi-rol con catálogo, pedidos, reseñas, wishlist,
  soporte con casos, verificación de artesanos, auditoría, historias dinámicas.

## Tu tarea

1. INVESTIGA en internet las tarifas vigentes (2025-2026) en Colombia para:
   - Tarifa por hora de desarrollador full-stack senior freelance (en COP).
   - Costo mensual de un desarrollador senior empleado incluyendo prestaciones.
   - Tarifa de agencias de software colombianas por hora.
   - Precios de referencia de proyectos comparables (marketplace, plataforma
     multi-rol) en agencias colombianas.
   - La TRM (tasa de cambio USD→COP) actual.
   CITA las fuentes (URL + fecha) de cada dato que uses.

2. ESTIMA las horas-equivalente que un equipo senior tardaría en reproducir
   este alcance con este nivel de acabado, desglosado por componente.
   Justifica cada número.

3. CALCULA el valor del trabajo con AL MENOS dos métodos independientes
   (ej.: horas × tarifa de mercado; costo de equipo empleado; benchmark de
   precios de agencia por proyecto comparable) y triangula un rango final
   en COP.

4. ENTREGA tu respuesta con este formato exacto para facilitar comparación:

   ### a) Datos de mercado usados (tabla: concepto | valor | fuente | fecha)
   ### b) Horas-equivalente por componente (tabla + justificación)
   ### c) Resultado por método (tabla: método | rango COP)
   ### d) Rango final recomendado: $X – $Y millones COP (≈ USD Z)
   ### e) Supuestos clave y nivel de confianza (alto/medio/bajo)
   ### f) Factores que subirían o bajarían tu estimación

5. Sé explícito sobre incertidumbre. Si tus rangos son muy amplios, explica
   por qué. No ajustes tu respuesta para sonar precisa: prefiero honestidad.
```

---

## 2. PROMPT B — para modelos SIN acceso a internet

Igual que el A pero con los datos de mercado ya investigados adjuntos, para
comparar el *razonamiento* con los mismos insumos:

```text
[pegar aquí el mismo encabezado y el mismo "Alcance medido del trabajo"
 del PROMPT A, incluyendo el contexto relevante]

## Datos de mercado ya investigados (Colombia, oct-2026)

- TRM: $3.174,67 COP por USD (19-oct-2026, Superfinanciera).
- Freelance junior: COP $30–50 K/h. Mid: $50–80 K/h.
- Freelance senior full-stack local: COP $80–150 K/h.
- Salario senior empleado: COP $7–12 M/mes; costo empleador +29–32%
  → ~$9–15,8 M/mes (~$55–95 K/h a jornada de 168 h).
- Nearshore senior Colombia: USD $55–88/h.
- Agencia local mediana: COP $60–120 K/h; grande Bogotá/Medellín: $100–200 K+/h.
- Benchmarks de proyecto: producto operativo con backend y roles $32–60 M;
  plataforma empresarial $72–140 M+; plataforma a la medida desde $12–30 M+
  por módulo.

## Tu tarea

Con esos datos: estima horas-equivalente por componente, calcula el valor con
al menos dos métodos independientes y triangula un rango final en COP.

[pegar aquí el punto 4 del PROMPT A con el formato de entrega exacto,
 y el punto 5]
```

---

## 3. Plantilla de comparación de resultados

Rellenar con la respuesta de cada modelo:

| Modelo | Horas eq. total | Tarifa base usada | Rango final (COP M) | Rango final (USD K) | Confianza | Notas |
|---|---|---|---|---|---|---|
| SWE-2 (Devin) | 550–750 | $80–120 K/h freelance | **50 – 95** | 16 – 30 | medio | `valoracion-trabajo-realizado.md` |
| ChatGPT | | | | | | |
| Claude | | | | | | |
| Gemini | | | | | | |
| Otro: | | | | | | |

### Señales de calidad a revisar en cada respuesta

- [ ] ¿Las horas-equivalente son creíbles para ~45 K LOC + 159 specs + docs?
- [ ] ¿Las tarifas citan fuentes reales y vigentes?
- [ ] ¿Usó ≥2 métodos independientes y los trianguló?
- [ ] ¿El rango final es consistente con sus propios insumos?
- [ ] ¿Distinguió valor de reposición vs valor del producto/empresa?

### Criterio de veredicto

- Si los rangos independientes se solapan con el nuestro (50–95 M): confirma el orden de magnitud.
- Si divergen: revisar *qué insumo* difiere (horas vs tarifa) — suele ser más informativo que el número final.
