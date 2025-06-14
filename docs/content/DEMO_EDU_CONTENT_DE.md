# 🧠 MCP Hub – Demo-Lerninhalte (Deutsch)

Ziel: Jede interaktive Demo erzählt eine Geschichte und beginnt mit dem Problem, damit klar wird, WARUM MCP wichtig ist und WIE es in der Praxis funktioniert.

---

## 1. Dateisystem-Integration – „KI, die deine Dateien wirklich aufräumt“

### 1.1 Das Problem
> „Mein Desktop ist chaotisch. Ich verbringe zu viel Zeit mit Suchen.“

Normale Chatbots können *erklären*, wie man Dateien sortiert, aber sie können es nicht *tun*. Mit MCP verbindet sich ein Assistent mit einem (simulierten) Dateisystem und handelt für dich.

### 1.2 Reales Szenario
*Du bereitest ein Release vor. Du bittest die KI:*  
1. Alte Log-Dateien löschen  
2. Ordner `release/` anlegen  
3. Neueste Build-Artefakte hinein verschieben  
4. Alles zippen

### 1.3 Schritt-für-Schritt
1. **Subscribe `fs/local`** – sichere Verbindung herstellen  
2. **Verzeichnis auflisten** – `filesystem/list` zeigt Chaos  
3. **Verschieben + Löschen** – `filesystem/move`, `filesystem/delete`  
4. **Archiv erstellen** – `filesystem/zip`  
5. **Fortschritts-Events** – `filesystem/progress`

### 1.4 Beispiel-Nachrichten
```json
// Subscribe
{
  "jsonrpc":"2.0",
  "method":"streams/subscribe",
  "params":{ "streamId":"fs/local" },
  "id":"sub_01"
}
```

### 1.5 Warum relevant?
• Spart stundenlange manuelle Arbeit  
• Zeigt sichere, berechtigungsbezogene Zugriffe  
• Gleiches Muster für S3, Dropbox, Google Drive usw.

### 1.6 Probiere es aus
Klicke **„Release organisieren"** im Demo-Dialog.

---

## 2. Datenbank-Demo – „KI, die Antworten in deinen Daten findet"

### 2.1 Problem
> „Ich habe Daten, aber keine Zeit für SQL.“

### 2.2 Szenario
*Marketing-Lead* fragt: „Wer waren unsere Top-10-Kunden nach LTV im letzten Quartal?“

### 2.3 Ablauf
1. Verbinde `db/sales` (SQLite Beispiel)  
2. Assistent generiert SQL `SELECT user_id, SUM(total) AS ltv …`  
3. Ergebnisse als Tabelle + Balkendiagramm  
4. „Als CSV exportieren" → `database/export`

### 2.4 Beispiel
```json
{"jsonrpc":"2.0","method":"database/query","params":{"sql":"SELECT …"},"id":"q1"}
```

### 2.5 Nutzen
• Nicht-Techniker erhalten sofort Insights  
• Funktioniert identisch mit Postgres, BigQuery, Snowflake

### 2.6 Ausprobieren
Nutze die **Schnellfrage-Chips** oder schreibe deine eigene Frage.

---

## 3. API-Integration – „KI, die jeden Dienst anbindet"

### 3.1 Problem
> „Zig SaaS-APIs, Auth und Dokumentation nerven.“

### 3.2 Szenario
Daily-Stand-up Automation: GitHub-Issue erstellen und Link in Slack posten.

### 3.3 Flow
1. `POST /repos/:owner/:repo/issues` bauen  
2. Über `http/request` senden  
3. URL aus Antwort extrahieren  
4. `POST /chat.postMessage` an Slack API

### 3.4 MCP Snippet
```json
{"jsonrpc":"2.0","method":"http/request","params":{"url":"https://api.github.com/repos/…","auth":{"bearer":"gh_pat…"},"body":{"title":"Daily stand-up"}},"id":"gh1"}
```

### 3.5 Ergebnis
• Keine Boilerplate-Auth  
• Wiederverwendbar für jede REST/GraphQL API

### 3.6 Testen
Drücke **GitHub → Slack Workflow**.

---

## 4. Echtzeitdaten-Demo – „KI, die immer aktuell bleibt"

### 4.1 Problem
> „Dashboards hinken hinterher; ich brauche Live-Antworten.“

### 4.2 Szenario
*Investor* beobachtet AAPL-Aktie und CPU-Load des Trading-Bots in einem Blick.

### 4.3 Ablauf
1. Subscribe `stream/finance.aapl` + `stream/system.cpu`  
2. WebSocket-Simulator sendet jede Sekunde Daten  
3. Charts aktualisieren sich mit 60 fps  
4. Assistent kann pausieren, filtern, CSV exportieren

### 4.4 Event-Beispiel
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

### 4.5 Warum relevant?
• Einheitliche Schnittstelle für alle Realtime-Feeds  
• Ideal für IoT, Finance, Monitoring  
• Gleiches Muster mit echten WebSockets

### 4.6 Probiere es
Aktiviere **„Live-Portfolio"**-Preset.

---

## Nächste Schritte
* Docs → `/docs/mcp-protocol-basics`  
* Beispiel-Repo → `examples/mcp-node`  
* Community → Discord #mcphub

---

### ✨ Lokalisation
Übersetze Überschriften & Fließtext, JSON bleibt Englisch. 