const uuid = require('uuid')

const { User, Post, Post_Comment } = require('../../models/associations');
const s3Controller = require('../s3/s3Controller');

const postController = {
    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: Post_Comment,
                        as: 'comments',
                        limit: 5
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: [
                            'firstName',
                            'lastName'
                        ],
                    }
                ]
            });

            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single post by id
    getPostById: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id, {
                include: [{
                    model: Post_Comment,
                    as: 'comments',
                    limit: 5
                }]
            });
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new post
    createPost: async (req, res) => {
        try {
            const key = uuid.v4();
            req.body.userId = req.user.userId;
            req.body.type = "Image"
            req.body.id = key
            await Post.create(req.body);
            s3Controller.uploadToS3(key)(req, res)
            res.status(201).json("newPost");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update a post by id
    updatePost: async (req, res) => {
        try {
            const updated = await Post.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated[0] > 0) {
                res.json({ message: 'Post updated' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a post by id
    deletePost: async (req, res) => {
        try {
            const deleted = await Post.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.json({ message: 'Post deleted' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    likePost: async (req, res) => {
        try {
            const deleted = await Post.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.json({ message: 'Post deleted' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addCommentToPost: async (req, res) => {
        try {
            const postId = req.params.id; // Assuming the post ID is in the URL
            const commentData = req.body; // Assuming the comment data is in the request body

            // First, check if the post exists
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).send('Post not found');
            }

            // Create a new comment and associate it with the post
            const newComment = await Post_Comment.create({
                ...commentData, // Spread operator to include all comment fields from request
                postId: postId // Assuming your foreign key is named 'PostId'
            });

            // Send the created comment as a response
            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error adding comment to post:', error);
            res.status(500).send(error);
        }
    },

    getPostComments: async (req, res) => {
        try {
            const postId = req.params.id; // or req.query.postId, depending on how the ID is passed

            // Assuming you have set up associations in Sequelize
            const post = await Post.findByPk(postId, {
                include: [{
                    model: Post_Comment,
                    as: 'comments',
                }]
            });

            if (!post) {
                return res.status(404).send('Post not found');
            }

            // Send the comments as a response
            res.status(200).json(post.comments);
        } catch (error) {
            console.error('Error fetching post comments:', error);
            res.status(500).send(error);
        }
    },
};

module.exports = postController;
