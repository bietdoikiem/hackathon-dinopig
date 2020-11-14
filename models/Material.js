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

var Material = require("../schemas/MaterialSchema");
var MaterialSchema = require("../schemas/MaterialSchema").schema;

router.get("/", async (req, res) => {
	await Material.find({}, async (err, materials) => {
		if (err) handleError;
		await materials;
		res.send(materials);
	});
});

router.get("/:id", async (req, res) => {
	await Material.findOne({ _id: req.params.id }, async (err, material) => {
		if (err) handleError(err);
		await material;
		if (material) {
			res.send(material);
		} else {
			res.send({
				msg: "Material not found",
			});
		}
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for Material",
	});
});

router.post("/", async (req, res) => {
		await material.create({
			name: req.body.name,
		});
		res.send({
			msg: "Material created successfully",
		});
});


router.delete("/:id", async (req, res) => {
	await Material.deleteOne({ _id: req.params.id });
	res.send({
		msg: "Material deleted successfully",
	});
});

function handleError(err) {
	console.log(err);
}



module.exports = router;
