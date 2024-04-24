const AWS = require('aws-sdk');
const stream = require('stream');
require('dotenv').config();

AWS.config.update({
   
    accessKeyId: process.env.S3_PAKID,
    secretAccessKey:  process.env.S3_PAK,
    region: process.env.S3_REGION
});

const s3 = new AWS.S3();

const s3Controller = {
    async getFromS3(req, res) {
        try {
            const downloadParams = {
                "Bucket": "motiv.dev.bucket",
                "Key": req.params.id
            }

            s3.getObject(downloadParams, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(404).send('Image not found');
                } else {
                    res.setHeader('Content-Type', 'image/png');
                    res.send(data.Body);
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    uploadToS3(key) {
        return async function (req, res) {
            const file = req.file;

            // Create a stream.PassThrough instance
            const pass = new stream.PassThrough();

            // Setting up S3 upload parameters
            const params = {
                Bucket: 'motiv.dev.bucket',
                Key: key,
                Body: pass
            };

            // Uploading files to the bucket using stream
            s3.upload(params, function (err, data) {
                if (err) {
                    console.error('Error:', err);
                    return res.status(500).send('Error uploading file');
                }
            });

            // Stream the file to S3
            stream.Readable.from(file.buffer).pipe(pass);
        }
    }
}

module.exports = s3Controller;