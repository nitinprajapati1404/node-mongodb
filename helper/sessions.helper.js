const moment = require('moment');
const async = require('async');
const Sessions = require('./../models/Sessions'); // Import the Sessions model

let generateSessions = async (dean) => {
    return new Promise( async (resolve,reject)=>{
        let currentDate = moment();
        let nextThursday10AM = getNextSelectedday(currentDate, 4, 10);
        let nextFriday10AM = getNextSelectedday(currentDate, 5, 10);
        try{            
            let checkSessionExists = await Sessions.find({ dean_id: dean._id, start_time: nextThursday10AM });
            if (checkSessionExists.length) {
                return resolve();
            }
            let nextThursday11AM = getNextSelectedday(currentDate, 4, 11);
            let nextFriday11AM = getNextSelectedday(currentDate, 5, 11);
            const sessionThursday = new Sessions({
                start_time: nextThursday10AM,
                end_time: nextThursday11AM,
                day_of_week: "thursday",
                dean_id: dean._id
            });
            await sessionThursday.save();
            const sessionFriday = new Sessions({
                start_time: nextFriday10AM,
                end_time: nextFriday11AM,
                day_of_week: "friday",
                dean_id: dean._id
            });
            await sessionFriday.save();
            resolve({ status: true, nextThursday10AM, nextFriday10AM });
        }catch(error){
            resolve({ status: true, nextThursday10AM, nextFriday10AM });
        }
    })
}

const  getNextSelectedday = (currentDate = moment(),perticularDay=4,hour=10) => {
    const nextSelectedDay = currentDate.clone().day(perticularDay);
    // Check if the current day is after the next Friday
    if (currentDate.isAfter(nextSelectedDay)) {
        nextSelectedDay.add(7, 'days'); // If it's after, move to the next week's Friday
    }
    return nextSelectedDay.set({ hour: hour, minute: 0, second: 0, millisecond: 0 });;
}
  
module.exports = {
    generateSessions
}