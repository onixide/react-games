const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
    try {
        //get all users
        let users = await User.find();
        res.json(users).status(200);
    } catch (ex) {
        next(ex);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        //get user by id
        let user = await User.findById(req.params.id);
        res.json(user)
    } catch (ex) {
        next(ex);
    }

});

router.post("/", async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        //user exist
        if (user) return res.status(409).json({ success: false, message: `Użytkownik - ${user.email} - już istnieje` });
        // user dont exist
        user = new User({ email, password } = req.body);
        // password hash
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        //save to db and res
        user = await user.save();
        res.json(user.email).status(201);
    } catch (ex) {
        next(ex);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        //update user
        let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser);
    } catch (ex) {
        next(ex);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        let deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
