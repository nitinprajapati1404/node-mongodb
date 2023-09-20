const async = require('async');
const logger = require('./../helper/logger.helper');
const User = require('./../models/User'); // Import the User model
const Sessions = require('./../models/Sessions'); // Import the Sessions model
const sessionsHelper = require('./../helper/sessions.helper');
// NOTE :: Currently This is temporary solution for schduler but for SCALE we need to prepare some UI Where User can first select Dean and check his availibility based on days/weeks/months
let generateSessionsOfDean = async (req,res)=>{
    res.json({status:true,messaage:"Script started to execute"})
    let deans = [];
    try {
        async.waterfall([
            async (calllback) =>{
                deans = await User.find({role:"dean"}).select({_id:1,universityId:1,first_name:1,last_name:1});
                calllback(null);
            },
            async (calllback) =>{
                async.eachOfLimit(deans,5,async (item, key, innercallBack) => {
                    await sessionsHelper.generateSessions(item);
                    innercallBack();
                },(error)=>{
                    calllback(null);
                })
            }
        ], (error)=>{
            if(error){
                logger.info("inerro:::",error);
            }
        })
    } catch (error) {
        logger.info("in catch eeerro:::",error);
    }
}

let removeAllSessions = async (req,res)=>{
    res.json({status:true,messaage:"Script For Remove all sessions"})
    let deans = [];
    try {
        await Sessions.deleteMany();
    } catch (error) {
        logger.info("in catch eeerro:::",error);
    }
}
module.exports ={
    generateSessionsOfDean,
    removeAllSessions
}