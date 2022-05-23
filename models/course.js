const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, },
    desc: { type: String,  },
    image: { type: String, required: true },
    instructor: { type: String, required: true },
studentsnumber: { type: Number, default: 2340},
duration: { type: Number,  },
    subcategory: {type: Schema.Types.ObjectId, ref: "sub-cat",required: true },
    courselectures: [ {type: Schema.Types.ObjectId, ref: "courselecture"} ],
  //  course_url: { type: String, required: true },


 //parent_cat_id: { type: Schema.Types.ObjectId, ref: "parentCat" },



  },
  { timestamps: true }
);


const course = mongoose.model("course", courseSchema);
//Video.createIndexes();
module.exports = course;