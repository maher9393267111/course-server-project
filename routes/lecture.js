const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");


const {createLecture,removeLecture,updateLecture,getAllLectures} = require("../controllers/lecture");



router.post('/create',createLecture );

router.delete('/remove/:lectureid',removeLecture);

router.put('/update/:lectureid',updateLecture);

router.get('/getall',getAllLectures);

module.exports = router;

