const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

name:{
type: String,
required:true

},

price:{
type: Number,
required: [true, "Price must be provided"]
},

featured: {
type: Boolean,
default:true

},

createdAt: {
type: Date,
default:Date.now()
},

company: {
type:String,

enum: {
values: ["apple","samsung", "dell", "mi"],

message: '{VALUE} is not supported'
}

   }

});

module.exports = mongoose.model("Product", productSchema);