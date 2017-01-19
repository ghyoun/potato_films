/* eslint-disable quotes */

const app = require('../index.js');
const request = require('supertest')(app);

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Recommendations API', function() {
  it('has param defaults', function(done) {
    request
      .get('/films/8/recommendations')
      .expect('Content-Type', /json/)
      .expect(200, 
        {
          recommendations: [
            {
              id: 579,
              title: "Agent Silk Brain Doctor",
              releaseDate: "1992-01-24",
              genre: "Drama",
              directors: [
                "Gia Kessler"
              ],
              starring: [
                "Theresia Gulgowski"
              ],
              averageRating: 4.2727272727272725,
              reviews: 11
            },
            {
              id: 22,
              title: "Mr Mimic Philosopher",
              releaseDate: "1988-08-30",
              genre: "Family",
              directors: [
                "Jerome Cassin"
              ],
              starring: [],
              averageRating: 4.071428571428571,
              reviews: 14
            }
          ],
          meta: {
            limit: 10,
            offset: 0
          }
        }, done);
  });

  describe('pagination', function() {
    it('can limit results', function(done) {
      request
        .get('/films/8/recommendations?limit=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          recommendations: [
            {
              id: 579,
              title: "Agent Silk Brain Doctor",
              releaseDate: "1992-01-24",
              genre: "Drama",
              directors: [
                "Gia Kessler"
              ],
              starring: [
                "Theresia Gulgowski"
              ],
              averageRating: 4.2727272727272725,
              reviews: 11
            }
          ],
          meta: {
            limit: 1,
            offset: 0
          }
        }, done);
    });

    it('can offset results', function(done) {
      request
        .get('/films/8/recommendations?offset=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          recommendations: [
            {
              id: 22,
              title: "Mr Mimic Philosopher",
              releaseDate: "1988-08-30",
              genre: "Family",
              directors: [
                "Jerome Cassin"
              ],
              starring: [],
              averageRating: 4.071428571428571,
              reviews: 14
            }
          ],
          meta: {
            limit: 10,
            offset: 1
          }
        }, done);
    });
  });

  describe('error handling', function() {
    it('handles missing routes', function(done) {
      request
        .get('/films/1/recommendations/notarealroute')
        .expect(404)
        .expect(function(res) {
          ok('message' in res.body, '"message" key missing');
        }).end(done);
    });

    it('handles invalid id', function(done) {
      request
        .get('/films/notanid/recommendations')
        .expect(422)
        .expect(function(res) {
          ok('message' in res.body, '"message" key missing');
        }).end(done);
    });

    it('handles invalid query params', function(done) {
      request
        .get('/films/19/recommendations?offset=notanoffset&limit=notalimit')
        .expect(422)
        .expect(function(res) {
          ok('message' in res.body, '"message" key missing');
        }).end(done);
    });
  });
});
