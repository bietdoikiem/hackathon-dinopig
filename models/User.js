const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');


const userService = require("../helpers/user.service");
const authorize = require("../helpers/authorize");
const role = require('../helpers/role');


router.use(bodyParser.json());

// mongoose.connect(
// 	"mongodb+srv://hungthezorba:chelseaprovip123@mindxhackathon.x1ynp.mongodb.net/mindxhackathon?retryWrites=true&w=majority",
// 	{ useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then(res => console.log("Connected to DB"))
// .catch(err => console.log(err));


const User = require("../schemas/UserSchema");
const Subject = require("../schemas/SubjectSchema");
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
		if(user) {
			res.send(user)
		} else {
			res.send({
				msg: "User not found"
			})
		}
	})
})
router.get("/:username/subjects", async(req, res) => {
	await User.findOne({username: req.params.username}, async(err, user) => {
		if(err) handleError(err);
		if(user !== null || user !== undefined) {
			var listOfSubs = [];
			const fetchSubIds = await user.subjectIds;
			await Promise.all(fetchSubIds.map(async (sid) => {
				await Subject.findOne({_id: sid}, async (err, sub) => {
					let sub_data = await sub.toJSON();
					listOfSubs.push(sub_data);
				})
				return Promise.resolve(sid);
			}));
			console.log(listOfSubs);
			res.json({
				listOfSubs: listOfSubs
			})
		}
	})
})

router.get("/:username/subjects/:idsub/assignments", authorize([role.student]), async(err, user) => {

})

router.put("/add/subject",async(req, res) => {
	await User.findOne({ username: req.body.username }, async (err, user) => {
		if (err) handleError(err);
		try {
			var user_subIds = user.subjectIds;
			await user_subIds;
			user_subIds.push(req.body.subId);
			if (user) {
				User.findOneAndUpdate(
					{ username: req.body.username },
					{
						subjectIds: user_subIds,
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
        if(user) {
			userService.authenticate(user, req.body)
			.then(user => user ? res.json(user) : res.status(400).json({msg: 'Username or password is incorrect'}))
			.catch(err => next(err));
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

function verifyToken(req, res, next) {
	//Get auth header value
	const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next(); 
	} else {
		res.json({'result': 'not allowed'})
	}
}

function authenticate(req, res, next) {
	userService.authenticate(req.body)
	.then(user => user ? res.json(user) : res.status(400).json({msg: 'Username or password is incorrect'}))
	.catch(err => next(err));
}

module.exports = router;
