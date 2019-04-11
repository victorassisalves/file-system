const Files = require("../models/Files");
const Folders = require('../models/Folders')

class FileController {
    async store(request, response) {
      // cria um arquivo
      const folder = await Folders.findById(request.params.id) 
      console.log(request.file);
      
      const file = await Files.create({
        title: request.file.originalname,
        path: request.file.key
      })

      folder.files.push(file)
      
      await folder.save(); 

      request.io.sockets.in(folder._id).emit('file', file)

      return response.status(201).json(file);
    }

    async delete(request, response) {
      console.log('Im here');
      console.log(request.params.id);
      const folder = await Folders.findById(request.params.id)
      console.log(request.params.fileId);
      // const deleteFile = folder.files.filter((value, index, arr) => {

      //   return value === request.params.fileId;
    
      // });

      // folder.save()
      return response.status(201).json(folder);
      

    }
}

module.exports = new FileController();