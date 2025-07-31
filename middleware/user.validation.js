const yup = require ("yup")


const uservalidation = yup.object({
    username:yup.string().trim().matches(/ ^[a-z0-9_-]{3,15}$/,"username must include the following uppercase lowercase").required("username is required"),
    email:yup.string().email("input a valid email").required("email is required"),
    password:yup.string().trim().required("password is required")
    
})
module.exports = {uservalidation}