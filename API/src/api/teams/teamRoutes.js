const express = require('express');
const router = express.Router();
const teamController = require('./teamController');

router.get('/', teamController.getTeams);
router.post('/', teamController.createTeam);
router.get('/:id', teamController.getTeamById);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);
router.get('/:id/students', teamController.getStudentsByTeam);
router.post('/:id/students', teamController.addStudentToTeam);
router.delete('/:id/students/:studentId', teamController.removeStudentFromTeam);

module.exports = router;