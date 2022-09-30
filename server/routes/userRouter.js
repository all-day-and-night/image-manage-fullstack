const { Router } = require('express');
const userRouter = Router();
const User = require('../models/User');
const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

userRouter.post("/register", async (req, res) => {

    try{
        if(req.body.password.length < 6) throw new Error("비밀번호를 6자 이상으로 입력해주세요.");
        if(req.body.username.length < 3) throw new Error("username을 3자 이상으로 입력해주세요.");
        const hashedPassword = await hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = await new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            sessions:[{createdAt: new Date()}]
        }).save();
        const session = user.sessions[0];
        res.json({ 
            successOrNot: "Y", 
            sessionId: session._id,
            name: user.name
        });
    } catch(err){
        res.status(400).json({successOrNot: "N", errorMessage: err.message});
    }
});

userRouter.patch("/login", async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        const isValid = await compare(req.body.password, String(user.password));
        if(!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
        user.sessions.push({createdAt: new Date() });
        const session = user.sessions[user.sessions.length-1];
        await user.save();
        res.json({
            successOrNot: "Y",
            sessionId: session._id,
            name: user.name
        });
    } catch(err){
        res.status(400).json({successOrNot:"N", errorMessage: err.message});
    }
});

userRouter.patch("/logout", async(req, res) => {
    try{
        if(!req.user) throw new Error("invalid session");
        
        const data = await User.updateOne(
            {_id: req.user.id},
            { $pull: { sessions: {_id: req.headers.sessionid}}}
        );
        res.json({successOrNot:"Y"});
    } catch(err){
        res.status(400).json({successOrNot:"N", errorMessage: err.message});
    }
});

userRouter.get("/me", (req, res) => {
    try{
        if(!req.user) throw new Error("권한이 없습니다.");
        res.json({
            successOrNot: "Y",
            sessionId: req.headers.sessionid,
            name: req.user.name,
            userId: req.user._id
        });
    } catch(err){
        console.log(err);
        res.status(400).json({successOrNot:"N", errorMessage: err.message});
    }
})

module.exports = { userRouter };