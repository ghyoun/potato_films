const app = require('../index.js');

const expect = require('chai').expect,
      request = require('supertest')(app);

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Reviews API', function() {
  it('has param defaults', function(done) {
    request
      .get('/films/6/reviews')
      .expect('Content-Type', /json/)
      .expect(200, {
        reviews: [
          {
            id: 3076,
            rating: 1,
            content: "Turns in a performance that is insolent while managing to stay squeamish as the flowery evil genius."
          },
          {
            id: 16047,
            rating: 3,
            content: "Appears indifferent if not overwrought as the lucky monster clown."
          },
          {
            id: 18229,
            rating: 5,
            content: "Looks perpetually prosaic and at the same time wacky as the moldy chosen one."
          }
        ],
        meta: {
          total: 3,
          limit: 10,
          offset: 0
        }
      }, done);
  });

  describe('ordering', function() {
    it('can change sort direction', function(done) {
      request
        .get('/films/16/reviews?sort=desc')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 19529,
              rating: 1,
              content: "Looks perpetually ill-defined and smelly as the trashy toadie."
            },
            {
              id: 17151,
              rating: 5,
              content: "Seems diminutive if not loving as the godly snoop."
            },
            {
              id: 12293,
              rating: 4,
              content: "Turns in a performance that is craven but frail as the pointless technical pacifist."
            },
            {
              id: 8431,
              rating: 1,
              content: "Turns in a performance that is feeble yet somehow short as the acrid reluctant guardian angel."
            }
          ],
          meta: {
            total: 4,
            limit: 10,
            offset: 0
          }
        }, done);
    });

    it('can sort by best rating', function(done) {
      request
        .get('/films/6/reviews?sort=desc&order_by=rating')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 18229,
              rating: 5,
              content: "Looks perpetually prosaic and at the same time wacky as the moldy chosen one."
            },
            {
              id: 16047,
              rating: 3,
              content: "Appears indifferent if not overwrought as the lucky monster clown."
            },
            {
              id: 3076,
              rating: 1,
              content: "Turns in a performance that is insolent while managing to stay squeamish as the flowery evil genius."
            }
          ],
          meta: {
            total: 3,
            limit: 10,
            offset: 0
          }
        }, done);
    });
  })

  describe('pagination', function() {
    it('can limit results', function(done) {
      request
        .get('/films/16/reviews?order_by=rating&sort=DESC&limit=2')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 17151,
              rating: 5,
              content: "Seems diminutive if not loving as the godly snoop."
            },
            {
              id: 12293,
              rating: 4,
              content: "Turns in a performance that is craven but frail as the pointless technical pacifist."
            }
          ],
          meta: {
            total: 4,
            limit: 2,
            offset: 0
          }
        }, done);
    });

    it('can offset results', function(done) {
      request
        .get('/films/16/reviews?order_by=rating&sort=DESC&offset=1')
        .expect('Content-Type', /json/)
        .expect(200, {
          reviews: [
            {
              id: 12293,
              rating: 4,
              content: "Turns in a performance that is craven but frail as the pointless technical pacifist."
            },
            {
              id: 8431,
              rating: 1,
              content: "Turns in a performance that is feeble yet somehow short as the acrid reluctant guardian angel."
            },
            {
              id: 19529,
              rating: 1,
              content: "Looks perpetually ill-defined and smelly as the trashy toadie."
            }
          ],
          meta: {
            total: 4,
            limit: 10,
            offset: 1
          }
        }, done);
    });
  });
});
