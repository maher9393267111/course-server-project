const express = require("express");
const router = express.Router();
const {auth,adminCheck} = require("../middleware.js/auth");


const {register,login,updateUser,removeUser} = require("../controllers/auth");




router.post("/register",register);

router.post("/login",login);

router.put("/updateUse/:id",auth,updateUser);

router.delete("/removeUser/:id",auth,removeUser);









// adminCheck;

router.get("/hello",auth,adminCheck, (req, res) => {

if (req.user.role === "admin" || req.user.role === "user") {

    res.status(200).json({
        msg: "hello " + req.user.name,
    });
}


    
});


module.exports = router;