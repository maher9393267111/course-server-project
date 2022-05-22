const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategoryCatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    // price: { type: Number, required: true },
    // description: { type: String, required: true },
    // image: { type: String, required: true },
    // subcat_id: {type: Schema.Types.ObjectId, ref: "sub_cat",required: true },
    course_url: { type: String, required: true },






  parent_cat_id: { type: Schema.Types.ObjectId, ref: "parentCat" },


  },
  { timestamps: true }
);


const subcat = mongoose.model("sub-cat", subcategoryCatSchema);
//Video.createIndexes();
module.exports = subcat;