const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

var users = require('./models/User');
var organizations = require('./models/Organization');

const app = express();

mongoose.connect(`mongodb+srv://hungthezorba:chelseaprovip123@mindxhackathon.x1ynp.mongodb.net/mindxhackathon?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to DinoPig's API"
    })
})

app.use('/users', users);
app.use('/organizations', organizations);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

