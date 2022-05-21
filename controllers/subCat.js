const res = require("express/lib/response");
const subCatModel = require("../models/subcategory");


// // create sub category
exports.createSubCat = async (req, res) => {
  const { name, image,parent_cat_id } = req.body;
  console.log(req.body.image);
  try {
    const subcat = await subCatModel.create({
      name,
      image,
      parent_cat_id,
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