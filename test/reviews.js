const app = require('../index.js');

const expect = require('chai').expect,
      request = require('supertest')(app);

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Reviews API', function() {
  it('has param defaults', function(done) {
    request
      .get('/films/19/reviews')
      .expect('Content-Type', /json/)
      .expect(200, {
        reviews: [
          {
            id: 190,
            rating: 2,
            content: "Turns in a performance that is oblivious if not spectacular as the muddled reluctant guardian angel."
          },
          {
            id: 9705,
            rating: 5,
            content: "Constructs a character who is insignificant and at the same time boring as the silly bungling inventor."
          },
          {
            id: 24401,
            rating: 1,
            content: "Seems balmy and occasionally quixotic as the wanting invisible guardian angel."
          },
          {
            id: 25268,
            rating: 5,
            content: "Comes across as brassy and hysterical as the excellent heroic scientist."
          }
        ],
        meta: {
          limit: 10,
          offset: 0
        }
      }, done);
  });

  describe('ordering', function() {
    it('can change sort direction', function(done) {
      request
        .get('/films/19/reviews?sort=desc')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 25268,
              rating: 5,
              content: "Comes across as brassy and hysterical as the excellent heroic scientist."
            },
            {
              id: 24401,
              rating: 1,
              content: "Seems balmy and occasionally quixotic as the wanting invisible guardian angel."
            },
            {
              id: 9705,
              rating: 5,
              content: "Constructs a character who is insignificant and at the same time boring as the silly bungling inventor."
            },
            {
              id: 190,
              rating: 2,
              content: "Turns in a performance that is oblivious if not spectacular as the muddled reluctant guardian angel."
            }
          ],
          meta: {
            limit: 10,
            offset: 0
          }
        }, done);
    });

    it('can sort by best rating', function(done) {
      request
        .get('/films/19/reviews?sort=desc&orderBy=rating')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 9705,
              rating: 5,
              content: "Constructs a character who is insignificant and at the same time boring as the silly bungling inventor."
            },
            {
              id: 25268,
              rating: 5,
              content: "Comes across as brassy and hysterical as the excellent heroic scientist."
            },
            {
              id: 190,
              rating: 2,
              content: "Turns in a performance that is oblivious if not spectacular as the muddled reluctant guardian angel."
            },
            {
              id: 24401,
              rating: 1,
              content: "Seems balmy and occasionally quixotic as the wanting invisible guardian angel."
            }
          ],
          meta: {
            limit: 10,
            offset: 0
          }
        }, done);
    });
  })

  describe('pagination', function() {
    it('can limit results', function(done) {
      request
        .get('/films/19/reviews?orderBy=rating&sort=DESC&limit=2')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 9705,
              rating: 5,
              content: "Constructs a character who is insignificant and at the same time boring as the silly bungling inventor."
            },
            {
              id: 25268,
              rating: 5,
              content: "Comes across as brassy and hysterical as the excellent heroic scientist."
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
        .get('/films/19/reviews?orderBy=rating&sort=DESC&offset=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 25268,
              rating: 5,
              content: "Comes across as brassy and hysterical as the excellent heroic scientist."
            },
            {
              id: 190,
              rating: 2,
              content: "Turns in a performance that is oblivious if not spectacular as the muddled reluctant guardian angel."
            },
            {
              id: 24401,
              rating: 1,
              content: "Seems balmy and occasionally quixotic as the wanting invisible guardian angel."
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
        .get('/films/notarealroute')
        .expect(404)
        .end(done);
    });

    it('handles invalid id', function(done) {
      request
        .get('/films/notanid/reviews')
        .expect(422)
        .end(done);
    });

    it('handles invalid query params', function(done) {
      request
        .get('/films/19/reviews?orderBy=notacolumn&sort=notasort&offset=notanoffset&limit=notalimit')
        .expect(422)
        .end(done);
    });
  });
});
