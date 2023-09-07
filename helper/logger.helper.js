let is_DEBUG = process.env.is_DEBUG == "true"? true: false;
/**
 * 
 * @param {*} text: string :text by which we can identify where it is kept
 * @param {*} details : details which are needs to print
 */
const info = (text='no text',details='')=>{
    if(is_DEBUG){
        console.log(text,details)
    }
}

const error = (text = 'no text', details = '') => {
    if (is_DEBUG) {
        console.error(text, details)
    }
}
module.exports = {
    info,
    error
}