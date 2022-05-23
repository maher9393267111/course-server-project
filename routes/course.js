const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");

const {up,createCourse,getAllCourses,removeCourse,updateCourse  } = require("../controllers/course");


router.post('/upcourse',auth,adminCheck,createCourse );

// all courses

router.get('/allcourses',getAllCourses );

// update

router.put('/updatecourse/:courseId',auth,adminCheck,updateCourse );


// remove
router.delete('/removecourse/:courseId',auth,adminCheck,removeCourse );

module.exports = router;