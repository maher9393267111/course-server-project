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
        course.courselectures.pull(lecture);   //remove lecture from course this workl and lecture._id work
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



    // update


    exports.updateLecture = async(req, res) => {


        const lectureid = req.params.lectureid;
        const body = req.body;
        console.log(body);
        try{

            const lecture = await lectureModel.findById(lectureid);

            const lectureafter = await  lectureModel.findByIdAndUpdate(lectureid, body, { new: true, runValidators: true })

            // console.log(lecture);
            // lecture.name = body.name;
            // lecture.title = body.title;
            // lecture.desc = body.desc;
            // lecture.url = body.url;
            // lecture.image = body.image;
            // lecture.duration = body.duration;
            // lecture.course = body.course;
            await lecture.save();
            res.status(200).json({
                message: 'lecture updated successfully',
                lecturebefore: lecture.name,
                lectureafter:  lectureafter.name
            });

        } catch(err){
            console.log(err);
            res.status(500).json({
                message: err.message,
                error: err
            })};
        }

