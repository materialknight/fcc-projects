require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
   original_url: String,
   short_url: Number,
})

const URLModel = mongoose.model('URL', urlSchema)

const sequenceSchema = new mongoose.Schema({
   current_highest_short_url: { type: Number, default: 1 }
})

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
   } catch (err)
   {
      console.log(err)
   }

   console.log(original_url)
   res.redirect(original_url)
})

app.post(
   '/api/shorturl',
   bodyParser.urlencoded({ extended: false }),
   async function (req, res) {

      const original_url = req.body.url
      let short_url = null

      let doc = null

      try
      {
         doc = await URLModel.findOne({ original_url }).exec()
      } catch (err)
      {
         console.log(err)
      }

      if (doc)
      {
         short_url = doc.short_url
         res.json({ original_url, short_url })
      } else
      {
         try
         {
            short_url = await sequenceModel.findOne().exec()
            ++short_url

            await new URLModel({ original_url, short_url }).URLDoc.save()
         } catch (err)
         {
            console.log(err)
         }

         res.json({ original_url, short_url })
      }
   }
)

app.listen(port, () => console.log(`Listening on port ${port}`))
