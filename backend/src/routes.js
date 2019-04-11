
const express = require('express');
const routes = express.Router()
const multer = require("multer");
const multerConfig = require("./config/multer")

const FoldersController = require("./controller/FoldersController")
const FileController = require("./controller/FileController")

routes.post('/folders', FoldersController.store);
routes.get('/folders/:id', FoldersController.show);

routes.get('folders/:id/fileDelete', FileController.delete)

routes.post('/folders/:id/fileUpload', multer(multerConfig).single('file'), FileController.store)

module.exports = routes;