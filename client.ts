import { hc } from 'hono/client'
import type app from './server';

const client = hc<typeof app>('http://localhost:8787');
const ws = client.ws.$ws(0);

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send(new Date().toString())
  }, 1000)
})

ws.addEventListener('Hello from server', () => {
  console.log('pinged from server')
})
