const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const redis = require('redis');

const config = {
  host: 'redis-18234.c1.asia-nortosystem1-1.gce.cloud.redislabs.com',
  port: 18234,
  password: 'P5U9yQGw1mfJzDNowyT850v447bjTf1f',
};

app.use(express.static('static'));

app.get('/getCache', (req, res) => {
  console.log('requeset getCache');
  res.send('cache');
});

app.get('/redis', async (req, res) => {
  const client = await redis.createClient(config);
  client.on('error', (err) => {
    console.log('Error ' + err);
  });
  client.get('cache', (err, reply) => {
    if (err) throw err;
    console.log(reply);
  });
  res.send('redis');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
