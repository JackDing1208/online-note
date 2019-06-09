const express = require('express')
const Note = require('./note.js').Note
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

app.get('/all', (req, res) => {
  Note.findAll({raw: true}).then((list) => {
    res.send({status:0,data:list})
  })
})


app.post('/add', (req, res) => {
  console.log(req.body);
  let {text,time}=req.query
  Note.create({text: text, time: time}).then((note) => {
    res.send({status:0,data:note.id})
  })
})


app.post('/delete',(req,res)=>{

  let id=req.query.id
  Note.destroy({
    where: {
      id:id
    }
  }).then(() => {
    res.send({status:0,id:id})
  });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
