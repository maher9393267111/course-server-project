const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentCatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image:{ secure_url: { type: String },
    public_id: { type: String },
 
  },

  childern_cat_id: { type: Schema.Types.ObjectId, ref: "sub_cat" },

  },
  { timestamps: true }
);


const parentcat = mongoose.model("parentCat", parentCatSchema);
//Video.createIndexes();
module.exports = parentcat;