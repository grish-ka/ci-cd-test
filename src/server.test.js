const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('./server');

test('GET /status check', async () => {
  // Send a simulated GET request to our root route
  const response = await request(app).get('/status');

  // Assert 1: Did the server respond with HTTP 200 OK?
  assert.equal(response.statusCode, 200);

  // Assert 2: Is the response content-type JSON?
  assert.match(response.headers['content-type'], /json/);

  // Assert 3: Does the JSON body say "healthy"?
  assert.equal(response.body.status, 'healthy');
});
test('GET /add check', async () => {
  // Send a simulated GET request to our root route
  const response = await request(app).get('/add?x=5&y=3');

  // Assert 1: Did the server respond with HTTP 200 OK?
  assert.equal(response.statusCode, 200);

  // Assert 2: Is the response content-type JSON?
  assert.match(response.headers['content-type'], /json/);

  // Assert 3: Does the JSON body say "healthy"?
  assert.equal(response.body.result, 8);
});
test('GET /sub check', async () => {
  // Send a simulated GET request to our root route
  const response = await request(app).get('/sub?x=5&y=3');

  // Assert 1: Did the server respond with HTTP 200 OK?
  assert.equal(response.statusCode, 200);

  // Assert 2: Is the response content-type JSON?
  assert.match(response.headers['content-type'], /json/);

  // Assert 3: Does the JSON body say "healthy"?
  assert.equal(response.body.result, 2);
});