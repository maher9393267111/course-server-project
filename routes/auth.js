const express = require("express");
const router = express.Router();
const {auth} = require("../middleware.js/auth");


const {register,login,updateUser,removeUser} = require("../controllers/auth");




router.post("/register",register);

router.post("/login",login);

router.put("/updateUser",auth,updateUser);

router.delete("/removeUser",auth,removeUser);




router.get("/hello",auth, (req, res) => {

    res.send("Hello");
});


module.exports = router;