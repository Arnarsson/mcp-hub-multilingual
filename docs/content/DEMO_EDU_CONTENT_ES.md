# 🧠 MCP Hub – Contenido Educativo de las Demos (Español)

Objetivo: Cada demo cuenta una historia y comienza con el problema para mostrar POR QUÉ MCP importa y CÓMO se usa en la vida real.

---

## 1. Integración de Sistema de Archivos – «IA que realmente organiza tus archivos»

### 1.1 El Problema
> «Mi escritorio es un caos. Pierdo tiempo buscando archivos.»

Los chatbots tradicionales pueden *decir* cómo ordenar archivos, pero no pueden *hacerlo*. Con MCP, un asistente se conecta a un sistema de archivos (simulado) y actúa por ti.

### 1.2 Escenario Real
*Estás preparando un lanzamiento. Le pides a la IA:*  
1. Eliminar logs antiguos  
2. Crear carpeta `release/`  
3. Mover los últimos artefactos de build  
4. Comprimir todo en un zip

### 1.3 Paso a Paso
1. **Suscribirse a `fs/local`** – canal seguro con el servidor  
2. **Listar directorio** – `filesystem/list` muestra el desorden  
3. **Mover + eliminar en lote** – `filesystem/move`, `filesystem/delete`  
4. **Crear archivo zip** – `filesystem/zip`  
5. **Progreso** – eventos `filesystem/progress`

### 1.4 Mensajes MCP de Ejemplo
```json
// Subscribe
{
  "jsonrpc":"2.0",
  "method":"streams/subscribe",
  "params":{ "streamId":"fs/local" },
  "id":"sub_01"
}
```

### 1.5 ¿Por Qué Importa?
• Ahorra horas de trabajo manual  
• Acceso seguro con permisos  
• Mismo patrón para S3, Dropbox, Google Drive, etc.

### 1.6 Prueba Tú Mismo
Haz clic en **«Organizar mi release»** en la demo.

---

## 2. Conexión a Base de Datos – «IA que encuentra respuestas en tus datos»

### 2.1 Problema
> «Tengo datos, pero no tiempo para SQL.»

### 2.2 Escenario
*Líder de marketing* pregunta: «¿Quiénes fueron nuestros 10 clientes con mayor LTV el último trimestre?»

### 2.3 Flujo
1. Conectar a `db/sales` (ejemplo SQLite)  
2. La IA genera SQL: `SELECT user_id, SUM(total) AS ltv …`  
3. Resultados en tabla + gráfico de barras  
4. «Exportar a CSV» → `database/export`

### 2.4 Ejemplo
```json
{"jsonrpc":"2.0","method":"database/query","params":{"sql":"SELECT …"},"id":"q1"}
```

### 2.5 Valor
• Personal no técnico obtiene insights inmediatos  
• Funciona igual con Postgres, BigQuery, Snowflake

### 2.6 Inténtalo
Usa los **chips de pregunta rápida** o escribe la tuya.

---

## 3. Integración de API – «IA que se conecta a cualquier servicio»

### 3.1 Problema
> «Tengo decenas de APIs SaaS; la autenticación y docs son un dolor.»

### 3.2 Escenario
Automatización del stand-up diario: crear issue en GitHub y enviar enlace a Slack.

### 3.3 Flujo
1. Construir `POST /repos/:owner/:repo/issues`  
2. Enviar con `http/request`  
3. Extraer URL de la respuesta  
4. Enviar `POST /chat.postMessage` a Slack API

### 3.4 Snippet MCP
```json
{"jsonrpc":"2.0","method":"http/request","params":{"url":"https://api.github.com/repos/…","auth":{"bearer":"gh_pat…"},"body":{"title":"Daily stand-up"}},"id":"gh1"}
```

### 3.5 Resultado
• Sin código auth repetitivo  
• Reutilizable para cualquier REST/GraphQL

### 3.6 Prueba
Botón **GitHub → Slack** en la demo.

---

## 4. Datos en Tiempo Real – «IA que siempre está al día»

### 4.1 Problema
> «Los dashboards van retrasados; necesito respuestas en vivo.»

### 4.2 Escenario
*Inversor* monitorea la acción de AAPL y la CPU del bot de trading en un solo lugar.

### 4.3 Flujo
1. Suscribirse a `stream/finance.aapl` + `stream/system.cpu`  
2. Simulador WebSocket envía datos cada segundo  
3. Gráficos actualizan a 60 fps  
4. IA puede pausar, filtrar y exportar CSV

### 4.4 Evento de Ejemplo
```json
{
  "jsonrpc":"2.0",
  "method":"stream/data",
  "params":{
    "streamId":"finance.aapl",
    "timestamp":1718389500,
    "price":195.43,
    "volume":3200
  }
}
```

### 4.5 ¿Por Qué Importa?
• Una sola interfaz para cualquier feed en vivo  
• Ideal para IoT, finanzas, monitoreo de operaciones  
• Mismo patrón con WebSockets reales

### 4.6 Prueba
Activa el preset **«Portafolio en vivo»**.

---

## Pasos Siguientes
* Docs → `/docs/mcp-protocol-basics`  
* Repo de ejemplo → `examples/mcp-node`  
* Comunidad → Discord #mcphub

---

### ✨ Cómo Localizar
Traduce títulos y texto; JSON permanece en inglés. 