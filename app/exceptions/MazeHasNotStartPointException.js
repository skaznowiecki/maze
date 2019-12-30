class MazeHasNotStartPointException extends Error{
    constructor () {   
        const message = "Maze has not start point";
        super(message);

        this.name = message;
        this.status = 422
      }
    
      statusCode() {
        return this.status
      }
}



module.exports = MazeHasNotStartPointException;