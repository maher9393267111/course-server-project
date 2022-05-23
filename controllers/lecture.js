const lectureModel = require('../models/lecture');
const courseModel = require('../models/course');

// create

exports.createLecture = async(req, res) => {
            
     const body = req.body;
        console.log(body);
        courseid = body.course;
        const lecture = new lectureModel(body);
try{

    const course = await courseModel.findById(courseid);
    //save lecture in dataabse then add to course
    await lecture.save();
    course.courselectures.push(lecture);
    console.log(course.courselectures);

    await course.save();
    res.status(201).json({
        message: 'lecture created successfully',
        lecture: lecture
    });


} catch(err){
res.status(500).json({
    message: err.message,
    error: err


})};


}
    