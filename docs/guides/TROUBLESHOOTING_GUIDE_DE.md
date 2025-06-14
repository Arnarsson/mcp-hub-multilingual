# 🛠 MCP Hub – Fehlerbehebung (Deutsch)

> Schnelle Lösungen für häufige Probleme in den Demos oder eigenen MCP-Integrationen.

---

## 1. Dateisystem-Demo

| Symptom | Ursache | Lösung |
|---------|---------|--------|
| `JSON-RPC error: EACCES` | Zugriffsrechte fehlen | Sandbox Zugriff geben oder Pfadberechtigungen anpassen. |
| Scan läuft endlos | Zu tiefe Ordnerstruktur | `maxDepth` erhöhen oder mit Glob filtern. |
| Leeres ZIP | `files[]` leer | Pfade prüfen. |

## 2. Datenbank-Demo

| Symptom | Ursache | Fix |
|---------|---------|-----|
| SQL-Syntaxfehler | LLM-SQL fehlerhaft | `safeMode:true` + SQL vorher anzeigen. |
| UI friert bei großen Ergebnissen | >10k Zeilen | `LIMIT`, `stream:true`. |
| CSV kaputt | Encoding | `encoding:"utf8"`. |

## 3. API-Demo

| Symptom | Ursache | Lösung |
|---------|---------|--------|
| `401 Unauthorized` | Token abgelaufen | Token erneuern über `secrets/set`. |
| `CORS` Fehler | localhost → prod API | Proxy nutzen oder CORS aktivieren. |
| `429` | Rate Limit | Requests batchen oder Backoff. |

## 4. Echtzeit-Demo

| Symptom | Ursache | Fix |
|---------|---------|-----|
| WebSocket `1006` | Netzwerkunterbruch | `reconnect:true`, `maxRetries:5`. |
| Charts stehen still | Tab inaktiv | FPS drosseln. |
| Hohe CPU | 60 fps viele Streams | Mit `everyNth` downsamplen. |

---

### Allgemeine JSON-RPC Fehlercodes

| Code | Bedeutung | Aktion |
|------|-----------|--------|
| `-32700` | Parse-Fehler | JSON prüfen. |
| `-32601` | Methode fehlt | Namen prüfen. |
| `-32602` | Ungültige Parameter | Felder prüfen. |
| `-32000` | Serverfehler | `data` Details ansehen. |

---

### Mehr Hilfe

1. Discord `#troubleshooting`  
2. GitHub-Issue in `mcphub/examples`  
3. Docs `/docs/mcp-protocol-basics#error-handling` 