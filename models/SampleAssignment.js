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


var SampleAssignment = require("../schemas/SampleAssignmentSchema");
var Quiz = require("../schemas/QuizSchema");
var SampleQuiz = require("../schemas/SampleQuizSchema");
var SampleAssignmentSchema = require("../schemas/SampleAssignmentSchema").schema;

router.get("/", async (req, res) => {
	await SampleAssignment.find({}, async (err, assignments) => {
        if (err) handleError;
        await assignments;
		res.send(assignments);
	});
});

router.get("/:id", async (req, res) => {
    await SampleAssignment.findOne({_id: req.params.id}, async (err, assignment) => {
        if(err) handleError(err);
        await assignment;
        if(assignment) {
            res.send(assignment);
        } else {
            res.send({
                msg: "Sample Assignment not found"
            })
        }
    })
})

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for Sample Assignment",
	});
});

router.post("/", async (req, res) => {
        var dueDateParse = new Date(req.body.due_date);
			await SampleAssignment.create({
                name: req.body.name,
                mark: req.body.mark,
                time: req.body.time,
                due_date: dueDateParse,
			});
			res.send({
				msg: "Sample Assignment created successfully",
			});
});


router.put("/add/quiz", async(req, res) => {
    await SampleAssignment.findOne({_id: req.body.id}, async(err, assignment) => {
        if(err) handleError;
        await assignment;
        var assignment_sampleQuizIds = assignment.sampleQuizIds;
        await assignment_sampleQuizIds;
        assignment_sampleQuizIds.push(req.body.sampleQuizId);
        if(assignment) {
            SampleAssignment.findOneAndUpdate({_id: req.body.id}, {
                sampleQuizIds: assignment_sampleQuizIds
            }, (err, result) => {
                if(err) handleError(err);
                res.send(result);
            })
        }
    })
})

router.delete("/:id", async (req, res) => {
	await SampleAssignment.deleteOne({ _id: req.params.id });
	res.send({
		msg: "Sample Assignment Assignment deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}



module.exports = router;
