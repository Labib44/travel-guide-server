const express=require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app=express();
const port= process.env.PORT || 5000;


// meddle wares
app.use(cors());
app.use(express.json());

// mongoDb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r6wv8dh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.get('/', (req, res)=>{
    res.send('Travel Guide in on going....')
})


app.listen(port, ()=>{
    console.log(`Travel Guide server is done ${port}`);
})