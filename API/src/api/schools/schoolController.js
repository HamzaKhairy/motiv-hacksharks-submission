const uuid = require('uuid')

const { School, User, Team, Conversation } = require('../../models/associations');

/**
 * Controller for managing schools.
 * @namespace schoolController
 */
const schoolController = {
    /**
     * Creates a new school.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the school is created.
     */
    async createSchool(req, res) {
        try {
            req.body.id = uuid.v4();
            const newSchool = await School.create(req.body);
            res.status(201).json(newSchool);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    /**
     * Retrieves all schools.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves with the retrieved schools or rejects with an error.
     */
    async getSchools(req, res) {
        try {
            const schools = await School.findAll();
            res.status(200).json(schools);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    /**
     * Get a school by its ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the school is retrieved.
     */
    async getSchoolById(req, res) {
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                res.status(404).send('School not found');
            } else {
                res.status(200).json(school);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    /**
     * Retrieves the students of a school by school ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves with the students of the school or an error message.
     */
    async getStudentsBySchool(req, res) {
        try {
            const school = await School.findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'students',
                    attributes: { exclude: ['user_school_inter'] },
                    through: {
                        attributes: []
                    }
                }]
            });
            if (!school) {
                res.status(404).send('School not found');
            } else {
                res.status(200).json(school.students);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async addStudentToSchool(req, res) {
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                res.status(404).send('School not found');
            } else {
                const student = await User.findByPk(req.body.studentId);
                if (!student) {
                    res.status(404).send('Student not found');
                } else {
                    await school.addStudent(student);
                    res.status(200).send('Student added to school');
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async removeStudentFromSchool(req, res) {
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                res.status(404).send('School not found');
            } else {
                const student = await User.findByPk(req.params.studentId);
                if (!student) {
                    res.status(404).send('Student not found');
                } else {
                    await school.removeStudent(student);
                    res.status(200).send('Student removed from school');
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getTeamsBySchool(req, res) {
        try {
            const includeMembers = req.query.includeMembers === 'true';

            const includeOptions = [{
                model: Team,
                as: 'teams',
                attributes: { exclude: ['school_teams_inter'] },
                through: {
                    attributes: []
                }
            }];
    
            if (includeMembers) {
                includeOptions[0].include = [{ 
                    model: User,
                    as: 'students',
                    attributes: { exclude: ['user_teams_inter'] },
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Conversation,
                    as: 'conversation',
                    attributes: ['id'],
                }];
            }
    
            const school = await School.findByPk(req.params.id, {
                include: includeOptions
            });
    
            if (!school) {
                res.status(404).send('School not found');
            } else {
                res.status(200).json(school.teams);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    
    async addTeamToSchool(req, res) {
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                res.status(404).send('School not found');
            } else {
                const team = await Team.findByPk(req.body.teamId);
                if (!team) {
                    res.status(404).send('Team not found');
                } else {
                    await school.addTeam(team);
                    res.status(200).send('Team added to school');
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async removeTeamFromSchool(req, res) {
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                res.status(404).send('School not found');
            } else {
                const team = await Team.findByPk(req.params.teamId);
                if (!team) {
                    res.status(404).send('Team not found');
                } else {
                    await school.removeTeam(team);
                    res.status(200).send('Team removed from school');
                }
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = schoolController;
