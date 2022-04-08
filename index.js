const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const { createClient } = require('redis');

const url =
  'redis://default:P5U9yQGw1mfJzDNowyT850v447bjTf1f@redis-18234.c1.asia-nortosystem1-1.gce.cloud.redislabs.com:18234';

app.use(express.static('static'));

app.get('/getcache', (req, res) => {
  res.send('cache');
});

app.get('/getCache', async (req, res) => {
  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect({
    url,
  });
  const cache = await client.get('cache');
  res.send('cache');
});

app.get('/setCache', async (req, res) => {
  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect({
    url,
  });
  await client.set('cache', 'newcache');
  res.send('done');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
