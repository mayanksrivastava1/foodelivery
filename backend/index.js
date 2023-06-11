const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
mongoDB
const path = require('path')
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

// static files
app.use(express.static(path.join(__dirname,'../build')))

app.emit('*', function(req,res){
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.get('/', (req, res) => {
  res.send('Hello World!') 
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

