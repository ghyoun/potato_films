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
            id: 7530,
            title: "Falcon Teacher",
            releaseDate: "1972-02-28",
            genre: "Action",
            director: [
              "Marcia Konopelski"
            ],
            starring: [
              "Brielle Koch"
            ],
            averageRating: null,
            reviews: 0
          },
          {
            id: 9066,
            title: "Heat Wave Ix Judge 2",
            releaseDate: "1968-06-23",
            genre: "Animation",
            director: [
              "Lucile Kuhlman"
            ],
            starring: [],
            averageRating: 1,
            reviews: 1
          },
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
            id: 9710,
            title: "Sentry Doctor",
            releaseDate: "1980-11-25",
            genre: "Crime",
            director: [
              "Lucile Kuhlman"
            ],
            starring: [
              "Orie Mueller",
              "Dell Thompson"
            ],
            averageRating: 3.25,
            reviews: 8
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
            id: 401,
            title: "Supah Morph Teacher",
            releaseDate: "1994-08-10",
            genre: "Family",
            director: [
              "Helene Dicki"
            ],
            starring: [],
            averageRating: 2,
            reviews: 2
          },
          {
            id: 3474,
            title: "Quantum Doctor",
            releaseDate: "1987-02-14",
            genre: "Family",
            director: [
              "Delia Bartoletti"
            ],
            starring: [
              "Tyshawn Yost"
            ],
            averageRating: 3,
            reviews: 2
          },
          {
            id: 9037,
            title: "Green Vulture Brain Human Resources",
            releaseDate: "1966-12-26",
            genre: "Family",
            director: [
              "Amari Green"
            ],
            starring: [],
            averageRating: 2.5,
            reviews: 2
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
              id: 7530,
              title: "Falcon Teacher",
              releaseDate: "1972-02-28",
              genre: "Action",
              director: [
                "Marcia Konopelski"
              ],
              starring: [
                "Brielle Koch"
              ],
              averageRating: null,
              reviews: 0
            },
            {
              id: 9066,
              title: "Heat Wave Ix Judge 2",
              releaseDate: "1968-06-23",
              genre: "Animation",
              director: [
                "Lucile Kuhlman"
              ],
              starring: [],
              averageRating: 1,
              reviews: 1
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
              id: 401,
              title: "Supah Morph Teacher",
              releaseDate: "1994-08-10",
              genre: "Family",
              director: [
                "Helene Dicki"
              ],
              starring: [],
              averageRating: 2,
              reviews: 2
            },
            {
              id: 3474,
              title: "Quantum Doctor",
              releaseDate: "1987-02-14",
              genre: "Family",
              director: [
                "Delia Bartoletti"
              ],
              starring: [
                "Tyshawn Yost"
              ],
              averageRating: 3,
              reviews: 2
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
