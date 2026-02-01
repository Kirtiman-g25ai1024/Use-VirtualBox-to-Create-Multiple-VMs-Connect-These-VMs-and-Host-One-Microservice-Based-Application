const express = require('express');
const axios = require('axios');
const app = express();

// Update this if you change VM2's host-only IP
const BACKEND_URL = 'http://192.168.56.102:3000/api/data';

app.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get(BACKEND_URL, { timeout: 3000 });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "Backend not reachable",
      hint: "Ensure VM2 backend is running, VM-to-VM ping works, and VM2 allows TCP/3000."
    });
  }
});

const HOST = '0.0.0.0';
const PORT = 4000;

app.listen(PORT, HOST, () => {
  console.log(`Gateway running on http://${HOST}:${PORT} (calls ${BACKEND_URL})`);
});
