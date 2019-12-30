const MazeService = require('../services/Maze');
const UnprocessableEntityException = require("../exceptions/UnprocessableEntityException");

class MazeController {
    
    /**
     * @description Retrieve if exist path of the maze.
     * @param {Object} req 
     * @param {Object} res 
     */
    static path(req, res){        
        let path;
        try{
            const mazeParam = req.body.maze;
            if(!mazeParam)
                throw new UnprocessableEntityException("Maze parameter is required");

            const maze = new MazeService(mazeParam);
            path = maze.path();
        } catch(e){
            return res.status(e.statusCode()).send({
                message : e.message
            });
        }
        return res.json(path);
    }
}


module.exports = MazeController;