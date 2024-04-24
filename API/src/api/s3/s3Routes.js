const express = require('express');
const router = express.Router();
const s3Controller = require('./s3Controller');

router.get('/:id', s3Controller.getFromS3);

module.exports = router;
