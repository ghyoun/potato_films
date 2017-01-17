/* eslint-disable quotes */

const app = require('../index.js');
const request = require('supertest')(app);

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Recommendations API', function() {
  it('has param defaults', function(done) {
    request
      .get('/films/2/recommendations')
      .expect('Content-Type', /json/)
      .expect(200, 
        {
          recommendations: [
            {
              id: 1532,
              title: "Exodus Brain Human Resources 4",
              releaseDate: "2013-12-04",
              genre: "Music",
              directors: [
                "Courtney Bradtke",
                "Ernest Beier"
              ],
              starring: [
                "Lavern Buckridge",
                "Damon Kub",
                "Brigitte Leuschke",
                "Alysha Huel"
              ],
              averageRating: 4,
              reviews: 24
            },
            {
              id: 10016,
              title: "General Deathlok Knight Designer 2",
              releaseDate: "2012-04-06",
              genre: "Music",
              directors: [
                "Declan Kohler",
                "Linnie Lockman"
              ],
              starring: [],
              averageRating: 4.285714285714286,
              reviews: 14
            },
            {
              id: 333,
              title: "The Ronin Doctor",
              releaseDate: "2007-08-28",
              genre: "Music",
              directors: [
                "Esteban Jacobson"
              ],
              starring: [
                "Nellie Trantow",
                "Donna O'Reilly",
                "Sarina Upton"
              ],
              averageRating: 4.125,
              reviews: 24
            },
            {
              id: 2042,
              title: "General Rogue Writer",
              releaseDate: "2013-02-02",
              genre: "Music",
              directors: [
                "Reed Huel"
              ],
              starring: [
                "Tommie Cole",
                "Ernestine Turner"
              ],
              averageRating: 4,
              reviews: 20
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
        .get('/films/2/recommendations?limit=2')
        .expect('Content-Type', /json/)
        .expect(200, {
          recommendations: [
            {
              id: 1532,
              title: "Exodus Brain Human Resources 4",
              releaseDate: "2013-12-04",
              genre: "Music",
              directors: [
                "Courtney Bradtke",
                "Ernest Beier"
              ],
              starring: [
                "Lavern Buckridge",
                "Damon Kub",
                "Brigitte Leuschke",
                "Alysha Huel"
              ],
              averageRating: 4,
              reviews: 24
            },
            {
              id: 10016,
              title: "General Deathlok Knight Designer 2",
              releaseDate: "2012-04-06",
              genre: "Music",
              directors: [
                "Declan Kohler",
                "Linnie Lockman"
              ],
              starring: [],
              averageRating: 4.285714285714286,
              reviews: 14
            }
          ],
          meta: {
            limit: 2,
            offset: 0
          }
        }, done);
    });

    it('can offset results', function(done) {
      request
        .get('/films/2/recommendations?limit=2&offset=2')
        .expect('Content-Type', /json/)
        .expect(200, {
          recommendations: [
            {
              id: 333,
              title: "The Ronin Doctor",
              releaseDate: "2007-08-28",
              genre: "Music",
              directors: [
                "Esteban Jacobson"
              ],
              starring: [
                "Nellie Trantow",
                "Donna O'Reilly",
                "Sarina Upton"
              ],
              averageRating: 4.125,
              reviews: 24
            },
            {
              id: 2042,
              title: "General Rogue Writer",
              releaseDate: "2013-02-02",
              genre: "Music",
              directors: [
                "Reed Huel"
              ],
              starring: [
                "Tommie Cole",
                "Ernestine Turner"
              ],
              averageRating: 4,
              reviews: 20
            }
          ],
          meta: {
            limit: 2,
            offset: 2
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
