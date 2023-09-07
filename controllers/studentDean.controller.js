const logger = require('./../helper/logger.helper');

const test = (req,res)=>{
    logger.info("tesssss:::","dfd")
    return res.json({status:true})
}

module.exports = {
    test,  
}