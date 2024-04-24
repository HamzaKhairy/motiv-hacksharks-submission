/**
 * Express router for handling school routes.
 * @module schoolRoutes
 */

const express = require('express');
const router = express.Router();
const schoolController = require('./schoolController');

/**
 * Route for creating a new school.
 * @name POST /api/schools
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The created school object
 */
router.post('/', schoolController.createSchool);

/**
 * Route for getting all schools.
 * @name GET /api/schools
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/', schoolController.getSchools);

/**
 * Route for getting a school by ID.
 * @name GET /api/schools/:id
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/:id', schoolController.getSchoolById);

/**
 * Route for getting students by school.
 * @name GET /api/schools/:id/students
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/:id/students', schoolController.getStudentsBySchool);

/**
 * Route for adding a student to a school.
 * @name POST /api/schools/:id/students
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/:id/students', schoolController.addStudentToSchool);

/**
 * Route for removing a student from a school.
 * @name DELETE /api/schools/:id/students/:studentId
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.delete('/:id/students/:studentId', schoolController.removeStudentFromSchool);

/**
 * Route for getting teams by school.
 * @name GET /api/schools/:id/teams
 * @function
 * @memberof module:schoolRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/:id/teams', schoolController.getTeamsBySchool);

router.post('/:id/teams', schoolController.addTeamToSchool);
router.delete('/:id/teams/:teamId', schoolController.removeTeamFromSchool);

module.exports = router;
