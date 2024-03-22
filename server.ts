import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono()

app.get('/ws', upgradeWebSocket(() => {
  return {
    onMessage(event, ws) {
      console.log(`message from client: ${event.data}`)
      ws.send('pong')
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
