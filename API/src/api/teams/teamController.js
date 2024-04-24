const uuid = require('uuid')

const { Team, User, Conversation } = require('../../models/associations');

const teamController = {
    async createTeam(req, res) {
        try {
            req.body.id = uuid.v4();
            const newTeam = await Team.create(req.body);

            const newConversation = await Conversation.create({
                id: uuid.v4(),
                name: newTeam.name
            });

            await newTeam.setConversation(newConversation);

            res.status(201).json(newTeam);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getTeams(req, res) {
        try {
            const teams = await Team.findAll();
            res.status(200).json(teams);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    /**
     * Retrieves a team by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the team is retrieved.
     * @throws {Error} - If there is an error retrieving the team.
     */
    async getTeamById(req, res) {
        try {
            const teamId = req.params.id;
            const includeMembers = req.query.includeMembers === 'true';
            
            let includeOptions = [];
        
            // Include conversation in the query
            includeOptions.push({
                model: Conversation,
                as: 'conversation', // Make sure 'as' matches the alias used in the association definition
                attributes: ['id'], // Only fetch the conversation ID or other relevant fields you need
            });
    
            if (includeMembers) {
                includeOptions.push({
                    model: User,
                    as: 'students',
                    attributes: { exclude: ['user_teams_inter'] },
                    through: {
                        attributes: []
                    }
                });
            }
    
            const team = await Team.findByPk(teamId, {
                include: includeOptions
            });

            if (!team) {
                res.status(404).send('Team not found');
            } else {
                res.status(200).json(team);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },


    async updateTeam(req, res) {
        try {
            const team = await Team.findByPk(req.params.id);
            if (!team) {
                res.status(404).send('Team not found');
            } else {
                await team.update(req.body);
                res.status(200).json(team);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async deleteTeam(req, res) {
        try {
            const team = await Team.findByPk(req.params.id);
            if (!team) {
                res.status(404).send('Team not found');
            } else {
                await team.destroy();
                res.status(200).send('Team deleted');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getStudentsByTeam(req, res) {
        try {
            const team = await Team.findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'students',
                    attributes: { exclude: ['user_teams_inter'] },
                    through: {
                        attributes: []
                    }
                }]
            });
            if (!team) {
                res.status(404).send('Team not found');
            } else {
                res.status(200).json(team.students);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async addStudentToTeam(req, res) {
        try {
            const team = await Team.findByPk(req.params.id);
            if (!team) {
                res.status(404).send('Team not found');
            } else {
                await team.addStudent(req.body.studentId);
                res.status(201).send('Student added to team');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async removeStudentFromTeam(req, res) {
        try {
            const team = await Team.findByPk(req.params.id);
            if (!team) {
                res.status(404).send('Team not found');
            } else {
                await team.removeStudent(req.params.studentId);
                res.status(200).send('Student removed from team');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = teamController;