const MazeHasNotStartPointException = require('../exceptions/MazeHasNotStartPointException');
const MazeHasNotExitException = require('../exceptions/MazeHasNotExitException');


const SEQUENCE = "CCCDDDEEEDDD";

const START_MAZE = "B";
const END_MAZE = "B";

class Maze {

    /**
     * 
     * @param {Array} maze 
     */
    constructor( maze ){
        this.maze = maze;
        this.size = {
            "x" : maze[0].length,
            "y" : maze.length,
        };
    }

    /**
     * @description Return the start point. If there is not start point return null
     * 
     * @returns {(Object|null)}
     */
    start(){
        for(let y in this.maze){
            const x = this.maze[y].findIndex( item => item ==  START_MAZE);
            if(x !== -1)
                return {  y : parseInt(y),  x };
        }
        return null;
    }

    /**
     * @returns {Array} - Returns an array with the path to the exit.
     */
    path(){
        this.startPoint = this.start();
        
        if(this.startPoint == null)
            throw new MazeHasNotStartPointException();
            
        const result = this.resolve([this.startPoint], { prop : SEQUENCE } );

        if(result === false)
            throw new MazeHasNotExitException();

        return result; 
    }   

    /**
     * 
     * @param {number} y - Point y
     * @param {number} x - Point x
     * @param {string} letter - Letter to search 
     * 
     * @returns {boolean} Returns true if the letter was found 
     */
    fieldHasLetter(y, x, letter){
        if( x < 0 || x > (this.size.x - 1) ){
            return false;
        }
        if( y < 0 || y > (this.size.y - 1) ){
            return false;
        }

        return ( this.maze[y][x] == letter );
    }

    /**
     * 
     * @param {Object} position - Center position
     * @param {string} letter - Letter to search 
     * 
     * @returns {Array} Returns an array of positions that matched with the letter searched
     */
    searchAround(position, letter){
        let postions = [];

        const posibilities = [
            {  x : position.x, y : position.y - 1  },
            {  x : position.x, y : position.y + 1  },
            {  x : position.x - 1, y : position.y  },
            {  x : position.x + 1, y : position.y  }
        ];
        
        posibilities.forEach( posibility => {
            if( this.fieldHasLetter( posibility.y, posibility.x, letter) )
                postions.push({ y : posibility.y, x: posibility.x });
        });
        
        return postions;
    }

    /**
     * @description Verify if exit was found
     * 
     * @param {Object} currentPoint - Current position
     * 
     * @returns {Boolean} - Return true if the END_MAZE character was found
     */
    endOfTheMaze(currentPoint){
        const points = this.searchAround(currentPoint, END_MAZE);

        if(points.length == 0)
            return false;

        //validate if the found point is equal that start point 
        if(points[0].x == this.startPoint.x && points[0].y == this.startPoint.y)
            return false;

        return true;
    }

    /**
     * @description An object is used instead of a string to be able to modify it by reference
     * 
     * @param {Object} sequence
     *  
     * @returns {string} - Returns next letter to search
     */
    nextLetter(sequence){
        if(sequence.prop == "")
            sequence.prop = SEQUENCE;
        
        const letter = sequence.prop[0];
        sequence.prop = sequence.prop.substring(1);
        return letter;
    }

    /**
     * 
     * @param {Object} currentPoint 
     * @param {(Object|undefined)} previusPosition 
     * @param {string} letter 
     * 
     * @returns {Array} - Array of posibles next steps
     */
    nextPositions(currentPoint, previusPosition ,letter){
        const points = this.searchAround(currentPoint, letter);
                
        if(previusPosition == undefined)
            return points;

        return points.filter( item => item.x != previusPosition.x || item.y != previusPosition.y );
    }   

    /**
     * 
     * @param {Array} path 
     * @param {Object} sequence 
     * 
     * @returns {(Array|false)} - Returns an array with the path to the exit. If there is no road, return false
     */
    resolve( path, sequence ){
        let currentPosition = path[ path.length - 1 ];
        let previusPosition = path[ path.length - 2 ];
        let letter, positions;

        while(!this.endOfTheMaze(currentPosition)){
    
            letter = this.nextLetter(sequence);
            positions = this.nextPositions(currentPosition, previusPosition, letter);
            
            if(positions.length == 1){
                path.push(positions[0]);
                previusPosition = currentPosition;
                currentPosition = positions[0];
                continue;
            }
            
            //If there is more than one option, the function will be recursively called for each option
            if( positions.length > 1 ){
                for(let i in positions){
                    const result =  this.resolve( [...path, ...[positions[i]] ], { 'prop' : sequence.prop } );
                    if(result!== false)
                        return result;
                }
            }
            return false;
        }

        //Put the exit position into path array
        positions = this.nextPositions(currentPosition, previusPosition, END_MAZE);
        path.push(positions[0]);
        
        return path;
    }

};

module.exports = Maze;