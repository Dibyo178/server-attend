const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i7d38.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();


app.use(bodyParser.json());
app.use(cors());

const port= 5000;

app.get("/", (req, res) => {
    res.send("<h1>Attendance server</h1>");
});


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("Attendence").collection("student");
  console.log('sb connect')

 app.post('/addRegister',(req,res)=>{
   const appointment =req.body;
   console.log(appointment);
   appointmentCollection.insertOne(appointment)
   .then(result=>{
       res.send(result.insertedCount>0)
   })
 })

 app.get('/allVolunteer', (req, res) => {
  appointmentCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
})

app.delete('/mark/:id', (req, res) => {
  console.log(req.params.id)
  appointmentCollection.deleteOne({ _id: ObjectId(req.params.id) })
    .then(result => {
      res.send(result.deletedCount > 0)
    })
})

});






app.listen(process.env.PORT || port);