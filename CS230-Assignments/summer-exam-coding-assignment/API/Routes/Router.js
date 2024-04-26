const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Controller');

router.post('/student', controller.insertStudent);
router.get('/student/:_id?',controller.findStudent);
router.put('/student/:_id?',controller.updateStudent);
router.delete('/student/:_id?',controller.deleteStudent);

router.post('/tutor',controller.insertTutor);
router.get('/tutor/:_id?',controller.findTutor);
router.put('/tutor/:_id?',controller.updateTutor);
router.delete('/tutor/:_id?',controller.deleteTutor);

router.post('/tutorial',controller.insertTutorial);
router.get('/tutorial/:_id?',controller.findTutorial);
router.put('/tutorial/:_id?',controller.updateTutorial);
router.delete('/tutorial/:_id?',controller.deleteTutorial);

module.exports = router;