const File = require('./../models/File');
const Box = require('./../models/Box');

class FileController {
    async store(req, res) {
        const { id } = req.params;
        const { originalname, key } = req.file;

        const box = await Box.findById(id);

        const file = await File.create({
            title: originalname,
            path: key
        });

        box.files.push(file);
        
        /**Informa que foi criado um novo arquivo para todos os usuario conectado a uma box específica */
        req.io.sockets.in(box._id).emit('file',file)


        await box.save();

        return res.json(file);
    }
}

module.exports = new FileController();