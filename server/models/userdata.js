const mongoose = require("mongoose");




const UserSchema = new mongoose.Schema({
    
  created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  dataset_name: {type:String,}  ,

      rows: {
        type:[Object],
        required:true
      },    
    
});

const userurl = mongoose.model('UserUrl', UserSchema);

module.exports = userurl;