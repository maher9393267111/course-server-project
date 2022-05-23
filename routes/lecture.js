const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");


const {createLecture} = require("../controllers/lecture");



router.post('/create',createLecture );


module.exports = router;