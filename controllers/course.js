const { distinct } = require('../models/course');
const courseModel = require('../models/course');


// course create


exports.createCourse = (req, res, next) => {

    const body = req.body;
    console.log(body.subcategory);
    const course = new courseModel(body);
    course.save()
        .then(result => {
            res.status(201).json({
                message: 'course created successfully',
                course: result
            });
        }) .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};




// all courses

//http://localhost:5000/api/course/allcourses?page=2&limit=2

const page = req.query.page ? req.query.page : 1;
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

   const total = await courseModel.countDocuments({});
   console.log(total);
   // const courses = await courseModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);



   await courseModel.find({}).sort({ _id: -1 }).select('name _id').limit(LIMIT).skip(startIndex).populate('subcategory' , 'name _id' )
    // .populate('courselectures').populate('parent_cat_id').exec()
        .then(result => {
            res.status(200).json({
                message: 'courses fetched successfully',
                courses: result,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT),
                 total:total ,
                 LIMIT:LIMIT
                
            });
        })
        
        
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = err.message;
                console.log(err.message);
                
            }
            next(err);
        });




// remove 

exports.removeCourse = async(req, res, next) => {

    const courseId = req.params.courseId;
    console.log(courseId);

try{

    // fidby id
    const course = await courseModel.findById(courseId);
    console.log(course.name);
    
   const coursedelete = await courseModel.findByIdAndRemove(req.params.courseId);

   


        res.status(200).json({
            message: `course ${coursedelete.name} deleted successfully`,
        });



}
catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
        message = err.message;
        console.log(message);
    }
    next(err);
}

}

   

// update course


exports.updateCourse = (req, res, next) => {

    const courseId = req.params.courseId;
    const body = req.body;
    console.log(body.name, body.duration,body.price);


    courseModel.findByIdAndUpdate(courseId, body, { new: true, runValidators: true })

        .then(result => {
            res.status(200).json({
                message: 'course updated successfully',
                course: result
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                err.message = err.message;
                console.log(err.message);
            }
            next(err);
        });
};










exports.up = (req, res, next) => {

const {url,name} =req.body


res.status(200).json({
    message: 'Handling GET requests to /courses',
    url:url,
    name:name
    });


}