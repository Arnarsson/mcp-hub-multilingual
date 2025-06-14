# 🧠 MCP Hub – Uddannelsesdemo Indhold (Dansk)

Målet er at gøre hver interaktiv demo historiedrevet og problem-først, så brugeren forstår HVORFOR MCP er vigtig og HVORDAN den bruges i praksis.

---

## 1. Filsystem-integration Demo – "AI Der Rent Faktisk Ordner Dine Filer"

### 1.1 Problemet
> "Mit skrivebord er et rod. Jeg spilder tid på at lede efter den rigtige fil."

Traditionelle AI-chatbots kan *forklare* hvordan man organiserer filer, men kan ikke *gøre* det. MCP giver assistenten adgang til et (simuleret) filsystem og kan handle på dine vegne.

### 1.2 Virkeligt Scenarie
*Du forbereder en release. Du beder AI-assistenten om at:*  
1. Rydde gamle logfiler op  
2. Oprette en ny `release/`-mappe  
3. Flytte de nyeste build-artefakter derind  
4. Zippe det hele til deling

### 1.3 Trin-for-trin Gennemgang
1. **Subscribe til `fs/local`** – opretter sikker kanal til filserveren  
2. **List mappe** – assistenten kalder `filesystem/list` → viser rodet træ  
3. **Batch flyt + slet** – `filesystem/move`, `filesystem/delete`  
4. **Opret arkiv** – `filesystem/zip`  
5. **Fremdriftsfeedback** – serveren udsender `filesystem/progress` events

### 1.4 Eksempel MCP-beskeder
```json
// Subscribe
{
  "jsonrpc":"2.0",
  "method":"streams/subscribe",
  "params":{ "streamId":"fs/local" },
  "id":"sub_01"
}
```

### 1.5 Hvorfor Det Er Vigtigt
• Spar timevis af manuel filhåndtering  
• Viser sikker, permissions-begrænset adgang  
• Samme mønster virker for S3, Dropbox, Google Drive osv.

### 1.6 Prøv Selv
Klik **"Organiser min release"** i demoen for at køre hele flowet.

---

## 2. Databaseforbindelse Demo – "AI Der Finder Svar I Dine Data"

### 2.1 Problemet
> "Jeg har data i en database, men ingen tid til SQL."

### 2.2 Scenarie
*Marketing-lederen* spørger: "Hvem er vores 10 bedste kunder målt på LTV sidste kvartal?"

### 2.3 Flow
1. Forbind til `db/sales` (SQLite eksempel)  
2. Assistenten genererer SQL: `SELECT user_id, SUM(total) AS ltv …`  
3. Resultater vises i tabel + søjlediagram  
4. Opfølgning: "Eksportér til CSV" kører `database/export`

### 2.4 Eksempelbesked
```json
{"jsonrpc":"2.0","method":"database/query","params":{"sql":"SELECT …"},"id":"q1"}
```

### 2.5 Værdi
• Ikke-tekniske medarbejdere får hurtige indsigter  
• Virker også med Postgres, BigQuery, Snowflake

### 2.6 Prøv Selv
Brug **hurtigspørgsmål** chipsene eller skriv dit eget.

---

## 3. API-integration Demo – "AI Der Forbinder Sig Til Alle Tjenester"

### 3.1 Problemet
> "Jeg jonglerer dusinvis af SaaS-API'er – auth og docs er besværlige."

### 3.2 Scenarie
*Daily stand-up* automation: opret et GitHub-issue og post linket i Slack.

### 3.3 Flow
1. Byg `POST /repos/:owner/:repo/issues` anmodning  
2. Send via `http/request`  
3. Udtræk URL fra svaret  
4. Send `POST /chat.postMessage` til Slack API

### 3.4 MCP-snippet
```json
{"jsonrpc":"2.0","method":"http/request","params":{"url":"https://api.github.com/repos/…","auth":{"bearer":"gh_pat…"},"body":{"title":"Daily stand-up"}},"id":"gh1"}
```

### 3.5 Resultat
• Ingen boilerplate auth-kode  
• Genbrugelig til enhver REST/GraphQL-service

### 3.6 Prøv Selv
Brug knappen **GitHub → Slack workflow**.

---

## 4. Realtidsdata Demo – "AI Der Altid Er Opdateret"

### 4.1 Problemet
> "Dashboards halter; jeg har brug for live svar."

### 4.2 Scenarie
*Investor* overvåger AAPL-aktien og CPU-forbrug på trading-bot serveren samme sted.

### 4.3 Flow
1. Subscribe til `stream/finance.aapl` + `stream/system.cpu`  
2. WebSocket-simulator sender ticks hvert sekund  
3. Grafer opdateres i realtid (60 fps)  
4. Assistenten kan pause, filtrere, eksportere CSV

### 4.4 Eksempel event
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

### 4.5 Hvorfor Det Er Vigtigt
• Én grænseflade til alle realtime feeds  
• Perfekt til IoT, finans, driftsovervågning  
• Samme mønster med ægte WebSocket-endpoints

### 4.6 Prøv Selv
Slå **"Live-portefølje"** til for at se flere streams samtidigt.

---

## Næste Skridt Links
* Dyk dybere → `/docs/mcp-protocol-basics`  
* Reel implementering → GitHub repo `examples/mcp-node`  
* Fællesskab → Discord #mcphub

---

### ✨ Sådan Lokaliseres
Oversæt overskrifter, brødtekst og kodekommentarer – JSON forbliver engelsk. 