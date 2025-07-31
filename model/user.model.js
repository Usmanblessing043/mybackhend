const mongoose = require('mongoose')
const bcrypt= require("bcryptjs")
const userschema = mongoose.Schema({
   username:{type:String, trim:true, required:true},
   email:{type:String, trim:true, unique:true, required:true}, 
   password:{type:String, trim:true, required:true},
   profilePicture:{type:String}
},{timestamp:true})

const usermodel = mongoose.model("user_collection", userschema)
userschema.pre('save', async function (next) {
   console.log(this);
 try {
   const myhashpass =   await bcrypt.hash(this.password, 8)
   this.password = myhashpass
   next()
 } catch (error) {
   console.log(error);
   
 }   
   
})

const allproductschema = mongoose.Schema({
  productname:{type:String, trim:true, require:true},
  productdescription:{type:String, trim:true, require:true},
  productprice:{type:String, trim:true, require:true},
  productrating:{type:String, trim:true, require:true},
  productquantity:{type:String, trim:true, require:true},
  productimage:{type:String, require:true},
})
const allproductmodel = mongoose.model("product_collection", allproductschema)
module.exports = {usermodel, allproductmodel}