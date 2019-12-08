const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("config");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.json({ success: false, msg: "Email not found" }).status(404);

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword)
			return res.json({ success: false, msg: "Incorrect password" }).status(403);

		const token = jwt.sign({ data: user, www: "something else" }, config.get('jwt.secret'), {
			expiresIn: 86400 // 1 day expire
		});

		res.json({
			success: true,
			token: `Bearer ${token}`,
			user: {
				id: user._id,
				email: user.email
			}
		});
	}
	catch (ex) {
		next(ex);
	}
});

router.get("/access", passport.authenticate("jwt", { session: false }), (req, res, next) => {
	res.json({ user: req.user });
});

module.exports = router;
