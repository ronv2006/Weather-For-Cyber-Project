const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const API_KEY = 'd6ada31211c54290a18144734251108';

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
