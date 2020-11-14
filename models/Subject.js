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

var Subject = require("../schemas/SubjectSchema");
var SubjectSchema = require("../schemas/SubjectSchema").schema;

router.get("/", async (req, res) => {
	await Subject.find({}, async (err, subjects) => {
		if (err) handleError;
		await subjects;
		res.send(subjects);
	});
});

router.get("/:id", async (req, res) => {
	await Subject.findOne({ id: req.params.id }, async (err, subject) => {
		if (err) handleError(err);
		await subject;
		if (subject) {
			res.send(subject);
		} else {
			res.send({
				msg: "Subject not found",
			});
		}
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for subject",
	});
});

router.post("/", async (req, res) => {
		Subject.findOne({ _id: req.body._id }, async (err, subject) => {
			if (subject) handleEror(err);
			await Subject.create({
				name: req.body.name,
			});
			res.send({
				msg: "Subject created successfully",
			});
		});
});

router.put("/add/assignment", async (req, res) => {
		await Subject.findOne({ _id: req.body.id }, async (err, subject) => {
			if (err) handleError(err);
			await subject;
			try {
				await subject;
				var subject_asmIds = subject.assignmentIds;
				await subject_asmIds;
				subject_asmIds.push(req.body.asmId);
				if (subject) {
					Subject.findOneAndUpdate(
						{ _id: req.body.id },
						{
							assignmentIds: subject_asmIds,
						}, (err, result) => {
                            if(err) handleError(err);
                            res.send(result);
                        }
                    );
				}
			} catch (err) {
				console.log(err);
			}
		});
});

router.delete("/:id", async (req, res) => {
	await Subject.deleteOne({ _id: req.params.id });
	res.send({
		msg: "Subject deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}



module.exports = router;
