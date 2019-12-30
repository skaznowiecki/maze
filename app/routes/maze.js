const express = require('express');
const router = express.Router();
const MazeController = require('../controllers/Maze');

router.post('/path', MazeController.path);

module.exports = router;