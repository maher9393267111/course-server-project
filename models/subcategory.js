const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategoryCatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
//     image:{ secure_url: { type: String },
//     public_id: { type: String },
 
//   },

images : [{

type:String,

}],

image:{
//type : Array,





 type:String,

},

  parent_cat_id: { type: Schema.Types.ObjectId, ref: "parentCat" },


  },
  { timestamps: true }
);


const subcat = mongoose.model("sub-cat", subcategoryCatSchema);
//Video.createIndexes();
module.exports = subcat;