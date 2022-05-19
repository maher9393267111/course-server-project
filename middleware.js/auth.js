

const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //const isCustomAuth = token.length < 500;

    let decodedData;

    if (token ) {      
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData?._id;
      console.log('userid', req.userId);
      console.log('decodedData in middleware', decodedData);
    } 
   
//  find user by id and set req.user


    const user = await userModel.findById(req.userId);
    req.user = user;

    if (!user) {
      return res.status(401).json({
        msg: "Auth failed beacuse  can't find user in Database"
      });
    }
    else {

console.log('user founded in Datanse and you can do next step');
next();
    }

  
  } catch (error) {
    console.log(error);
  }
};

