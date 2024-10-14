const {z} = require("zod")

const signupSchema = z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim(),
    email:z
    .string({required_error:"Email is required"})
    .email({message:"invalid email address"})
    .trim(),
    password:z
    .string({required_error:"password is required"})
    .min(5,{message:"password must be minimum 5 characters"})
    .max(10,{message:"password should not greater than 10 characters"}),
    phone:z
    .string({required_error:"Phone is required"})
    .min(10,{message:"phone should must be minimum 10 characters"}),
})




module.exports = signupSchema