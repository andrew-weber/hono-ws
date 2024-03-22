import { hc } from 'hono/client'
import type app from './server';

const client = hc<typeof app>('http://localhost:8787');
const ws = client.ws.$ws(0);

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send('ping')
  }, 1000)
})

ws.addEventListener('message', (e: MessageEvent) => {
  console.log('message from server:', e.data)
})

