# 📚 Best Practices – Filesystem Integrations with MCP

1. **Use Principle of Least Privilege**  
   • Scope the token or session to exact folders (`/project/releases/*`).
2. **Batch Operations**  
   • Combine moves/deletes into one `filesystem/batch` call to reduce round-trips.
3. **Progress Events**  
   • Subscribe to `filesystem/progress` and surface % complete for better UX.
4. **Name Collisions**  
   • Pass `onConflict:"rename"` or `"skip"` to avoid unintended overwrites.
5. **Atomic Archives**  
   • For release packaging call `filesystem/zip` **after** verifying checksum of each file.
6. **Audit Trail**  
   • Enable `logLevel:"info"` so every destructive op writes to audit log.
7. **Idempotency Keys**  
   • Include `idempotencyKey` in requests when automations may retry.

> **Cheat-sheet JSON**
```json
{
  "jsonrpc":"2.0",
  "method":"filesystem/batch",
  "params":{
    "operations":[
      {"op":"move","from":"/Desktop/*.log","to":"/archive/logs/"},
      {"op":"zip","dest":"/release/build.zip","paths":["/build/**/*"]}
    ],
    "onConflict":"rename",
    "logLevel":"info",
    "idempotencyKey":"{{uuid}}"
  },
  "id":"fs_batch_01"
}
``` 