const app = require('../index.js');
const request = require('supertest')(app);

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Recommendations API', function() {
  it('has param defaults', function(done) {
    request
      .get('/films/1/recommendations')
      .expect('Content-Type', /json/)
      .expect(200, {
        recommendations: [
          {
            id: 5449,
            title: 'The Tempest Boy Philosopher',
            releaseDate: '2014-05-19',
            genre: 'Crime',
            directors: [
              'Marcia Konopelski'
            ],
            starring: [],
            averageRating: null,
            reviews: 0
          },
          {
            id: 1713,
            title: 'Zatanna Advocate',
            releaseDate: '2008-05-06',
            genre: 'Crime',
            directors: [
              'Lucile Kuhlman'
            ],
            starring: [],
            averageRating: 4,
            reviews: 3
          },
          {
            id: 6608,
            title: 'Amazo Brain Police Officer',
            releaseDate: '2010-09-29',
            genre: 'Documentary',
            directors: [
              'Marcia Konopelski'
            ],
            starring: [],
            averageRating: null,
            reviews: 0
          },
          {
            id: 1150,
            title: 'Giant Stardust I Philosopher',
            releaseDate: '2003-10-19',
            genre: 'Drama',
            directors: [
              'Marcia Konopelski'
            ],
            starring: [],
            averageRating: 4.333333333333333,
            reviews: 3
          },
          {
            id: 6504,
            title: 'Ultra Question Machine Accountant',
            releaseDate: '2002-05-27',
            genre: 'Family',
            directors: [
              'Lincoln Prosacco'
            ],
            starring: [
              'Marina Romaguera',
              'Lafayette Mills'
            ],
            averageRating: 4.666666666666667,
            reviews: 6
          },
          {
            id: 1057,
            title: 'Beyonder Web Developer',
            releaseDate: '2016-01-16',
            genre: 'Family',
            directors: [
              'Javier Moore'
            ],
            starring: [],
            averageRating: 2,
            reviews: 1
          },
          {
            id: 8381,
            title: 'Ultra Elongated Man Strange Actor',
            releaseDate: '2010-04-25',
            genre: 'Family',
            directors: [
              'Javier Moore'
            ],
            starring: [],
            averageRating: null,
            reviews: 0
          },
          {
            id: 506,
            title: 'Bolt Interpreter',
            releaseDate: '2009-05-12',
            genre: 'Family',
            directors: [
              'Lina Vandervort'
            ],
            starring: [],
            averageRating: 3,
            reviews: 1
          },
          {
            id: 9004,
            title: 'Red Redeemer Actor',
            releaseDate: '1998-01-14',
            genre: 'Family',
            directors: [
              'Keely Kreiger'
            ],
            starring: [],
            averageRating: 3.25,
            reviews: 4
            },
          {
            id: 7602,
            title: 'Abomination Of Hearts Writer',
            releaseDate: '2012-03-07',
            genre: 'Family',
            directors: [
              'Angela Abernathy'
            ],
            starring: [],
            averageRating: 3.25,
            reviews: 4
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
        .get('/films/1/recommendations?limit=2')
        .expect('Content-Type', /json/)
        .expect(200, {
          recommendations: [
            {
              id: 5449,
              title: 'The Tempest Boy Philosopher',
              releaseDate: '2014-05-19',
              genre: 'Crime',
              directors: [
                'Marcia Konopelski'
              ],
              starring: [],
              averageRating: null,
              reviews: 0
            },
            {
              id: 1713,
              title: 'Zatanna Advocate',
              releaseDate: '2008-05-06',
              genre: 'Crime',
              directors: [
                'Lucile Kuhlman'
              ],
              starring: [],
              averageRating: 4,
              reviews: 3
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
        .get('/films/1/recommendations?limit=2&offset=7')
        .expect('Content-Type', /json/)
        .expect(200, {
          recommendations: [
            {
              id: 506,
              title: 'Bolt Interpreter',
              releaseDate: '2009-05-12',
              genre: 'Family',
              directors: [
                'Lina Vandervort'
              ],
              starring: [],
              averageRating: 3,
              reviews: 1
            },
            {
              id: 9004,
              title: 'Red Redeemer Actor',
              releaseDate: '1998-01-14',
              genre: 'Family',
              directors: [
                'Keely Kreiger'
              ],
              starring: [],
              averageRating: 3.25,
              reviews: 4
            }
          ],
          meta: {
            limit: 2,
            offset: 7
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
