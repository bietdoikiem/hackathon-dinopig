const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/mydb`, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to DinoPig's API"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});