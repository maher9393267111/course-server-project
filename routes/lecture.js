const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");


const {createLecture,removeLecture} = require("../controllers/lecture");



router.post('/create',createLecture );

router.delete('/remove/:lectureid',removeLecture);


module.exports = router;