const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// mongoose.connect(
// 	"mongodb+srv://hungthezorba:chelseaprovip123@mindxhackathon.x1ynp.mongodb.net/mindxhackathon?retryWrites=true&w=majority",
// 	{ useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then(res => console.log("Connected to DB"))
// .catch(err => console.log(err));

var SampleQuiz = require("../schemas/SampleQuizSchema");
var SampleQuizSchema = require("../schemas/SampleQuizSchema").schema;

router.get("/", async (req, res) => {
	await SampleQuiz.find({}, async (err, quizzes) => {
		if (err) handleError;
		await quizzes;
		res.send(quizzes);
	});
});

router.get("/:id", async (req, res) => {
	SampleQuiz.findOne({_id: req.params.id}, function(err, result) {
		if (err) {
			handleError(err)
		} else {
			res.send(result)
		}
	})
	
});


// router.get("/about", (req, res) => {
// 	res.send({
// 		msg: "This is API for Sample Quiz",
// 	});
// });

router.post("/", async (req, res) => {
		await SampleQuiz.create({
			question: req.body.question,
			choices: req.body.choices,
			correctAnswer: req.body.correctAnswer,
			difficulty: req.body.difficulty,
			mark: req.body.mark,
		});
		res.send({
			msg: "Quiz created successfully",
		});
});


router.put("/add/topic", async (req, res) => {
	await SampleQuiz.findOne({ _id: req.body.id }, async (err, quiz) => {
		if (err) handleError;
		await quiz;
		var quiz_topicIds = quiz.topicIds;
		await quiz_topicIds;
		quiz_topicIds.push(req.body.topicId);
		if (quiz) {
			SampleQuiz.findOneAndUpdate(
				{ id: req.body.id },
				{
					topicIds: quiz_topicIds,
				},
				(err, result) => {
					if (err) handleError(err);
					res.send(result);
				}
			);
		}
	});
});

router.delete("/:id", async (req, res) => {
	await SampleQuiz.deleteOne({ _id: req.params.id });
	res.send({
		msg: "Quiz deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}



module.exports = router;
