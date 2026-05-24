const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Config ────────────────────────────────────────────────────────────────────
const METRICOOL_TOKEN = process.env.METRICOOL_TOKEN || '';

const BLOG_ID         = process.env.BLOG_ID         || '4634674';
const METRICOOL_BASE  = 'https://app.metricool.com/api/v2';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── Proxy: Metricool analytics ────────────────────────────────────────────────
app.get('/api/analytics', async (req, res) => {
  const { network, metric, start, end } = req.query;
  if (!network || !metric || !start || !end) {
    return res.status(400).json({ error: 'Faltan parámetros: network, metric, start, end' });
  }
  if (!METRICOOL_TOKEN) {
    return res.status(500).json({ error: 'METRICOOL_TOKEN no configurado en variables de entorno' });
  }
  try {
    const url = `${METRICOOL_BASE}/analytics?blogId=${BLOG_ID}&network=${network}&metric=${encodeURIComponent(metric)}&start=${start}&end=${end}&timezone=America%2FArgentina%2FBuenos_Aires`;
    const resp = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${METRICOOL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!resp.ok) {
      const errText = await resp.text();
      return res.status(resp.status).json({ error: `Metricool error ${resp.status}`, detail: errText });
    }
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Proxy: Metricool brands ───────────────────────────────────────────────────
app.get('/api/brands', async (req, res) => {
  if (!METRICOOL_TOKEN) return res.status(500).json({ error: 'METRICOOL_TOKEN no configurado' });
  try {
    const resp = await fetch(`${METRICOOL_BASE}/brands`, {
      headers: { 'Authorization': `Bearer ${METRICOOL_TOKEN}` }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Proxy: Metricool competitors ──────────────────────────────────────────────
app.get('/api/competitors', async (req, res) => {
  const { network, start, end } = req.query;
  if (!METRICOOL_TOKEN) return res.status(500).json({ error: 'METRICOOL_TOKEN no configurado' });
  try {
    const url = `${METRICOOL_BASE}/competitors?blogId=${BLOG_ID}&network=${network}&initDate=${start}&endDate=${end}&timezone=America%2FArgentina%2FBuenos_Aires`;
    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${METRICOOL_TOKEN}` }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Proxy: Meta Ads campaigns ─────────────────────────────────────────────────
app.get('/api/meta-ads', async (req, res) => {
  const { start, end } = req.query;
  if (!METRICOOL_TOKEN) return res.status(500).json({ error: 'METRICOOL_TOKEN no configurado' });
  try {
    const url = `${METRICOOL_BASE}/facebookads?blogId=${BLOG_ID}&initDate=${start}&endDate=${end}`;
    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${METRICOOL_TOKEN}` }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Proxy: Google Ads campaigns ───────────────────────────────────────────────
app.get('/api/google-ads', async (req, res) => {
  const { start, end } = req.query;
  if (!METRICOOL_TOKEN) return res.status(500).json({ error: 'METRICOOL_TOKEN no configurado' });
  try {
    const url = `${METRICOOL_BASE}/googleads?blogId=${BLOG_ID}&initDate=${start}&endDate=${end}`;
    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${METRICOOL_TOKEN}` }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Fallback → index.html ─────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Bagues Dashboard corriendo en puerto ${PORT}`);
  console.log(`   Metricool token: ${METRICOOL_TOKEN ? '✓ configurado' : '✗ falta configurar'}`);
  console.log(`   Anthropic key:   ${ANTHROPIC_KEY   ? '✓ configurado' : '✗ falta configurar'}`);
});
