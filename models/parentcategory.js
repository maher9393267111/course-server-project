const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentCatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image:{ secure_url: { type: String },
    public_id: { type: String },
 
  },


  },
  { timestamps: true }
);


const parentcat = mongoose.model("parentCat", parentCatSchema);
//Video.createIndexes();
module.exports = parentcat;