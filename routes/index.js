const { validateRequest, validateResponse } = require('./../policies/doSanitiz');
const studentDean = require('./../controllers/studentDean.controller');
const utility = require('./../controllers/utility.controller');
const studentDeanSchema = require('./../schema/studentdean.json');
const isAuthenticated = require('./../policies/isAuthenticated');

router.get('/generateSessionsOfDean', [], utility.generateSessionsOfDean);
router.post('/removeAllSessions', [], utility.removeAllSessions);


router.post('/user', [validateRequest(studentDeanSchema.create.req)], studentDean.create);
router.post('/login', [], studentDean.login);
router.get('/chekckAvilableSessions', [], studentDean.chekckAvilableSessions);
router.post('/bookSlot', [], studentDean.bookSlot);
router.get('/checkBookedSessionsofDean', [], studentDean.checkBookedSessionsofDean);
// app.use('/user/create', validateResponse(studentDeanSchema.create.res));


module.exports = router;