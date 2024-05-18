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

   const userDocs = await userModel.find({}).exec()

   res.json(userDocs)
})

app.get('/api/users/:_id/logs', async function (req, res) {

   const userId = req.params._id

   const userDoc = await userModel.findById(userId).exec()

   let { from, to, limit } = req.query

   const exerciseDocs = limit
      ? await exerciseModel.find({ userId }).limit(Number(limit)).exec()
      : await exerciseModel.find({ userId }).exec()

   const log = exerciseDocs
      .map(exerciseDoc => {

         const { description, duration, date } = exerciseDoc

         return { description, duration, date: adjustDate(date) }
      })
      .filter(exercise => {

         if (from && exercise.date < new Date(from)) return false
         if (to && exercise.date > new Date(to)) return false

         return true
      })

   res.json({
      _id: userId,
      username: userDoc.username,
      count: log.length,
      log
   })
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

      // console.log(`${req.method} ${req.path}`)
      // console.log(req.body)

      const newExercise = await new exerciseModel({
         userId: _id,
         date: date ? date : new Date(),
         duration: duration,
         description: description
      }).save()

      const userDoc = await userModel
         .findOne({ _id })
         .select(['_id', 'username'])
         .exec()

      res.json({
         _id: String(userDoc._id),
         username: userDoc.username,
         date: adjustDate(newExercise.date),
         duration: newExercise.duration,
         description: newExercise.description
      })
   }
)

const listener = app.listen(process.env.PORT || 3000, () => {
   console.log('Your app is listening on port ' + listener.address().port)
})

// Utility function to format dates:

function adjustDate(date)
{
   const adjustedDate = new Date(date)

   adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset())

   return adjustedDate.toDateString()
}