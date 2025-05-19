const express = require('express');
const fetch = require('node-fetch');
const maplibre = require('@maplibre/maplibre-gl-native');

const app = express();
const PORT = process.env.PORT || 3000;

const styleURL = 'https://demotiles.maplibre.org/style.json';

app.get('/:z/:x/:y.png', async (req, res) => {
  const { z, x, y } = req.params;

  const map = new maplibre.Map({
    request: async (req, callback) => {
      try {
        const url = req.url;
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        callback(null, {
          data: Buffer.from(buffer),
          modified: Date.now(),
          expires: Date.now() + 1000,
          etag: ''
        });
      } catch (e) {
        callback(e);
      }
    },
    ratio: 1.0,
    width: 512,
    height: 512
  });

  map.load({ url: styleURL });

  map.render(
    { zoom: parseInt(z), center: [0, 0] },
    (err, image) => {
      if (err) {
        res.status(500).send('Render error: ' + err.message);
      } else {
        res.set('Content-Type', 'image/png');
        res.send(image.encodeSync('png'));
      }
      map.release();
    }
  );
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
