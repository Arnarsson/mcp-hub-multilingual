# 📚 Best Practices – Database Integrations with MCP

1. **Parameterized Queries First**  
   • Prevent SQL injection: always pass `params:{...}` instead of string-concat.
2. **Safe Mode for LLM-generated SQL**  
   • Add `safeMode:true` so the driver validates and EXPLAINS before execution.
3. **Pagination & Streaming**  
   • Use `LIMIT`, `OFFSET`, or `stream:true` when expecting >5k rows.
4. **Schema Discovery**  
   • Cache results of `database/introspect` to avoid repetitive metadata fetches.
5. **Read Replica Awareness**  
   • Route heavy SELECTs to replicas with `target:"replica"` param.
6. **Timeouts & Retries**  
   • Set `timeoutMs` and `retry:{attempts:3,backoff:"exponential"}` to handle flaky networks.
7. **Result Format**  
   • Request `format:"arrow"` for large analytics—40-70 % smaller payloads compared to JSON.

> **Cheat-sheet JSON**
```json
{
  "jsonrpc":"2.0",
  "method":"database/query",
  "params":{
    "sql":"SELECT user_id, SUM(total) AS ltv FROM orders GROUP BY user_id ORDER BY ltv DESC LIMIT 100",
    "safeMode":true,
    "stream":true,
    "timeoutMs":8000,
    "retry":{"attempts":3,"backoff":"exponential"}
  },
  "id":"db_q_top_ltv"
}
``` 