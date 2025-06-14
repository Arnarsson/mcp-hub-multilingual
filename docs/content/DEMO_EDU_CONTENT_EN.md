# 🧠 MCP Hub – Educational Demo Content (English)

Aimed at turning each interactive demo into a story-driven, problem-first learning experience that shows WHY MCP matters and HOW to use it in the real world.

---

## 1. Filesystem Integration Demo – "AI That Actually Manages Your Files"

### 1.1 The Problem
> "My desktop is a mess. I waste time digging for the right file."

Traditional AI chatbots can *tell* you how to organise files but can't *do* it. MCP lets an assistant connect to a real (or simulated) file system and act on your behalf.

### 1.2 Real-World Scenario
*You're prepping a release. You ask your AI assistant to:*  
1. Clean up old log files  
2. Create a fresh `release/` folder  
3. Move the latest build artefacts into it  
4. Zip everything for sharing

### 1.3 Step-by-Step Walk-Through
1. **Subscribe to `fs/local`** – establishes a secure channel to the file server
2. **List directory** – assistant calls `filesystem/list` → shows messy tree
3. **Batch move + delete** – `filesystem/move`, `filesystem/delete`
4. **Create archive** – `filesystem/zip`
5. **Progress feedback** – server emits `filesystem/progress` events

### 1.4 Sample MCP Messages
```json
// Subscribe
{
  "jsonrpc":"2.0",
  "method":"streams/subscribe",
  "params":{ "streamId":"fs/local" },
  "id":"sub_01"
}

// List dir
{
  "jsonrpc":"2.0",
  "method":"filesystem/list",
  "params":{ "path":"/Desktop" },
  "id":"list_01"
}

// Server response (truncated)
{
  "jsonrpc":"2.0",
  "result":{
    "files":[{"name":"error.log","size":10234}, …]
  },
  "id":"list_01"
}
```

### 1.5 Why It Matters
• Saves hours of manual file wrangling  
• Demonstrates secure, permission-scoped tooling  
• Same pattern works for S3, Dropbox, Google Drive, etc.

### 1.6 Try This
*Click **"Organise my release"** in the demo to run the full flow above.*

---

## 2. Database Connection Demo – "AI That Finds Answers In Your Data"

### 2.1 The Problem
> "I have data in a database but no time to write SQL."

### 2.2 Scenario
*Marketing lead* asks: "Who are our top 10 customers by lifetime value last quarter?"

### 2.3 Walk-Through
1. Connect to `db/sales` (SQLite sample)  
2. Assistant generates SQL: `SELECT user_id, SUM(total) AS ltv …`  
3. Results visualised in a table + bar chart  
4. Follow-up: "Export to CSV" triggers `database/export`

### 2.4 Sample Messages
```json
// Query
{"jsonrpc":"2.0","method":"database/query","params":{"sql":"SELECT …"},"id":"q1"}
```

### 2.5 Real-World Value
• Non-technical staff get instant insights  
• Works with Postgres, BigQuery, Snowflake the same way

### 2.6 Try This
Use the **quick question chips** in the demo or type your own.

---

## 3. API Integration Demo – "AI That Connects To Any Service"

### 3.1 Problem
> "I juggle dozens of SaaS APIs – authentication and docs are a pain."

### 3.2 Scenario
*Team stand-up* automation: create a GitHub issue, then post the link to Slack.

### 3.3 Flow
1. Build a `POST /repos/:owner/:repo/issues` request  
2. Send via `http/request`  
3. Extract URL from response  
4. Send `POST /chat.postMessage` to Slack API

### 3.4 MCP Snippet (combined)
```json
{"jsonrpc":"2.0","method":"http/request","params":{"url":"https://api.github.com/repos/…","auth":{"bearer":"gh_pat…"},"body":{"title":"Daily stand-up"}},"id":"gh1"}
```

### 3.5 Outcomes
• Zero boilerplate auth handling  
• Reusable across ANY REST/GraphQL service

### 3.6 Try This
Use the preset **GitHub → Slack** workflow button.

---

## 4. Real-Time Data Demo – "AI That Stays Up-to-Date"

### 4.1 Problem
> "Dashboards lag; I need live answers."

### 4.2 Scenario
*Investor* monitoring AAPL stock price and CPU usage of trading bot server in one place.

### 4.3 Flow
1. Subscribe to `stream/finance.aapl` + `stream/system.cpu`  
2. WebSocket simulator pushes tick data every second  
3. Charts update in real time (60 fps)  
4. Assistant can pause, filter, export CSV

### 4.4 Example Stream Event
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

### 4.5 Why It Matters
• Single interface for ANY real-time feed  
• Ideal for IoT, finance, ops monitoring  
• Same pattern works with genuine WebSocket endpoints

### 4.6 Try This
Toggle **"Live portfolio"** preset to see multi-stream sync.

---

## Next-Step Learning Links
* Deep dive docs → `/docs/mcp-protocol-basics`  
* Real implementation walkthrough → GitHub repo `examples/mcp-node`  
* Join the community → Discord #mcphub

---

### ✨ How To Localise
Translate section headings (`##`), bullet text and code comments only – JSON examples stay English for consistency.

---

> **Tip for integrators:** Each `Try This` action already has helper functions in the JS (`runFilesystemStory()`, `runTopCustomersStory()`, etc.). Simply wire the new buttons to these. 