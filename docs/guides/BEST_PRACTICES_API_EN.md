# 📚 Best Practices – API Integrations with MCP

1. **Centralise Secrets**  
   • Store in `secrets/` server with RBAC, never hard-code tokens.
2. **Idempotent POSTs**  
   • Add `X-Idempotency-Key` header or `idempotencyKey` param to prevent duplicates.
3. **Retry Strategy**  
   • Use `retry:{attempts:3,backoff:"jitter"}` for 502/503/504.
4. **Pagination Helper**  
   • Include `autoPaginate:true` so the MCP client keeps requesting `nextPage` tokens.
5. **Rate Limit Safety**  
   • Respect `x-ratelimit-remaining`, throttle if <10 %.
6. **Error Object Pass-through**  
   • Set `forwardErrorBody:true` to surface provider error details in LLM chat.
7. **JSON ↔️ Form Handling**  
   • If endpoint needs form-urlencoded, set `bodyType:"form"` and pass object – library handles encoding.

> **Cheat-sheet JSON**
```json
{
  "jsonrpc":"2.0",
  "method":"http/request",
  "params":{
    "url":"https://api.github.com/repos/myorg/app/issues",
    "method":"POST",
    "auth":{"bearer":"{{secrets.github}}"},
    "headers":{"X-Idempotency-Key":"{{uuid}}"},
    "body":{"title":"Daily Stand-up","labels":["standup"]},
    "retry":{"attempts":3,"backoff":"jitter"},
    "forwardErrorBody":true
  },
  "id":"api_issue_create"
}
``` 