const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')


const app = express()
const port = 5000
const connectUrl = 'mongodb+srv://cryptofarmer714:lLTrnj1QOFU8MuV2@forms.yiq9ifr.mongodb.net/?retryWrites=true&w=majority'
const connectUrl2 = "mongodb+srv://cryptofarmer714:lLTrnj1QOFU8MuV2@forms.yiq9ifr.mongodb.net/test?ssl=true&sslCAFile=/path/to/ca.pem&sslCertFile=/path/to/client.pem&sslKeyFile=/path/to/client-key.pem"

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

app.post('/users', (req,res)=>{
    const newUser = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        occupation: req.body.occupation,
        knowledge: req.body.knowledge,
        phno: req.body.phno,
        amt: req.body.amt
    })

    newUser.save((err, user)=>{
        if(err){
            console.error(err)
            res.status(500).send('Error creating user')
        }else{
            res.status(201).send(user)
        }})
    })


    app.get('/users', async(req,res)=>{
        try{
            const users = await User.find()
            res.json(users)
        }catch(err){
            console.error('Error fetching users', err)
            res.status(500).json({err: 'Internal server error'})
        }
    })
    
