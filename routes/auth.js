const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");


const {register,login,updateUser,removeUser} = require("../controllers/auth");
const {remove} = require("../controllers/cloudinary");




router.post("/register",register);

router.post("/login",login);

router.put("/updateUser/:id",auth,adminorownCheck,updateUser);

router.delete("/removeUser/:id",auth,adminorownCheck,removeUser);


// remove old image 

router.post("/removeImage",auth,remove);








// adminCheck;

router.get("/hello/:id",auth,adminorownCheck, (req, res) => {


    res.json({
        msg: "hello maher itis workj",
    });
    
});


module.exports = router;