const { Router } = require('express');
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require('../middleware/imageUpload');
const fs = require("fs");
const { promisify } = require("util");
const mongoose = require("mongoose");

const fileUnlink = promisify(fs.unlink);


imageRouter.post("", upload.single("image"), async (req, res) => {
    // 유저 정보 확인
    try{
        if(!req.user) throw new Error("권한이 없습니다.");
        const image = await new Image({
            user:{
                _id: req.user.id,
                name: req.user.name,
                username: req.user.username,
            },
            public: req.body.public,
            key:req.file.filename,
            originalFileName: req.file.originalFileName,
        }).save();
        res.json(image);
    } catch(err){
        console.log(err);
        res.status(400).json({successOrNot:"N", errorMessage: err.message});
    }
});

imageRouter.get("/", async(req, res) => {
    //public image 제공 
    const Images = await Image.find({ public: true });
    res.json(Images);
});

imageRouter.delete("/:imageId", async (req, res) => {
    //유저 권한 확인
    //사진 삭제
    //1. uploads  폴더에 있는 사진 데이터 삭제
    //2. 데이터베이스에 있는 image 문서 삭제
    try{
        if(!req.user) throw new Error("권한이 없습니다.");
        if(!mongoose.isValidObjectId(req.params.imageId)) throw new Error("올바르지 않은 이미지 id입니다.");

        const image = await Image.findOneAndDelete({ _id: req.params.imageId});
        if (!image) throw new Error("이미 삭제된 이미지입니다.");
        await fileUnlink(`./uploads/${image.key}`);
        res.json({ successOrNot: "Y", data: image});
    } catch(err){
        console.log(err);
        res.status(400).json({successOrNot:"N", errorMessage: err.message});
    }
});

imageRouter.patch("/:imageId/like", async (req, res) => {
    try{
        if(!req.user) throw new Error("권한이 없습니다.");
        if(!mongoose.isValidObjectId(req.params.imageId)) throw new Error("올바르지 않은 id입니다.");
        const image = await Image.findOneAndUpdate(
            { _id: req.params.imageId },
            { $addToSet: { likes: req.user.id }},
            { new: true}
        );
        res.json({ successOrNot: "Y", data: image});
    } catch(err){
        console.log(err);
        res.status(400).json({ successOrNot: "N", errorMessage: err.message});
    }
});

imageRouter.patch("/:imageId/unlike", async (req, res) => {
    try{
        if(!req.user) throw new Error("권한이 없습니다.");
        if(!mongoose.isValidObjectId(req.params.imageId)) throw new Error("올바르지 않은 id입니다.");
        const image = await Image.findOneAndUpdate(
            { _id: req.params.imageId },
            { $pull: { likes: req.user.id }},
            { new: true}
        );
        res.json({ successOrNot: "Y", data: image});
    } catch(err){
        console.log(err);
        res.status(400).json({ successOrNot: "N", errorMessage: err.message});
    }
});


module.exports = { imageRouter };