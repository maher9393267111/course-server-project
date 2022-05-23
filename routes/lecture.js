const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");


const {createLecture,removeLecture,updateLecture} = require("../controllers/lecture");



router.post('/create',createLecture );

router.delete('/remove/:lectureid',removeLecture);

router.put('/update/:lectureid',updateLecture);

module.exports = router;