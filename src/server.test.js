const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('./server');

test('GET / should return status 200 and a healthy status message', async () => {
  // Send a simulated GET request to our root route
  const response = await request(app).get('/');

  // Assert 1: Did the server respond with HTTP 200 OK?
  assert.equal(response.statusCode, 200);

  // Assert 2: Is the response content-type JSON?
  assert.match(response.headers['content-type'], /json/);

  // Assert 3: Does the JSON body say "healthy"?
  assert.equal(response.body.status, 'healthy');
});