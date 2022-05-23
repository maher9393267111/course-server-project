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
        message: `lecture ${lecture.name} created successfully`,
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
            // if courde id is not same then remove from old course and add to new course
            if(lecture.course != body.course){
                const oldcourse = await courseModel.findById(lecture.course);
                oldcourse.courselectures.pull(lecture);
                await oldcourse.save();
                const newcourse = await courseModel.findById(body.course);
                newcourse.courselectures.push(lecture);
                await newcourse.save();
            }

            const lectureafter = await  lectureModel.findByIdAndUpdate(lectureid, body, { new: true, runValidators: true })

          
            await lecture.save();
            res.status(200).json({
                message: 'lecture updated successfully',
                lecturebefore: lecture.course,
                lectureafter:  lectureafter.course
            });

        } catch(err){
            console.log(err);
            res.status(500).json({
                message: err.message,
                error: err
            })};
        }



        // all lectures

        exports.getAllLectures = async(req, res) => {
                
                try{


                    const page = req.query.page  ===  0  ? req.query.page === 1 : req.query.page        //=== 0 ? 1   :   req.query.page  : 1 //req.query.page : 1;


                    console.log('queryyyyy-------->',page);
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    console.log('start lectures from ----------->',startIndex );  // if page === 0  start from page= 0 -1 = 0 skip o start from 0 to 4

   const total = await lectureModel.countDocuments({});
   //console.log(total);
    
                    const lectures = await lectureModel.find({}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex).populate('course', 'name _id');
                    res.status(200).json({
                        message: 'all lectures',
                        lectures: lectures,
                        currentPage: Number(page), 
                        numberOfPages: Math.ceil(total / LIMIT),
                         total:total ,
                         LIMIT:LIMIT
                    });
    
                } catch(err){
                    console.log(err);
                    res.status(500).json({
                        message: err.message,
                        error: err
                    })};
                }