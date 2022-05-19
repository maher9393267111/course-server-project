

const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


exports.auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    //const isCustomAuth = token.length < 500;

    let decodedData;

    if (token ) {      
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData?._id;
   //   console.log('userid', req.userId);
     // console.log('decodedData in middleware', decodedData);
    } 
   
//  find user by id and set req.user


    const user = await userModel.findById(req.userId);
    req.user = user;

    if (!user && !req.userId) {
      return res.status(401).json({
        msg: "Auth failed beacuse  no auth  and access denied",
      });
    }

else if (!user) {

res.status(401).json({
    msg: "Auth failed beacuse  use not found in database",

}
);
}


    else
  
    
    {

console.log('user founded in Database and you can do next step');
next();
    }

  
  } catch (error) {
    console.log(error);
  }
};




exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
  
    const adminUser = await userModel.findOne({ email }).exec();
  
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    } else {
      next();
    }
  };