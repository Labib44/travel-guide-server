const express=require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion,  } = require('mongodb');
const ObjectId=require('mongodb').ObjectId

require('dotenv').config();

const app=express();
const port= process.env.PORT || 5000;


// meddle wares
app.use(cors());
app.use(express.json());

// mongoDb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r6wv8dh.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const serviceCollection=client.db('travelGuide').collection('services');
        const reviewCollection=client.db('travelGuide').collection('review');

        app.get('/services', async(req, res)=>{
            const query={}
            const cursor=serviceCollection.find(query);
            const services=await cursor.limit(3).toArray();
            res.send(services);
        })
        app.get('/allservices', async(req, res)=>{
            const query={}
            const cursor=serviceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id', async(req, res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const details=await serviceCollection.findOne(query);
            res.send(details);
        })
        // add service

        app.post('/addServices', async(req, res)=>{
            const addService=req.body;
            const result=await serviceCollection.insertOne(addService);
            res.send(result);
        })
        // Review
        app.post('/review', async(req, res)=>{
            const review=req.body;
            const result=await reviewCollection.insertOne(review);
            res.send(result);
        })

        app.get('/review', async(req, res)=>{
            const query={};
           
            const cursor= reviewCollection.find(query);
            const review=await cursor.toArray();
            res.send(review);
        })
        app.delete('/review/:id', async(req, res)=>{
            const id=req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result=await reviewCollection.deleteOne(query);
            res.send(result);
            console.log(result);
        })
       
    }
    finally{

    }

}
run().catch(error=> console.error(error))


app.get('/', (req, res)=>{
    res.send('Travel Guide in on going....')
})


app.listen(port, ()=>{
    console.log(`Travel Guide server is done ${port}`);
})