const app = require('../index.js');

const expect = require('chai').expect,
      request = require('supertest')(app);

describe('Recommendations API', function() {
  it('has param defaults', function(done) {
    request
      .get('/films/1/recommendations')
      .expect('Content-Type', /json/)
      .expect(200, {
        recommendations: [
          {
            id: 5449,
            title: "The Tempest Boy Philosopher",
            releaseDate: "2014-05-19",
            genre: "Crime",
            director: [
              "Marcia Konopelski"
            ],
            starring: [],
            averageRating: null,
            reviews: 0
          },
          {
            id: 1713,
            title: "Zatanna Advocate",
            releaseDate: "2008-05-06",
            genre: "Crime",
            director: [
              "Lucile Kuhlman"
            ],
            starring: [],
            averageRating: 4,
            reviews: 3
          },
          {
            id: 6608,
            title: "Amazo Brain Police Officer",
            releaseDate: "2010-09-29",
            genre: "Documentary",
            director: [
              "Marcia Konopelski"
            ],
            starring: [],
            averageRating: null,
            reviews: 0
          },
          {
            id: 1150,
            title: "Giant Stardust I Philosopher",
            releaseDate: "2003-10-19",
            genre: "Drama",
            director: [
              "Marcia Konopelski"
            ],
            starring: [],
            averageRating: 4.333333333333333,
            reviews: 3
          },
          {
            id: 6504,
            title: "Ultra Question Machine Accountant",
            releaseDate: "2002-05-27",
            genre: "Family",
            director: [
              "Lincoln Prosacco"
            ],
            starring: [
              "Marina Romaguera",
              "Lafayette Mills"
            ],
            averageRating: 4.666666666666667,
            reviews: 6
          },
          {
            id: 1057,
            title: "Beyonder Web Developer",
            releaseDate: "2016-01-16",
            genre: "Family",
            director: [
              "Javier Moore"
            ],
            starring: [],
            averageRating: 2,
            reviews: 1
          },
          {
            id: 8381,
            title: "Ultra Elongated Man Strange Actor",
            releaseDate: "2010-04-25",
            genre: "Family",
            director: [
              "Javier Moore"
            ],
            starring: [],
            averageRating: null,
            reviews: 0
          },
          {
            id: 506,
            title: "Bolt Interpreter",
            releaseDate: "2009-05-12",
            genre: "Family",
            director: [
              "Lina Vandervort"
            ],
            starring: [],
            averageRating: 3,
            reviews: 1
          },
          {
            id: 9004,
            title: "Red Redeemer Actor",
            releaseDate: "1998-01-14",
            genre: "Family",
            director: [
              "Keely Kreiger"
            ],
            starring: [],
            averageRating: 3.25,
            reviews: 4
            },
          {
            id: 7602,
            title: "Abomination Of Hearts Writer",
            releaseDate: "2012-03-07",
            genre: "Family",
            director: [
              "Angela Abernathy"
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
              title: "The Tempest Boy Philosopher",
              releaseDate: "2014-05-19",
              genre: "Crime",
              director: [
                "Marcia Konopelski"
              ],
              starring: [],
              averageRating: null,
              reviews: 0
            },
            {
              id: 1713,
              title: "Zatanna Advocate",
              releaseDate: "2008-05-06",
              genre: "Crime",
              director: [
                "Lucile Kuhlman"
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
              title: "Bolt Interpreter",
              releaseDate: "2009-05-12",
              genre: "Family",
              director: [
                "Lina Vandervort"
              ],
              starring: [],
              averageRating: 3,
              reviews: 1
            },
            {
              id: 9004,
              title: "Red Redeemer Actor",
              releaseDate: "1998-01-14",
              genre: "Family",
              director: [
                "Keely Kreiger"
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
});
