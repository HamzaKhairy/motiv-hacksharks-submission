const uuid = require('uuid')
const { Event } = require('../../models/associations');

/**
 * Controller for handling calendar events.
 * @namespace EventController
 */
const EventController = {
    /**
     * Retrieves all events.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves with the JSON representation of the events or an error message.
     */
    async getAllEvents(req, res) {
        try {
            const events = await Event.findAll();
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Retrieves an event by its ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the event is retrieved.
     */
    async getEventById(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
            } else {
                res.json(event);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Creates a new event.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the event is created.
     */
    async createEvent(req, res) {
        try {
            req.body.id = uuid.v4();
            const newEvent = await Event.create(req.body);
            res.status(201).json(newEvent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Updates an event.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the event is updated.
     */
    async updateEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
            } else {
                await event.update(req.body);
                res.json(event);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Deletes an event.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the event is deleted.
     */
    async deleteEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
            } else {
                await event.destroy();
                res.json({ message: 'Event deleted' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = {
    EventController
};