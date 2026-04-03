import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = { t7blocks_waitlist: D1Database };

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors({
  origin: ['https://t7blocks.com', 'http://localhost:3000'],
}));

app.post('/waitlist', async (c) => {
  const body = await c.req.json<{ name: string; email: string }>();
  if (!body.name || !body.email) {
    return c.json({ error: 'Name and email required' }, 400);
  }
  try {
    await c.env.t7blocks_waitlist
      .prepare('INSERT OR IGNORE INTO waitlist (name, email, created_at) VALUES (?, ?, ?)')
      .bind(body.name, body.email, new Date().toISOString())
      .run();
    return c.json({ success: true });
  } catch {
    return c.json({ error: 'Something went wrong' }, 500);
  }
});

app.get('/count', async (c) => {
  const row = await c.env.t7blocks_waitlist
    .prepare('SELECT COUNT(*) as count FROM waitlist')
    .first<{ count: number }>();
  return c.json({ count: row?.count ?? 0 });
});

export default app;