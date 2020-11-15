const config = require("../config.json");
const jwt = require("jsonwebtoken");
const role = require("./role");

module.exports = {
	authenticate,
};

async function authenticate(user, {password}) {
	if (user && user.password == password) {
		const token = jwt.sign(
			{
				sub: user._id,
				role: user.role,
			},
			config.secret
		);
		return {
			token: `${token}`
		}
	}
}
