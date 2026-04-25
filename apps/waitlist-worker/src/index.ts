import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { basicAuth } from 'hono/basic-auth';

type Bindings = { 
  t7blocks_waitlist: D1Database;
  DASHBOARD_PASSWORD?: string;
  ADMIN_EMAIL?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors({
  origin: ['https://t7blocks.com', 'http://localhost:3000'],
}));

app.post('/waitlist', async (c) => {
  const body = await c.req.json<{ email: string }>();
  if (!body.email) {
    return c.json({ error: 'Email is required' }, 400);
  }
  try {
    await c.env.t7blocks_waitlist
      .prepare('INSERT OR IGNORE INTO waitlist (email, created_at) VALUES (?, ?)')
      .bind(body.email, new Date().toISOString())
      .run();
    return c.json({ success: true });
  } catch {
    return c.json({ error: 'Something went wrong' }, 500);
  }
});

app.get('/dashboard', (c, next) => {
  const email = c.env.ADMIN_EMAIL;
  const password = c.env.DASHBOARD_PASSWORD;
  
  if (!email || !password) {
    return c.json({ error: 'Admin credentials not configured' }, 500);
  }
  
  return basicAuth({ username: email, password })(c, next);
}, async (c) => {
  try {
    const results = await c.env.t7blocks_waitlist.batch([
      c.env.t7blocks_waitlist.prepare('SELECT COUNT(*) as count FROM waitlist'),
      c.env.t7blocks_waitlist.prepare("SELECT COUNT(*) as count FROM waitlist WHERE created_at > datetime('now', '-1 day')"),
      c.env.t7blocks_waitlist.prepare("SELECT COUNT(*) as count FROM waitlist WHERE created_at > datetime('now', '-7 days')"),
      c.env.t7blocks_waitlist.prepare("SELECT COUNT(*) as count FROM waitlist WHERE created_at > datetime('now', '-30 days')"),
      c.env.t7blocks_waitlist.prepare('SELECT email, created_at FROM waitlist ORDER BY created_at DESC LIMIT 50')
    ]);

    const statsResults = results as any[];

    return c.json({
      stats: {
        total: statsResults[0].results[0].count,
        last24h: statsResults[1].results[0].count,
        last7d: statsResults[2].results[0].count,
        last30d: statsResults[3].results[0].count,
      },
      recent: statsResults[4].results,
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

export default app;