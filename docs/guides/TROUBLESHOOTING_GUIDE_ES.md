# 🛠 MCP Hub – Guía de Solución de Problemas (Español)

> Arreglos rápidos para los problemas más comunes en las demos o tus propias integraciones MCP.

---

## 1. Demo de Sistema de Archivos

| Síntoma | Causa | Solución |
|---------|-------|----------|
| `JSON-RPC error: EACCES` | Permisos insuficientes | Dar acceso a la carpeta o limitar permisos en prod. |
| Escaneo infinito | Demasiadas subcarpetas | Aumenta `maxDepth` o filtra con glob. |
| ZIP vacío | `files[]` vacío | Verifica `paths`. |

## 2. Demo de Base de Datos

| Síntoma | Causa | Fix |
|---------|-------|-----|
| Error de sintaxis SQL | SQL generado por LLM mal formado | Usa `safeMode:true` y pide ver el SQL. |
| UI se congela >10k filas | Resultado grande | `LIMIT` o `stream:true`. |
| CSV corrupto | Encoding | `encoding:"utf8"`. |

## 3. Demo de API

| Síntoma | Causa | Solución |
|---------|-------|----------|
| `401 Unauthorized` | Token expirado | Renueva token con `secrets/set`. |
| Error `CORS` | localhost → API prod | Usa proxy o activa CORS. |
| `429` | Rate limit | Agrupa solicitudes o backoff exponencial. |

## 4. Demo en Tiempo Real

| Síntoma | Causa | Fix |
|---------|-------|-----|
| WebSocket `1006` | Caída de red | `reconnect:true`, `maxRetries:5`. |
| Gráficos congelados | Pestaña inactiva | Reducir FPS o usar `visibilitychange`. |
| CPU alta | 60 fps y muchas streams | Downsample con `everyNth`. |

---

### Códigos de Error JSON-RPC

| Código | Significado | Acción |
|--------|-------------|--------|
| `-32700` | Error de parseo | Revisa JSON. |
| `-32601` | Método no encontrado | Verifica nombre. |
| `-32602` | Parámetros inválidos | Revisa campos. |
| `-32000` | Error del servidor | Ver detalles en `data`. |

---

### Más Ayuda

1. Discord `#troubleshooting`  
2. Issue en GitHub `mcphub/examples`  
3. Docs `/docs/mcp-protocol-basics#error-handling` 