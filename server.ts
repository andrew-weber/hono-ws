import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono()

app.get('/ws', upgradeWebSocket(() => {
  return {
    onMessage(event, ws) {
      console.log(`Message from client: ${JSON.stringify(event)}`)
      ws.send('Hello from server')
    },
    onClose: () => {
      console.log("Connection Closed")
    }
  }
}))

Bun.serve({
  fetch: app.fetch,
  websocket,
  port: 8787
})

export default app
