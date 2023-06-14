console.log('salud mi familia')

const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()



MongoClient.connect('mongodb+srv://dom:fast@atlascluster.lsrd6d6.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client =>{
    console.log('Connected to Database')
    const db = client.db('ff-quotes')
    const quotesCollection = db.collection('quotes')

    //These are the Middlewares

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    //CRUD handlers go here aka ROUTES 

    app.listen(PORT,() =>{
        console.log(`The server is now running on port ${PORT}`)
    
    })
    
    app.get('/', (request, response) =>{
        db.collection('quotes').find().toArray().then(quotes =>{
            response.render('index.ejs',{quotes: quotes})
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes',(request,response)=>{
        quotesCollection.insertOne(request.body).then(result =>{
            response.redirect('/')
        })
        .catch(error => console.log(error))
    })

    app.put('/quotes', (request, response) => {
        quotesCollection.findOneAndUpdate(
            {name: 'Dominic Toretto'},
            {
                $set:{
                    name:request.body.name,
                    quote:request.body.quote
                },
            },
            {
                upsert: true
            }
        )
        .then(result => {
            response.json('Success')
        })
        .catch(error => console.error(error))
      })

      app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('Brian is not here yet')
            }
            res.json('Brian has left the race')
          })
          .catch(error => console.error(error))
      })

  })
  .catch(error => console.error(error))


   