const multer = require('multer');
const express = require('express');

const postController = require('./postController');
const authenticateToken = require('../../middleware/authMiddleware')

const router = express.Router();
const upload = multer();

// Route to get all posts
router.get('/', postController.getAllPosts);

// Route to get a single post by id
router.get('/:id', postController.getPostById);

// Route to create a new post
router.post('/', authenticateToken(0), upload.single('file'),  postController.createPost);

// Route to update a post by id
router.put('/:id', postController.updatePost);

// Route to delete a post by id
router.delete('/:id', postController.deletePost);

router.post('/:id/likes', authenticateToken(0), postController.likePost);
// router.delete('/:id/likes', postController.unlikePost);
// router.get('/:id/likes', postController.getPostLikes);

router.post('/:id/comments', postController.addCommentToPost);
router.get('/:id/comments', postController.getPostComments);
// router.delete('/comments/:commentId', postController.deleteComment);

module.exports = router;
