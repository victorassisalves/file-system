const Folders = require("../models/Folders");

class FoldersController {
    // create folder
    async store(request, response) {
        const title = request.body["title"];
        console.log('title: ', title);
        const folder = await Folders.create({title: `${title}`});
        return response.status(201).json(folder);
    }

    // Show folder
    async show(request, response) {
        console.log(request.params);
        console.log(request.body);
        const folder =  await Folders.findById(request.params.id).populate({
            path: "files",
            options: {
                sort: {createdAt: -1}
            } 
        })
        return response.status(200).json(folder)
    }  
}

module.exports = new FoldersController();