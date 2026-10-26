# 02 — Estructura objetivo del plan de negocio

> La secuencia destino del plan de negocio de Makicol, tanto en los documentos de `docs/plan-de-negocio/`
> como en el recorrido de la web `proposal`. Base: estructura estándar reconocida (SBA / LivePlan) y la
> variante para marketplaces de dos lados. Rige la regla 7 (recorrido narrativo) de `00-reglas-del-proceso.md`.
> Cambiar esta estructura requiere autorización expresa.

## El recorrido en tres momentos

Cada sección pertenece a uno de los tres momentos del recorrido (regla 7):

- **Qué buscamos** — la visión y el problema.
- **Qué tenemos hoy** — el demo, verificado contra el código y el Swagger.
- **A dónde vamos** — el plan para producción, con sus decisiones y pendientes.

## Las secciones

| # | Sección | Momento | Propósito en una frase |
|---|---|---|---|
| 1 | Resumen ejecutivo | Qué buscamos | Qué es Makicol, a quién sirve y qué se pide, en una página. |
| 2 | Descripción del negocio | Qué buscamos | Misión, origen (FilSMar / Unimagdalena, Santa Marta) y equipo. |
| 3 | Problema y solución | Qué buscamos | El artesano del Caribe sin canal digital y cómo Makicol lo resuelve. |
| 4 | Análisis de mercado | Qué buscamos | Tamaño y demanda de la artesanía colombiana; comprador local e internacional. |
| 5 | Competencia y ventaja | Qué buscamos | Con qué compite Makicol y qué lo diferencia. |
| 6 | Modelo de negocio | A dónde vamos | Marketplace de dos lados; modelo B directo sin comisión; patrocinio como financiación base. |
| 7 | Producto y plataforma | Qué tenemos hoy | El demo: cuatro roles, catálogo, pedidos, reseñas, soporte, auditoría. |
| 8 | Marketing y adquisición | A dónde vamos | Cómo llegan compradores y artesanos; captación y retención. |
| 9 | Operaciones | A dónde vamos | Pagos y envíos (Servientrega), soporte, autenticación (Auth0), simulación en el backend. |
| 10 | Organización y equipo | Qué buscamos | Roles de las personas, responsabilidades y necesidad de asesoría legal. |
| 11 | Hitos y métricas | A dónde vamos | Fases, el piloto y las métricas de éxito. |
| 12 | Plan financiero | A dónde vamos | Ingresos, costos (Azure, identidad, legal por cotizar) y valoración del trabajo. |
| 13 | Apéndices (detalles profundos) | Qué tenemos hoy / A dónde vamos | Accesos al final: modelo de datos, contrato API, investigación de pagos y envíos, autenticación, envíos internacionales. |

## Regla de los apéndices

Los apéndices (§13) son los **detalles profundos** a los que se accede desde el final del recorrido
(regla 8). Cada apéndice técnico declara su sincronía con el backend (regla 9): `espejo del backend hoy`
o `estado objetivo`. Candidatos actuales: diagrama ER de la base de datos, contrato de API, estados del
pedido, evaluación back-office, envíos internacionales (rotulado "fase futura, no ejecutada").
