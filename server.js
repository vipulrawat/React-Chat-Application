const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()
//chatkit init
  const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:9eff55ed-3202-430b-a600-58489044c886',
    key: '5e1969fa-e859-48b8-a06c-004e933c9f31:wEh99r+jszAUlal8CU/NiTJxCFKcv+bPr+PG6wS2UvY='
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
//Create Room

//
app.post('/users',(req,res)=>{
  const {username} = req.body;

  chatkit.createUser({
    name:username,
    id:username
  })
  .then(()=>{
      res.sendStatus(201)
    })
  .catch((err)=>res.sendStatus(200));
})
 
app.post('/auth', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status)
     .send(authData.body);
})
const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
