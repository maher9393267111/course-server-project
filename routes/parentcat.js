const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");

const { allParentCats, createParentCat } = require("../controllers/parentcat");


// create parent category

router.post("/createParentCat",auth,adminCheck,createParentCat);


// all parent categories
router.get("/allParentCats",allParentCats);


module.exports = router;