/**
 * Defines the routes for the calendar API.
 * @module calendarRoutes
 */

const express = require('express');
const router = express.Router();
const { EventController } = require('./calendarController');

/**
 * Route to get all events.
 * @name GET /api/calendar
 * @function
 * @memberof module:calendarRoutes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the list of events.
 */
router.get('/', EventController.getAllEvents);

/**
 * Route to get an event by ID.
 * @name GET /api/calendar/:id
 * @function
 * @memberof module:calendarRoutes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the event details.
 */
router.get('/:id', EventController.getEventById);

/**
 * Route to create a new event.
 * @name POST /api/calendar
 * @function
 * @memberof module:calendarRoutes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the created event.
 */
router.post('/', EventController.createEvent);

/**
 * Route to update an existing event.
 * @name PUT /api/calendar/:id
 * @function
 * @memberof module:calendarRoutes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the updated event.
 */
router.put('/:id', EventController.updateEvent);

/**
 * Route to delete an event.
 * @name DELETE /api/calendar/:id
 * @function
 * @memberof module:calendarRoutes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message.
 */
router.delete('/:id', EventController.deleteEvent);

// Add attendees to an event
// Remove attendees of an event
// Get attendance of event

module.exports = router;
