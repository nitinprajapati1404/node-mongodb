const async = require('async');
const bcrypt = require('bcrypt');           
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('./../models/User'); // Import the User model
const studentDeanSchema = require('./../schema/studentdean.json');
const Sessions = require('../models/Sessions');
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
            universityId: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });
        let userCreated = await newUser.save();
        if (userCreated) {
            return res.json({ status: true, message: "User Created Successfully", error: null, data: { _id: userCreated._id} })
            
        } else {
            return res.json({ status: false, message: "User not created!", error: null, data: {} })
        }
    }catch(error){        
        return res.json({ status: false, message: "Something went wrong!", error: error, data: {} })
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
            async (calllback) => {                                    
                finalResult.userdetails = await User.findOne({ universityId: req.body.universityId }, { _id: 1, universityId: 1, password: 1, role: 1 });
                var result = bcrypt.compareSync(req.body.password, finalResult.userdetails.password);
                if (!result) {
                    calllback({ status: false, message:"User Not Found"});    
                }
                calllback();
                
            },
            //Generate Authenticate Token
            async (calllback) => {
                let tokenObj = {
                    _id: finalResult.userdetails._id,
                    universityId: finalResult.userdetails.universityId,
                    role: finalResult.userdetails.role,
                }
                finalResult.token = jwt.sign(JSON.stringify(tokenObj), process.env.jwtsecretkey);
                calllback()
            },
        ], (error) => {
            if (error) {
                return res.json({ status: false, message: error.message});
            }
            return res.json({ status: true, message: "User logged in succesfully", data: { _id: finalResult.userdetails ._id}, token: finalResult.token,error:null });
        })

    }catch(error){
        return res.json({status:false, message : "User not found",data:{},error:null,token:""});
    }
} 

/***
 * @description : STEP 2 : This Function will check Availibility of sessions
 * @param {*} req dean_id : id of dean
 */
let chekckAvilableSessions = async (req,res)=>{
    try {
        let currentDate = moment(); 
        let deansAvailableSessions = await Sessions.find({ dean_id: req.query.dean_id, start_time: { $gt: currentDate }, student_id: { $exists: false } })
        return res.json({ status: true,data:deansAvailableSessions, message:"Availalbe sessions of Dean",error:null });
    } catch (error) {
        return res.json({ status: false,data:[],mesage:"No Available Sessions",data:[],error:null });
    }
}

/**
 * @description : Step 3 : A picks one of the above slots and books. 
 * @param {*} req session_id : id of available which has came in previous API
 * Here User id will be taken from session
 */

let bookSlot = async (req, res) => {
    try {
        await Sessions.updateOne({ _id: req.body.session_id },{"student_id":req.user._id},{new:true});        
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
        let currentDate = moment(); 
        let result = await Sessions.find({ dean_id: req.user._id, start_time: { $gt: currentDate }, student_id: { $exists: true } }).populate('student_id', '_id universityId first_name last_name'); 
        return res.json({ status: true,data:result,mesage:"Booked sessions",error:null });
    } catch (error) {
        return res.json({ status: false,data:[],mesage:"No booked sessions",error:null });
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

/** Step 13 :  update manual date of Student A's Dean's Session */
let updateTimeManual = async (req,res)=>{
    try {
        let oldDate = moment().subtract(7, 'd')
        let oldDate1hr = moment().subtract(7, 'd').add(1,'h');
        await Sessions.updateOne({ dean_id: req.body.dean_id, "student_id": req.body.student_id }, { "start_time": oldDate, end_time: oldDate1hr }, { new: true });
        res.json({ status: true });
    } catch (error) {
        res.json({status:false});
    }
}

module.exports = {
    create,
    login,
    chekckAvilableSessions,
    bookSlot,
    checkBookedSessionsofDean,
    updateTimeManual  
}