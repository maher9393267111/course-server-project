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
    



// remove

exports.removeLecture = async(req, res) => {

    const lectureid = req.params.lectureid;
    console.log(lectureid);
    try{

        const lecture = await lectureModel.findById(lectureid);
        console.log('============>',lecture.course);
        const course = await courseModel.findById(lecture.course);
        console.log('============>',course.courselectures);
        course.courselectures.pull(lecture);
        await course.save();
        await lecture.remove();
        res.status(200).json({
            message: 'lecture removed successfully',
            lecture: lecture
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            error: err


        })};

    }