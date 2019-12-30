const dummyData = require("../../stub/maze");
const request = require('supertest');
const app = require('../../../app/app.js');

describe('POST /maze/path', function() {
    it('responds with status 200 given maze', function(done) {
        request(app)
            .post('/maze/path')
            .send({ maze : dummyData.mazeWithExit.maze })
            .set('Content-Type', 'application/json')
            .expect(200, done);        
    });

    it('responds with status 422 given empty maze', function(done) {
        request(app)
            .post('/maze/path')
            .set('Content-Type', 'application/json')
            .expect(422, done);        
    });

    it('responds with status 422 given maze without exit', function(done) {
        request(app)
            .post('/maze/path')
            .send({ maze : dummyData.mazeWithoutExit.maze })
            .set('Content-Type', 'application/json')
            .expect(422, done);        
    });

    it('responds with status 422 given maze without start point', function(done) {
        request(app)
            .post('/maze/path')
            .send({ maze : dummyData.mazeWithoutStartPoint.maze })
            .set('Content-Type', 'application/json')
            .expect(422, done);        
    });

});

