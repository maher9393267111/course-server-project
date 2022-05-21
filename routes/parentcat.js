const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");

// remove image from cloudinary

const { remove } = require("../controllers/cloudinary");

const { allParentCats, createParentCat,updateParentCat,removeparentcat } = require("../controllers/parentcat");


// create parent category

router.post("/createParentCat",auth,adminCheck,createParentCat);


// all parent categories
router.get("/allParentCats",allParentCats);

router.put("/updateParentCat/:id",auth,adminCheck,updateParentCat);

router.post("/removeImage",auth,remove);

router.delete("/removeparentcat/:id",auth,adminCheck,removeparentcat);


module.exports = router;