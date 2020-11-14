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

router.get("/:username", async(req, res) => {
	await User.findOne({username: req.params.username}, async (err, user) => {
		if(err) handleError(err);
		await user;
		if(user) {
			res.send(user)
		} else {
			res.send({
				msg: "User not found"
			})
		}
	})
})

router.put("/add/subject", async(req, res) => {
	await User.findOne({ _id: req.body.id }, async (err, user) => {
		if (err) handleError(err);
		try {
			var user_subIds = user.subjectIds;
			await user_subjectIds;
			user_subIds.push(req.body.subId);
			if (user) {
				User.findOneAndUpdate(
					{ username: req.body.username },
					{
						subjectIds: subject_subIds,
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
})

router.post('/auth/login', async (req, res) => {
    await User.findOne({username: req.body.username}, async (err, user) => {
		if (err) handleError(err);
		await user;
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
        } else {
			res.json({
				'msg': 'wrong username or password'
			})
		}
    })
})

router.delete('/:username', async (req, res) => {
	await User.deleteOne({username: req.params.username}, async (err, result) => {
		await result;
		res.send(result);
	})
})

function handleError(err) {
	console.log(err);
}

module.exports = router;
