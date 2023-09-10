const async = require('async');
const bcrypt = require('bcrypt');           
const jwt = require('jsonwebtoken');
const logger = require('./../helper/logger.helper');
const User = require('./../models/User'); // Import the User model
const studentDeanSchema = require('./../schema/studentdean.json');
// NOTE :: NEED to think of password key not to send    
// & Req-Res sanitize

/**
 * @description : pre Requisite ::: This function will create student/dean and their univesity id will be it's own email
 * @param {*} req email ,password,role,universityId
 * @param {*} res :json with universityId 
 * @returns 
 */
const create =  async (req,res)=>{
    try{
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            universityId: req.body.email
        });
        let userCreated = await newUser.save();
        if (userCreated) {
            return res.ok(studentDeanSchema.create.res, { status: true, message: "User Created Successfully", error: null, data: userCreated })
        } else {
            return res.ok(studentDeanSchema.create.res, { status: false, message: "User not created!", error: null, data: {} })
        }
    }catch(error){
        // logger.error("user create ::: ",error);
        return res.ok(studentDeanSchema.create.res, { status: false, message:"Something went wrong!",error:null,data:{} })   
    }
}

/**
 * @description : STEP 1 :  A student A enters his university ID number and pswd and gets a unique token(pick a code generated uuid for now) back which is used in authentication in all further APIs for this user - sent as bearer token in the headers.
 * Used for authenticate student/dean
 * STEP 4 : Dean logins in with his university ID and pswd (similar to 1 above). Yes Dean too gets his own token.
 * @param {*} req universityId & password
 * @param {*} res : json with user info and token which will be used in next APis
 * @returns 
 */
const login = async (req,res)=>{
    try{
        let finalResult = {};
        async.waterfall([
            //Find user by universityId  & Validate Password
            async function (calllback) {
                try {                    
                    finalResult.userdetails = await User.findOne({ universityId: req.body.universityId });
                    var result = bcrypt.compareSync(req.body.password, finalResult.userdetails.password);
                    console.log("result::", result)
                    if (!result) {
                        calllback({ status: false, message:"User Not Found"});    
                    }
                    calllback();
                } catch (error) {
                    calllback({ status: false, message: "User Not Found" });
                }
            },
            //Generate Authenticate Token
            async function (calllback) {
                try {
                    let tokenObj = {
                        _id: finalResult.userdetails._id,
                        universityId: finalResult.userdetails.universityId,
                        role: finalResult.userdetails.role,
                    }
                    finalResult.token = jwt.sign(JSON.stringify(tokenObj), process.env.jwtsecretkey);
                   calllback()
                } catch (error) {
                    calllback(error);
                }
            },
        ], (error) => {
            if (error) {
                return res.json({ status: false, message: error.message});
            }
            return res.json({ status: true,message:"User logged in succesfully", data: finalResult.userdetails, token: finalResult.token });
        })

    }catch(error){
        return res.json({status:false, message : "User not found",data:{},error:{},token:""});
        // return res.ok(studentDeanSchema.create.res, { status: false, message: "Something went wrong!", error: null, data: {} })   
    }
} 

/***
 * @description : STEP 2 : This Function will check Availibility of sessions
 */
let chekckAvilableSessions = async (req,res)=>{
    try {
        logger.info("chekckAvilableSessions")
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false });
    }
}

/**
 * @description : Step 3 : A picks one of the above slots and books.
 */

let bookSlot = async (req, res) => {
    try {
        logger.info("bookSlot")
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false });
    }
}
/**
 * STEP 4 is : Step 1 but for dean
 */
/**
 * @description : Step 5 : Dean sees a list of all pending sessions - student name, and slot details. Currently only A.
 */

let checkBookedSessionsofDean = async (req, res) => {
    try {
        logger.info("checkBookedSessionsofDean")
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false });
    }
}
/**
 * STEP 6 : Student B logs in, gets a list of free slots and books a slot.
 * is Combination of STEP 1 & Step 2 same as Student A
 */

/**
 * STEP 7 : Dean logs in back and sees a list of his pending sessions - both A and B.
 *  - Need to do step 4 & step 5 again
 */

/**
 * Step 8 : Dean logs in back after slot time booked by A and he can see only B in the list. (You can simulate this by manually changing the start slot time that A booked to a past time. Yes thts is a DB manual edit)
 * Here we can pass extra parameter of time which can handle this case!!
 */

module.exports = {
    create,
    login,
    chekckAvilableSessions,
    bookSlot,
    checkBookedSessionsofDean  
}