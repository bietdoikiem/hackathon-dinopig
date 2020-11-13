const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

mongoose.connect(
	"mongodb+srv://hungthezorba:chelseaprovip123@mindxhackathon.x1ynp.mongodb.net/mindxhackathon?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

var User = require("../schemas/UserSchema");
var UserSchema = require("../schemas/UserSchema").schema;

router.get("/", async (req, res) => {
	await User.find({}, (err, users) => {
		res.send(users);
	});
});

router.get("/about", (req, res) => {
	res.send({
		msg: "This is API for user",
	});
});

router.post("/", async (req, res) => {
	await User.findOne({ username: req.body.username }, async (err, user) => {
		if (!user) {
			await User.create({
				username: req.body.username,
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phone_number: req.body.phone_number,
				role: req.body.role,
			});
			res.send({
				msg: "User created successfully"
			})
		} else {
			res.send({ msg: "username taken" });
		}
	});
});

router.post('/login', async (req, res) => {
    await User.findOne({username: req.body.username}, (err, user) => {
		if (err) handleError(err);
        if(user) {
            if(req.body.password = user.password) {
                res.json({
                    'msg': `authenticated as ${user.role}`,
                })
            } else {
				res.json({
					'msg': `failted to authenticate`
				})
			}
        }
    })
})

function handleError(err) {
	console.log(err);
}

module.exports = router;