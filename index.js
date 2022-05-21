const path = require('path')
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();


// routes
const authRoutes = require("./routes/auth");
const parentCatRoutes = require("./routes/parentcat");
const subCatRoutes = require("./routes/subcat");




//-----------------------------------------------------


// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));




//-----------------------------------------------------

// routes middleware

app.use('/api/auth', authRoutes)
app.use('/api/parentcat', parentCatRoutes)
app.use('/api/subcat', subCatRoutes)


//-----------------------------------------------------




mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
     
    })
    .then(() => console.log('DB Connected'));





    //PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})