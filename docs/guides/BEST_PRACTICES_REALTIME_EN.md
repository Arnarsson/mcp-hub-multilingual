# 📚 Best Practices – Real-Time Stream Integrations with MCP

1. **Back-Pressure Handling**  
   • Set `bufferSize` and `highWaterMark` params to avoid memory blow-ups.
2. **Auto-Reconnect**  
   • `reconnect:true`, `maxRetries:10`, `retryDelayMs:1000`.
3. **Heartbeat/Ping**  
   • Use `pingIntervalSec:30`; server replies with `pong` to detect half-open connections.
4. **Delta Compression**  
   • Ask server for `mode:"diff"` to receive only changed fields (saves 60-80 % bandwidth).
5. **Batch Rendering**  
   • Throttle UI updates with `requestAnimationFrame` or aggregate every N messages.
6. **Security**  
   • Always use `wss://` in production; verify server TLS fingerprint.
7. **Graceful Shutdown**  
   • Call `streams/unsubscribe` before closing tab to free server resources.

> **Cheat-sheet JSON**
```json
{
  "jsonrpc":"2.0",
  "method":"streams/subscribe",
  "params":{
    "streamId":"finance.aapl",
    "reconnect":true,
    "maxRetries":10,
    "pingIntervalSec":30,
    "mode":"diff"
  },
  "id":"sub_aapl"
}
``` 