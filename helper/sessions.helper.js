const moment = require('moment');
const async = require('async');
const Sessions = require('./../models/Sessions'); // Import the Sessions model

let generateSessions = async (dean) => {
    return new Promise( async (resolve,reject)=>{
        // console.log("dean:::",dean)
        let currentDate = moment();
        // let currentDate = moment().add(10, 'days');
        let nextThursday10AM = getNextSelectedday(currentDate,4,10);
        let nextFriday10AM = getNextSelectedday(currentDate,5,10);
        let checkSessionExists = await Sessions.find({dean_id:dean._id,start_time:nextThursday10AM});
        if(checkSessionExists.length){
            return resolve();
        }
        let nextThursday11AM = getNextSelectedday(currentDate,4,11);
        let nextFriday11AM = getNextSelectedday(currentDate,5,11);
        const sessionThursday = new Sessions({
            // email: req.body.email,
            start_time: nextThursday10AM,
            end_time: nextThursday11AM,
            day_of_week: "thursday",
            dean_id:dean._id
        });
        await sessionThursday.save();
        const sessionFriday = new Sessions({
            // email: req.body.email,
            start_time: nextFriday10AM,
            end_time: nextFriday11AM,
            day_of_week: "friday",
            dean_id:dean._id
        });
        await sessionFriday.save();
        console.log(nextThursday10AM,nextFriday10AM)
        resolve({status:true,nextThursday10AM,nextFriday10AM});
    })
}

const  getNextSelectedday = (currentDate = moment(),perticularDay=4,hour=10) => {
    const nextSelectedDay = currentDate.clone().day(perticularDay);
    // Check if the current day is after the next Friday
    if (currentDate.isAfter(nextSelectedDay)) {
        nextSelectedDay.add(7, 'days'); // If it's after, move to the next week's Friday
    }
    
    // const formattedNextFriday = nextSelectedDay.format('YYYY-MM-DD HH:mm:ss');
    return nextSelectedDay.set({ hour: hour, minute: 0, second: 0, millisecond: 0 });;


    // const today = date;
    // const daysUntilNextSelectedday = perticularDay - today.getDay(); // Calculate days until the next Friday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // if (daysUntilNextSelectedday <= 0) {
    //     // If today is Friday or later, add days to reach the next Friday
    //     daysUntilNextSelectedday += 7;
    // }

    // const nextSelectedDay = new Date(today);
    // nextSelectedDay.setDate(today.getDate() + daysUntilNextSelectedday);
}
  
module.exports = {
    generateSessions
}

// async.waterfall([
//     async (calllback)=>{

//         calllback();
//     },
//     async (calllback)=>{
//         calllback();
//     },
// ],(error)=>{

// })