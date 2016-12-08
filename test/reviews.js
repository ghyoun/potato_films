const app = require('../index.js');

const expect = require('chai').expect,
      request = require('supertest')(app);

function ok(expression, message) {
  if (!expression) throw new Error(message);
}

describe('Reviews API', function() {
  it('returns status 200', function(done) {
    request
      .get('/films/1/reviews')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns Content-Type JSON', function(done) {
    request
      .get('/films/1/reviews')
      .expect('Content-Type', /json/, done);
  });

  describe('contract', function() {
    describe('data', function() {
      it('key exists', function(done) {
        request
          .get('/films/1/reviews')
          .expect(function(res) {
            ok('data' in res.body, 'Data key missing in response body');
          }).end(done);
      });

      it('is an array', function(done) {
        request
          .get('/films/1/reviews')
          .expect(function(res) {
            ok(Array.isArray(res.body.data), 'Data is not an array');
          }).end(done);
      });

      describe('review object', function() {
        it('has id', function(done) {
          request
            .get('/films/1/reviews')
            .expect(function(res) {
              ok('id' in res.body.data[0], '"id" key missing');
              ok(typeof res.body.data[0].id === 'number', '"id" is wrong type');
            }).end(done);
        });

        it('has rating', function(done) {
          request
            .get('/films/1/reviews')
            .expect(function(res) {
              ok('rating' in res.body.data[0], '"rating" key missing');
              ok(typeof res.body.data[0].rating === 'number', '"rating" is wrong type');
            }).end(done);
        });

        it('has content', function(done) {
          request
            .get('/films/1/reviews')
            .expect(function(res) {
              ok('content' in res.body.data[0], '"content" key missing');
              ok(typeof res.body.data[0].content === 'string', '"content" is wrong type');
            }).end(done);
        });
      });
    })

    describe('meta', function() {
      it('key exists', function(done) {
        request
          .get('/films/1/reviews')
          .expect(function(res) {
            ok('meta' in res.body, 'Meta key missing in response body');
          }).end(done);
      });

      it('has limit', function(done) {
        request
          .get('/films/1/reviews')
          .expect(function(res) {
            ok('limit' in res.body.meta, '"limit" key missing');
            ok(typeof res.body.meta.limit === 'number', '"limit" is wrong type');
          }).end(done);
      });

      it('has offset', function(done) {
        request
          .get('/films/1/reviews')
          .expect(function(res) {
            ok('offset' in res.body.meta, '"offset" key missing');
            ok(typeof res.body.meta.offset === 'number', '"offset" is wrong type');
          }).end(done);
      });
    });
  });
});
