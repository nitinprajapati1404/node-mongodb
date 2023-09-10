const studentDean = require('./../controllers/studentDean.controller');
const { validateRequest, validateResponse } = require('./../policies/doSanitiz');
const studentDeanSchema = require('./../schema/studentdean.json');
const isAuthenticated = require('./../policies/isAuthenticated');

router.post('/user', [validateRequest(studentDeanSchema.create.req)], studentDean.create);
router.post('/login', [], studentDean.login);
router.get('/chekckAvilableSessions', [isAuthenticated], studentDean.chekckAvilableSessions);
router.post('/bookSlot', [isAuthenticated], studentDean.bookSlot);
router.get('/checkBookedSessionsofDean', [isAuthenticated], studentDean.checkBookedSessionsofDean);
// app.use('/user/create', validateResponse(studentDeanSchema.create.res));


module.exports = router;