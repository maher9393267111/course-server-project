const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // decode password before save to db by bcryptjs
  const hashedPassword = bcrypt.hashSync(password, 10);

  // if user exist error

  const exixtcheck = await userModel.findOne({ email });
  console.log(exixtcheck);
  if (exixtcheck) {
    return res.status(400).json({
      msg: "user already exist",
    });
  }

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "please enter all fields",
    });
  }

  const user = await new userModel({ name, email, password: hashedPassword });
  console.log(user);

  // create token for user

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        errormessage: err.message,
      });
    }
    // user.salt = undefined;
    //  user.password = undefined;

    const token = jwt.sign(
      { _id: user._id, userinfo: user },
      process.env.SECRET
    );
    res.json({ user, token });
  });
};

// login

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "user does not exist",
    });
  }
  // check if password is correct
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      msg: "invalid password",
    });
  }
  // create token
  const token = jwt.sign({ _id: user._id, userinfo: user }, process.env.SECRET);
  res.json({ user, token });
};

// update user

exports.updateUser = async (req, res) => {
  // const  id = req.params.id;

  // const { name, email, password } = req.body;

  const userfind = await userModel.findOne({
    _id: req.user._id,
    //req.user._id
  });

  if (!userfind) {
    return res.status(400).json({
      msg: "user does not exist and this not current user",
    });
  }

  // set req.body in founded user
  const userafterupdate = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true }
  );

  console.log("userafterupdate----------->", userafterupdate);

  const token = jwt.sign(
    { _id: userafterupdate._id, userinfo: userafterupdate },
    process.env.SECRET
  );

  if (!userafterupdate) {
    return res.status(400).json({
      msg: "user does not exist",
    });
  } else {
    res.status(200).json({ userafterupdate, token });
  }
};

// logout

exports.logout = async (req, res) => {
  //delete token from db
  const user = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { token: "" } }
  );

  res.status(200).json({
    msg: "logout success",
  });
};


/// remove user


exports.removeUser = async (req, res) => {

    const user = await userModel.findOneAndDelete({ _id: req.user._id });
    
    if (!user) {
        return res.status(400).json({
        msg: "user does not exist",
        });
    }
    
    res.status(200).json({
        msg: "user removed",
    });
    }

