const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const axios = require("axios").default;


const local_token = "345678543"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  console.log(req.query);
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];
  console.log(token,local_token);
  if(local_token==token){
      res.send(challenge)
  }else{
      res.send("failed")
  }
  
})

app.post('/', (req, res) => {
    //console.log(JSON.stringify(req.body));
   const body  = req.body;

   body.entry.forEach(entry => {
       if(entry["messaging"]){
           entry.messaging.forEach(messaging =>{
               //console.log(messaging)
               respond(messaging.sender , messaging.message.text)
           });
       }
   });
   
    res.send("ok")
  
  })

  function respond(sender,text){
    console.log(sender,text)
    const access_token = "EAAFRPpWn8ZC8BAIDJRB1YT6u4ukJdZAdM5EDka9L5b6LkDd0klpO7xJ8WFF322Ea52GlT6qSWmHsWWHmh9E6r5AGQDJtbAezav2iJsmVOXp5mbufcqh15ggs4ZCIEZCNdSz0zbTviLBz9pOviYSFRQekZCOCxxKnrHLJKRSag8gZDZD"
    const url = 'https://graph.facebook.com/v9.0/me/messages?access_token=EAAFRPpWn8ZC8BAIDJRB1YT6u4ukJdZAdM5EDka9L5b6LkDd0klpO7xJ8WFF322Ea52GlT6qSWmHsWWHmh9E6r5AGQDJtbAezav2iJsmVOXp5mbufcqh15ggs4ZCIEZCNdSz0zbTviLBz9pOviYSFRQekZCOCxxKnrHLJKRSag8gZDZD';

     var message = {
        "recipient": sender,
        "message": {
          "text": text + " from Manan"
        }
    }
    axios.post(url,message).then((response) =>{
    console.log("Responded");
  });

}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})