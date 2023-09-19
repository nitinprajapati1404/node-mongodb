const { validateRequest } = require('./../policies/doSanitiz');
const studentDean = require('./../controllers/studentDean.controller');
const utility = require('./../controllers/utility.controller');
const studentDeanSchema = require('./../schema/studentdean.json');
const isAuthenticated = require('./../policies/isAuthenticated');

/** Start Scripts for the predefind data  */
router.get('/generateSessionsOfDean', [], utility.generateSessionsOfDean);
router.post('/removeAllSessions', [], utility.removeAllSessions);
/** End Scripts for the predefind data  */


/** Start All steps  */
router.post('/user', [validateRequest(studentDeanSchema.create.req)], studentDean.create);
router.post('/login', [validateRequest(studentDeanSchema.login.req)], studentDean.login);
router.get('/chekckAvilableSessions', [validateRequest(studentDeanSchema.chekckAvilableSessions.req),isAuthenticated], studentDean.chekckAvilableSessions);
router.post('/bookSlot', [validateRequest(studentDeanSchema.bookSlot.req), isAuthenticated], studentDean.bookSlot);
router.get('/checkBookedSessionsofDean', [validateRequest(studentDeanSchema.chekckAvilableSessions.req), isAuthenticated], studentDean.checkBookedSessionsofDean);
router.post('/updateTimeManual', [validateRequest(studentDeanSchema.updateTimeManual.req), isAuthenticated], studentDean.updateTimeManual);
/** End All steps  */

module.exports = router;