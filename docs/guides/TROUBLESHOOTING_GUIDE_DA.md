# 🛠 MCP Hub – Fejlfinding (Dansk)

> Hurtige løsninger på almindelige problemer, du kan møde i demoerne eller dine egne MCP-integrationer.

---

## 1. Filsystem-demo

| Symptom | Sandsynlig årsag | Løsning |
|---------|-----------------|---------|
| `JSON-RPC error: EACCES` | Manglende filrettigheder | • Giv sandbox adgang til mappen.<br/>• I produktion: begræns læse/skrivetilladelser til nødvendige stier. |
| "Scanning færdiggøres aldrig" | For mange undermapper | • Øg `maxDepth` eller filtrér med glob f.eks. `*.txt`. |
| `filesystem/zip` giver tom arkiv | Tom `files[]` | Kontrollér at du sendte stier i `paths`. |

## 2. Database-demo

| Symptom | Årsag | Fix |
|---------|-------|-----|
| SQL-syntaksfejl | LLM genererede dårlig SQL | • Brug `safeMode:true`.<br/>• Bed om at se SQL først. |
| UI fryser ved store resultater | >10k rækker | Brug `LIMIT` / `stream:true`. |
| CSV eksport korrupt | Encoding | Sæt `encoding:"utf8"`. |

## 3. API-demo

| Symptom | Årsag | Løsning |
|---------|-------|---------|
| `401 Unauthorized` | Token udløbet | Forny token via `secrets/set`. |
| `CORS` fejl | Lokalhost → prod API | Brug proxy eller aktiver CORS. |
| `429` | Rate limit | Batch opkald eller backoff. |

## 4. Realtids-demo

| Symptom | Årsag | Fix |
|---------|-------|-----|
| WebSocket `1006` | Netværksdrop | `reconnect:true`, `maxRetries:5`. |
| Grafer stopper | Browser tab inaktiv | Throttle FPS ved `visibilitychange`. |
| Høj CPU | For mange streams @60 fps | Downsample med `everyNth`. |

---

### Generelle JSON-RPC-fejlkoder

| Kode | Betydning | Handling |
|------|-----------|----------|
| `-32700` | Parse-fejl | Tjek JSON. |
| `-32601` | Metode findes ikke | Stav navnet korrekt. |
| `-32602` | Ugyldige parametre | Tjek felter. |
| `-32000` | Serverfejl | Se `data` for detaljer. |

---

### Mere hjælp

1. Join Discord `#troubleshooting`.  
2. Opret GitHub-issue i `mcphub/examples`.  
3. Læs `/docs/mcp-protocol-basics#error-handling`. 