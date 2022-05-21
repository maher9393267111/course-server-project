const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");



const {prac} = require("../controllers/subCat");


router.post("/prac",prac);


module.exports = router;