require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dns = require('dns')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
   original_url: String,
   short_url: Number,
})
const URLModel = mongoose.model('URL', urlSchema)

const sequenceSchema = new mongoose.Schema({ current_highest_short_url: Number })
const sequenceModel = mongoose.model('sequence', sequenceSchema)

app.use(
   cors(),
   function (req, res, next) {
      console.log(`${req.method} ${req.path}`)
      // TODO: Try removing the call below:
      next()
   }
)

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'))

// Your first API endpoint
app.get('/api/hello', (req, res) => res.json({ greeting: 'hello API' }))

app.get('/api/shorturl/:short_url', async function (req, res) {

   let original_url = null

   try
   {
      original_url = await URLModel
         .findOne({ short_url: req.params.short_url })
         .select('original_url')
         .exec()
         .then(URLDoc => URLDoc.original_url)
   }
   catch (err)
   {
      console.log(err)

      return res.status(500).json({ message: 'Internal server error' })
   }

   res.redirect(original_url)
})

app.post(
   '/api/shorturl',
   bodyParser.urlencoded({ extended: false }),
   function (req, res) {

      const original_url = req.body.url

      let testURL = null

      try // If the URL constructor throws an error, the input URL is invalid:
      {
         testURL = new URL(original_url).hostname
      }
      catch
      {
         return res.json({ error: 'invalid url' })
      }

      dns.lookup(testURL, async function (err) {

         if (err)
         {
            return res.json({ error: 'invalid url' })
         }

         let short_url = null

         let URLDoc = null
         let sequenceDoc = null

         try
         {
            URLDoc = await URLModel.findOne({ original_url }).exec()
         }
         catch (err)
         {
            console.log(err)

            return res.status(500).json({ message: 'Internal server error' })
         }

         if (URLDoc)
         {
            return res.json({ original_url, short_url: URLDoc.short_url })
         }

         try
         {
            sequenceDoc = await sequenceModel.findOne().exec()

            if (sequenceDoc)
            {
               short_url = ++sequenceDoc.current_highest_short_url
               await sequenceDoc.save()
            }
            else
            {
               short_url = 1
               await new sequenceModel({ current_highest_short_url: short_url }).save()
            }

            await new URLModel({ original_url, short_url }).save()
         }
         catch (err)
         {
            console.log(err)

            return res.status(500).json({ message: 'Internal server error' })
         }

         return res.json({ original_url, short_url })
      })

   }
)

app.listen(port, () => console.log(`Listening on port ${port}`))
