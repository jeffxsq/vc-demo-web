const express = require('express');
const { issueCredential } = require('./issuer');
const { discloseCredential } = require('./holder');
const { verifyCredential, verifyPresentation } = require('./verifier');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/issue', async (req, res) => {
  try {
    const vc = await issueCredential();
    res.json({ vc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/disclose', async (req, res) => {
  const { vc, options } = req.body;
  try {
    const vp = await discloseCredential(vc, options);
    res.json({ vp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/verify', async (req, res) => {
  const { vc, vp } = req.body;
  try {
    const vcResult = vc ? await verifyCredential(vc) : null;
    const vpResult = vp ? await verifyPresentation(vp) : null;
    res.json({ vcResult, vpResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});