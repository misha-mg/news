import { run } from '../scripts/agent.mjs';

export const config = {
  maxDuration: 300, // 5 minutes
};

export default async function handler(req, res) {
  // Verify the request is from Vercel Cron
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await run();
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Cron job failed:', err);
    res.status(500).json({ error: err.message });
  }
}
