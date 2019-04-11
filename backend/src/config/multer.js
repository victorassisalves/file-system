const multer = require("multer");
const path = require('path');
const crypto =  require('crypto')

const filePath = path.resolve(__dirname, '..','..','tmp');
module.exports = {
    dest: filePath,
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, filePath); 
        },
        filename: (request, file, callback) => {
            crypto.randomBytes(16, (error, hash) => {
                if(error) {
                    console.log("Error in crypto");
                    callback(error);
                }
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                callback(error, file.key);
            });
        }
    })
};