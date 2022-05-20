const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.auth = async (req, res, next) => {
  try {



    const token = req.headers?.authorization?.split(" ")[1];
    //const isCustomAuth = token.length < 500;
  //  console.log("token------------->", token);


    let decodedData;

    if (token) {
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
    } else if (!user) {
      res.status(401).json({
        msg: "Auth failed beacuse  use not found in database",
      });
    } else {
      console.log("user founded in Database and you can do next step");
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

// current auth user id === params id hec an deleete or update his account or admin account else error 403

exports.adminorownCheck = async (req, res, next) => {
  id = req.params.id;
  console.log("id", id);
  const userbyprams = await userModel.findById(id).exec();

  if (
    userbyprams._id.toString() === req.user._id.toString() ||
    req.user.role === "admin"
  ) {
    next();
  } else {
    res.status(403).json({
      err: "Admin resource. Access denied. &&&&&  this not your account sorry",
    });
  }
};
