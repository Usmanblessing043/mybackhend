const env = require("dotenv").config()
env

const {usermodel, allproductmodel} = require("../model/user.model");
usermodel
allproductmodel

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const saltRound = 10
const cloudinary = require("../utils/cloudinary")




const Signup = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({ message: "All field are mandatory", status: false })
        }
        const hashedpassword = await bcrypt.hash(password, saltRound)
        console.log(hashedpassword);

        const newuser = await usermodel.create({ ...req.body, password: hashedpassword })
        if (!newuser) {
            return res.status(402).send({ message: "unable to create user", status: false })
        }
        return res.status(200).send({ message: 'user created successfully', status: true })
    } catch (error) {
        console.log(error);
        if (error.message.includes("password: Cast to Number failed")) {
            return res.status(500).send({ message: "Password must be a number", status: false })

        }
        if (error.message.includes("E11000 duplicate key error")) {
            return res.status(500).send({ message: "user already exist", status: false })

        }
        return res.status(500).send({ message: error.message, status: false })


    }
}

const Login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ message: "All field are mandatory", status: false })
        }
        const existuser = await usermodel.findOne({ email })
        const comparepass = await bcrypt.compare(password, existuser.password)

        console.log(existuser);



        if (existuser && comparepass) {
            const token = await jwt.sign({ email: existuser.email, id: existuser._id }, process.env.JWT_SECRET, { expiresIn: 600 })
            return res.status(200).send({ message: 'user login successfully', status: true, token })

        }
        return res.status(500).send({ message: 'invalid user', status: false })

    } catch (error) {
        console.log(error);

        return res.status(500).send({ message: error.message, status: false })


    }


}


const Verifytoken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        if (!token) {
            return res.status(406).send({ message:"Invalid Token", status: false })
        }
        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        if (verify) {
            const user = await usermodel.findOne({ email: verify.email })
            return res.status(200).send({ message: 'token verify', status: true, user })


        }

    } catch (error) {
        console.log(error.message);

        return res.status(500).send({ message:error.message, status: false })




    }


}
const Uploadprofile = async (req, res) => {
    try {
        const { userid } = req.params
        const { image } = req.body
        if (!image) {
            return res.status(406).send({ message: 'Add your profile picture', status: false })

        }
        const uploadimage = await cloudinary.uploader.upload(image)
        console.log(uploadimage.secure_url);
        if (uploadimage) {
            await usermodel.findByIdAndUpdate(
                userid,
                { $set: { profilePicture: uploadimage.secure_url } }
            )

            return res.status(200).send({ message: "profile picture uploaded", status: true })

        }
    } catch (error) {
         if (error.message.includes("request entity too large")) {
      return res.status(413).send({message:"Image should not exceed 5mb", status:false})     
         
      }





    }


}
const Uploadproduct = async (req, res) => {
    try {
        console.log(req.body);
        const { productname, productdescription, productprice, productquantity, productimage, productrating } = req.body
        if (!productname || !productdescription || !productprice || !productquantity || !productimage || !productrating) {
            return res.status(400).send({ message: "All field are mandatory", status: false })
        }
        

        const newproduct = await allproductmodel.create(req.body)
        if (!newproduct) {
            return res.status(402).send({ message: "unable to create product", status: false })
        }
        return res.status(200).send({ message: 'product created successfully', status: true})
    } catch (error) {
        
        return res.status(500).send({ message: error.message, status: false })


    }


}
const Productfetch = async (req, res) => {
    try {
         const product = await allproductmodel.find()
         console.log(product);
         
         if (product) {
             return res.status(200).send({ message: 'product fetch successfully', status: true, product})
            
         }

    } catch (error) {
        console.log(error.message);

        return res.status(500).send({ message:error.message, status: false })




    }
   


}
const delproduct = async (req, res) => {
    
    try {
      const {id} = req.body
      const deltodo = await allproductmodel.findByIdAndDelete(id)
      if (deltodo) {
        return res.status(200).send({ message: 'product deleted successfully', status: true})

        
         
}  
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message:error.message, status: false })

      
   }


}
module.exports = { Signup, Login, Verifytoken, Uploadprofile, Uploadproduct, Productfetch, delproduct }