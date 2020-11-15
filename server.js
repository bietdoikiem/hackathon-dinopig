const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

var users = require('./models/User');
var organizations = require('./models/Organization');
var subjects = require("./models/Subject");
var assignments = require("./models/Assignment");
var quizzes = require("./models/Quiz");
var sampleQuizzes = require("./models/SampleQuiz");
var topics = require("./models/Topic");
var materials = require("./models/Material");
var sampleAssignments = require("./models/SampleAssignment");
const errorHandler = require('./helpers/error-handler');
const app = express();

var mode = 'development';

var setMode = mode == 'production' ? 'mongodb+srv://hungthezorba:chelseaprovip123@mindxhackathon.x1ynp.mongodb.net/mindxhackathon?retryWrites=true&w=majority' :
'mongodb://localhost:27017/mydb'
//Connect to cloud database
mongoose.Promise = global.Promise;

mongoose.connect(
	setMode,
	{ useNewUrlParser: true, useUnifiedTopology: true}
)
.then(res => console.log("Connected to DB"))
.catch(err => console.log(err));



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

app.use(errorHandler);

app.use('/users', users);
app.use("/subjects", subjects)
app.use('/organizations', organizations);
app.use('/assignments', assignments);
app.use('/quizzes', quizzes);
app.use('/samplequizzes', sampleQuizzes);
app.use('/topics', topics);
app.use('/materials', materials);
app.use('/sampleassignments', sampleAssignments)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

