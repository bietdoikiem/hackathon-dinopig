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

var Topic = require("../schemas/TopicSchema");
var TopicSchema = require("../schemas/TopicSchema").schema;

router.get("/", async (req, res) => {
	await Topic.find({}, async (err, topics) => {
		if (err) handleError;
		await topics;
		res.send(topics);
	});
});

router.get("/:id", async (req, res) => {
	await Topic.findOne({ _id: req.params.id }, async (err, topic) => {
		if (err) handleError(err);
		await topic;
		if (topic) {
			res.send(topic);
		} else {
			res.send({
				msg: "Topic not found",
			});
		}
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for Topic",
	});
});

router.post("/", async (req, res) => {
		await topic.create({
			name: req.body.name,
		});
		res.send({
			msg: "Topic created successfully",
		});
});

router.put("/add/material", async (req, res) => {
	await Topic.findOne({ _id: req.body.id }, async (err, topic) => {
		if (err) handleError;
		await topic;
		var topic_materialIds = topic.materialIds;
		await topic_materialIds;
		topic_materialIds.push(req.body.materialId);
		if (Topic) {
			Topic.findOneAndUpdate(
				{ _id: req.body.id },
				{
					quizIds: Topic_quizIds,
				},
				(err, result) => {
					res.send(result);
				}
			);
		}
	});
});

router.delete("/:id", async (req, res) => {
	await Topic.deleteOne({ _id: req.params.id });
	res.send({
		msg: "Topic deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}


module.exports = router;
