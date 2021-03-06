const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");



const {prac,up,createSubCat,allSubCats,updateSubCat,removeSubCat} = require("../controllers/subCat");


// creete sub category
router.post("/createSubCat",auth,adminCheck,createSubCat);

// all sub categories

router.get("/allSubCats",allSubCats);



 router.delete("/removeSubCat/:id",auth,adminCheck,removeSubCat);


// update sub category

//router.put("/updateSubCat/:id",adminCheck,updateSubCat);


router.post("/up/:id",auth,adminCheck,updateSubCat);


module.exports = router

