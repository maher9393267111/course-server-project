const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
   
    desc: { type: String,  },
    url: { type: String, required: true },
    image: { type: String},

duration: { type: Number,  },
    course: {type: Schema.Types.ObjectId, ref: "course",required: true },
    // courselectures: [ {type: Schema.Types.ObjectId, ref: "courselecture"} ],
  //  course_url: { type: String, required: true },


//  parent_cat_id: { type: Schema.Types.ObjectId, ref: "parentCat" },

 

  },
  { timestamps: true }
);


const lecture = mongoose.model("courselecture", lectureSchema);

module.exports = lecture;