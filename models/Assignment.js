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

var Assignment = require("../schemas/AssignmentSchema");
var SampleAssignment = require("../schemas/SampleAssignmentSchema");
var Quiz = require("../schemas/QuizSchema");
var SampleQuiz = require("../schemas/SampleQuizSchema");
var AssignmentSchema = require("../schemas/AssignmentSchema").schema;

router.get("/", async (req, res) => {
	await Assignment.find({}, async (err, assignments) => {
		if (err) handleError;
		await assignments;
		res.send(assignments);
	});
});

router.get("/:id", async (req, res) => {
	await Assignment.findOne({ _id: req.params.id }, async (err, assignment) => {
		if (err) handleError(err);
		await assignment;
		if (assignment) {
			res.send(assignment);
		} else {
			res.send({
				msg: "Assignment not found",
			});
		}
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for Assignment",
	});
});

// router.post("/", async (req, res) => {
// 	Assignment.find({}, async (err, assignments) => {
// 		if (err) handleEror(err);
// 		await assignments;
// 		await Assignment.create({
// 			id: handleID(assignments),
// 			sampleId: req.body.sampleId,
// 			username: req.body.username,
// 			quizIds: req.body.quizIds,
// 			result: req.body.result,
// 		});
// 		res.send({
// 			msg: "Assignment created successfully",
// 		});
// 	});
// });

router.post("/submit", async (req, res) => {
    var countTrue = 0; // count
    
    var result_array = await Promise.all(req.body.quizzes.map(async (q) => {
		var answer = "";
		var foundSq = await SampleQuiz.findOne({_id: q.sampleId})
        answer = foundSq.correctAnswer;
        var userAnswer = q.userChoice;
        await userAnswer;
		if (userAnswer.toLowerCase() == answer.toLowerCase()) {
            q["result"] = true;
            countTrue += 1;
			q["finalMark"] = foundSq.mark;
		} else {
            q.result = false;
            q["finalMark"] = 0
        }
        return Promise.resolve(q);
    }));
    var resArray = [];
    var respondArray = []; // respond array to store and send back
	await Promise.all(result_array.map(async (quiz) => {
        await quiz;

		let new_quiz = await Quiz.create({
			username: req.body.username,
			sampleId: quiz.sampleId,
			userChoice: quiz.userChoice,
			result: quiz.result,
			mark: quiz.finalMark,
        });

        new_quiz = await new_quiz.toJSON();
        respondArray.push(new_quiz);
        resArray.push(new_quiz._id);
		// await SampleAssignment.findOne({id: req.body.asmSampleId}, async (err, asm) => {
		//     handleError(err);
		//     sampleMark = asm.mark;
        // })
        Promise.resolve()
    }));
    console.log(resArray);
    const sampleAsm = await SampleAssignment.findOne({ _id: req.body.asmSampleId}, async function(err, res) {
        return res;
    })
	if (resArray == null) {
		resArray = [0];
    }

		await Assignment.create({
			sampleId: req.body.asmSampleId,
			username: req.body.username,
            quizIds: resArray,
            result: Math.round((countTrue/resArray.length) * sampleAsm.mark)
        });
	res.send({
		listOfResult: respondArray,
        msg: "This assignment is marked completely",
        asm_result: `${Math.round((countTrue/resArray.length) * sampleAsm.mark)}`
	});
});

// router.put("/add/quiz", async(req, res) => {
//     await Assignment.findOne({id: req.body.id}, async(err, assignment) => {
//         if(err) handleError;
//         await assignment;
//         var assignment_quizIds = assignment.quizIds;
//         await assignment_quizIds;
//         assignment_quizIds.push(req.body.quizId);
//         if(assignment) {
//             Assignment.findOneAndUpdate({id: req.body.id}, {
//                 quizIds: assignment_quizIds
//             }, (err, result) => {
//                 if(err) handleError(err);
//                 res.send(result);
//             })
//         }
//     })
// })

router.delete("/:id", async (req, res) => {
	await Assignment.deleteOne({ id: req.params.id });
	res.send({
		msg: "Assignment deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}



module.exports = router;
