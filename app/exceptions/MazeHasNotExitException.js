class MazeHasNotExitException extends Error{
    constructor () {   
        const message = "Maze has not exit";
        super(message);
        
        this.name = message;
        this.status = 422
      }
    
      statusCode() {
        return this.status
      }
}



module.exports = MazeHasNotExitException;