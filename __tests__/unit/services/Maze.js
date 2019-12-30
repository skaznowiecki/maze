const dummyData = require("../../stub/maze");
const Maze = require("../../../app/services/Maze");
const MazeHasNotStartPointException = require('../../../app/exceptions/MazeHasNotStartPointException');
const MazeHasNotExitException = require('../../../app/exceptions/MazeHasNotExitException');


it("expect path in maze that has solution", () => {
    const maze = new Maze(dummyData.mazeWithExit.maze);
    const path = maze.path();     

    expect(Array.isArray(path)).toBe(true);
    expect(path).toHaveLength(dummyData.mazeWithExit.path.length);
});

it("expect throw MazeHasNotStartPointException in maze that has not start point", () => {
    const maze = new Maze(dummyData.mazeWithoutStartPoint.maze);
    const t = () => {
        maze.path();
    };
    expect(t).toThrow(MazeHasNotStartPointException);
});


it("expect throw MazeHasNotExitException in maze that has not exit", () => {
    const maze = new Maze(dummyData.mazeWithoutExit.maze);
    const t = () => {
        maze.path();
    };
    expect(t).toThrow(MazeHasNotExitException);
});



