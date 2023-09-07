/**
 * isFromCronApp
 * @description :: Policy to chekck is requet comming from cron App or not
 */
module.exports = async function (req, res, next) {
    if (req.headers['x-for-template'] !== 'CroanApp') {
        return res.status(505).send({ status: true, message:"Un-Authorized request"});
    } else { 
        next();
    }
};
