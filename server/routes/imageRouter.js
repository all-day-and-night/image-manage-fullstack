const { Router } = require('express');
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require('../middleware/imageUpload');


imageRouter.post("", upload.single("image"), async (req, res) => {
const image = await new Image({
        key:req.file.filename,
        originalFileName: req.file.originalFileName,
    }).save();
    res.json(image);
})
imageRouter.get("", async(req, res) => {
    const Images = await Image.find();
    res.json(Images);
})

module.exports = { imageRouter };