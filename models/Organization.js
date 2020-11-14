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


var Organization = require("../schemas/OrganizationSchema");
var OrganizationSchema = require("../schemas/OrganizationSchema").schema;

router.get("/", (req, res) => {
	Organization.find({}, (err, orgs) => {
		if (err) handleError;
		res.send(orgs);
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for organization",
	});
});

router.post("/", async (req, res) => {
			await Organization.create({
				name: req.body.name,
				contact_phone: req.body.contact_phone,
				address: req.body.address,
			});
			res.send({
				msg: "Organization created successfully",
			});
});

router.delete("/", async (req, res) => {
	await Organization.deleteOne({ name: req.body.name });
	res.send({
		msg: "Organization deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}

function handleID(res) {
	var length = res.length;
	if (length == 0) {
		return "1";
	} else {
		var last_item = res[length - 1].id;
		last_item = parseInt(last_item, 10);
		last_item += 1;
		last_item = last_item.toString(10);
		return last_item;
	}
}

module.exports = router;
