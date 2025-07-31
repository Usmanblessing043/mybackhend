const express = require('express')
const userrouter = express.Router()
const {Signup, Login, Verifytoken, Uploadprofile, Uploadproduct,Productfetch, delproduct} = require("../controller/user.controller")
const {uservalidation} = require("../middleware/user.validation")
const Validateshema = require("../middleware/validator")

userrouter.post("/signup",Validateshema(uservalidation), Signup)
userrouter.post("/login", Login)
userrouter.get("/Verify",Verifytoken)
userrouter.get("/Productfetch",Productfetch)
userrouter.patch("/Upload/:userid",Uploadprofile)
userrouter.post("/Uploadproduct", Uploadproduct)
userrouter.post("/deleteproduct", delproduct)


module.exports = userrouter



userrouter.get("/Verify",Verifytoken)
