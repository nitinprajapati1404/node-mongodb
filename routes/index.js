const studentDean = require('./../controllers/studentDean.controller');


router.post('/test', studentDean.test);

module.exports = router;