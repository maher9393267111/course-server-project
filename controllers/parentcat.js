const parentCatModel = require("../models/parentcategory");
const {cloudinary2} = require("../controllers/cloudinary");

// cereate parent category

exports.createParentCat = async (req, res) => {
  const { name, image } = req.body;
  console.log(req.body);

  const newParentCat = new parentCatModel({
    name,
    image,
  });

  const parentcat = await newParentCat.save();
  res.status(200).json({
    msg: "parent category created successfully",
    parentcat,
  });

  // handle error

  if (!parentcat) {
    res.status(400).json({
      mesage: "error creating parent category",
    });
  }
};

// all parent categories

exports.allParentCats = async (req, res) => {
  const parentcats = await parentCatModel.find();
  res.status(200).json({
    message: "all parent categories",
    parentcats,
  });
};



// update parent category

 exports.updateParentCat = async (req, res) => {
    const { name, image } = req.body;
    console.log(req.body);

    try{

    
    console.log(req.body);
    const parentcat = await parentCatModel.findByIdAndUpdate(
        req.params.id,
        {

          $set:req.body,
        // name,
        // image,
        },
        { new: true }
    );
    res.status(200).json({
        message: "parent category updated successfully",
        parentcat,
    });
}
catch(err){
    console.log(err);
    res.status(400).json({
        errmsg:err,
        message: "error updating parent category",
    });
}

    }


    // ,removeparentcat

    exports.removeparentcat = async (req, res) => {
        const parentcat = await parentCatModel.findByIdAndDelete(req.params.id);
console.log(parentcat);

      try{

        res.status(200).json({
          message: "parent category deleted successfully",
          parentcat,
      })
      }
       
      catch(err){
        console.log(err);
        res.status(400).json({
          errmsg:err,
          message: "error deleting parent category",
      })
      }
      
        

        

      

    }