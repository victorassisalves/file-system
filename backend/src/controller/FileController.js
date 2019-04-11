const Folders = require('../models/Folders');
const File = require("../models/File");

class FileController {
    async store(request, response) {
      // cria um arquivo
      const folder = await Folders.findById(request.params.id) ;
      console.log(request.file);
      
      const file = await File.create({
        title: request.file.originalname,
        path: request.file.key
      })

      folder.files.push(file)
      
      await folder.save(); 

      request.io.sockets.in(folder._id).emit('file', file )

      return response.status(201).json(file);
    }
}

module.exports = new FileController();