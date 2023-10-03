const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
const port = 5000
app.use(cookieParser())
app.use(cors())
app.use(express.json());
const connectUrl = 'mongodb+srv://cryptofarmer714:lLTrnj1QOFU8MuV2@forms.yiq9ifr.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connectUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('connect to mongodb')
})
.catch(err=>{
    console.error(err, 'not connected')
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongodb connection error:'))
db.once('open', ()=>{
    console.log('connected to mongodb')
})

app.listen(port, ()=>{
    console.log('server is running on port 5000')
})



app.post('/users', async (req, res) => {
    try {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        occupation: req.body.occupation,
        knowledge: req.body.knowledge,
        phno: req.body.phno,
        amt: req.body.amt,
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
  });
  
  
  
  

    app.get('/users', async(req,res)=>{
        try{
            const users = await User.find()
            res.json(users)
        }catch(err){
            console.error('Error fetching users', err)
            res.status(500).json({err: 'Internal server error'})
        }
    })
    
