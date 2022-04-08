const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const Redis = require('ioredis');

const config = {
  host: 'redis-18234.c1.asia-nortosystem1-1.gce.cloud.redislabs.com',
  port: 18234,
  username: 'default',
  password: 'P5U9yQGw1mfJzDNowyT850v447bjTf1f',
};

app.use(express.static('static'));

app.get('/getCache', (req, res) => {
  console.log('requeset getCache');
  const a = { data: 'cache' };
  res.send(a);
});

app.get('/getCache2', async (req, res) => {
  console.log('requeset getCache2');
  const client = new Redis(config);
  console.log('Redis init');
  const cache = await client.get('cache');
  console.log('Redis get', cache);
  client.quit();
  res.send('cache');
});

app.get('/setCache', async (req, res) => {
  const client = new Redis(config);
  await client.set('cache', 'newcache');
  client.quit();
  res.send('done');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
