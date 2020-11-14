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

var Quiz = require("../schemas/QuizSchema");
var SampleQuizSchema = require("../schemas/QuizSchema").schema;

router.get("/", async (req, res) => {
	await Quiz.find({}, async (err, quizzes) => {
		if (err) handleError;
		await quizzes;
		res.send(quizzes);
	});
});

router.get("/:id", async (req, res) => {
	await Quiz.findOne({ _id: req.params.id }, async (err, quiz) => {
		if (err) handleError(err);
		await quiz;
		if (quiz) {
			res.send(quiz);
		} else {
			res.send({
				msg: "Quiz not found",
			});
		}
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for Quiz",
	});
});

router.post("/", async (req, res) => {
		await Quiz.create({
			username: req.body.username,
			sampleId: req.body.sampleId,
			userChoice: req.body.userChoice,
			result: req.body.result
		});
		res.send({
			msg: "Quiz created successfully",
		});
});


// router.put("/add/topic", async (req, res) => {
// 	await Quiz.findOne({ id: req.body.id }, async (err, quiz) => {
// 		if (err) handleError;
// 		await quiz;
// 		var quiz_topicIds = quiz.topicIds;
// 		await quiz_topicIds;
// 		quiz_topicIds.push(req.body.topicId);
// 		if (quiz) {
// 			Quiz.findOneAndUpdate(
// 				{ id: req.body.id },
// 				{
// 					topicIds: quiz_topicIds,
// 				},
// 				(err, result) => {
// 					if (err) handleError(err);
// 					res.send(result);
// 				}
// 			);
// 		}
// 	});
// });

router.delete("/:id", async (req, res) => {
	await Quiz.deleteOne({ _id: req.params.id });
	res.send({
		msg: "Quiz deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}


module.exports = router;
