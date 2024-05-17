require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

// Schemas {

const userSchema = new mongoose.Schema({
   username: String
})

const userModel = new mongoose.model('user', userSchema)

const exerciseSchema = new mongoose.Schema({
   userId: String,
   date: Date,
   duration: Number,
   description: String
})

const exerciseModel = new mongoose.model('exercise', exerciseSchema)

// }

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/users', async (req, res) => {

   const userDocs = await userModel
      .find({})
      .exec()

   res.json(userDocs)
})

app.post(
   '/api/users',
   bodyParser.urlencoded({ extended: false }),
   async function (req, res) {

      const username = req.body.username

      await new userModel({ username }).save()

      const userDoc = await userModel
         .findOne({ username })
         .select(['username', '_id'])
         .exec()

      res.json(userDoc)
   }
)

app.post(
   '/api/users/:_id/exercises',
   bodyParser.urlencoded({ extended: false }),
   async function (req, res) {

      const _id = req.params._id
      const { date, duration, description } = req.body

      console.log('req.body.date', typeof req.body.date)

      const newExercise = await new exerciseModel({
         userId: _id,
         date: date ? date : new Date(),
         duration: duration,
         description: description
      }).save()

      console.log('newExercise.date', newExercise.date)

      const userDoc = await userModel
         .findOne({ _id })
         .select(['_id', 'username'])
         .exec()

      res.json({
         _id: userDoc._id,
         username: userDoc.username,
         date: newExercise.date,
         duration: newExercise.duration,
         description: newExercise.description
      })
   }
)

const listener = app.listen(process.env.PORT || 3000, () => {
   console.log('Your app is listening on port ' + listener.address().port)
})
