const express = require("express");
const router = express.Router();
const {auth,adminCheck
    ,adminorownCheck


} = require("../middleware.js/auth");


const {register,login,updateUser,removeUser} = require("../controllers/auth");




router.post("/register",register);

router.post("/login",login);

router.put("/updateUse/:id",auth,updateUser);

router.delete("/removeUser/:id",auth,removeUser);









// adminCheck;

router.get("/hello/:id",auth,adminorownCheck, (req, res) => {


    res.json({
        msg: "hello maher itis workj",
    });
    
});


module.exports = router;