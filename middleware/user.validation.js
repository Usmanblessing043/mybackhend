const yup = require ("yup")


const uservalidation = yup.object({
    username:yup.string().trim().required("username is required"),
    email:yup.string().email("input a valid email").required("email is required"),
    password:yup.string().trim().required("password is required")
    
})
module.exports = {uservalidation}