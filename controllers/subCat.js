const res = require("express/lib/response");
const subCatModel = require("../models/subcategory");


// // create sub category
exports.createSubCat = async (req, res) => {
  const { name, image,catid } = req.body;
  console.log(req.body.image);
  try {
    const subcat = await subCatModel.create({
      name,
      image,
      parent_cat_id:catid,
    });
    res.status(200).json({
      message: "sub category created successfully",
      subcat,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errmsg: err,
      message: "error creating sub category",
    });
  }
};



// practice 


 exports.prac = async (req, res) => {

const body =req.body;
const {image} = body;
const name ='maher majerrrrr'


console.log('image------>',image);


// save images in database

const subcat = await subCatModel.create({
    name,
    images:image,
});

const subsaved =await subcat.save();




res.status(200).json({
    message: "sub category created successfully",
    subsaved,

});
};


// all

exports.allSubCats = async (req, res) => {

    const allSubCats = await subCatModel.find();
    res.status(200).json({
        message: "all sub categories",
        allSubCats,
    });
    }


// update


exports.updateSubCat = async (req, res) => {

    const { name, image,catid } = req.body;

    const body = req.body;
    console.log(body);

    try{


    
    const subcat = await subCatModel.findByIdAndUpdate(req.params.id, 
        {

            $set:req.body,
          // name,
          // image,
          },
          { new: true } //----------->importanntttttt
       
    );
    res.status(200).json({
        message: `sub category ${subcat.name}..... updated successfully`,
        subcat,
    });
    }catch(err){
        console.log(err);
        res.status(400).json({
            errmsg: err,
            message: "error updating sub category",
        });


    }
    }






    
exports.up = async (req, res) => {

 

    try{

res.status(200).json({

   message: 'heloooo maher im workkkkkk good'
});


  
    }catch(err){
        console.log(err);
        res.status(400).json({
            errmsg: err,
            message: "error updating sub category",
        });


    }
    }