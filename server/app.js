const express = require('express')
const Note = require()
const app = express()
const port = 9999
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);

app.get('/all', (req, res) => { res.send('Hello World!') })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
