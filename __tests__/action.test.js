const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing action routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /actions/:id should return a prompt and two options by id', async () => {
    const res = await request(app).get('/actions/2');
    expect(res.body).toEqual({
      id: expect.any(String),
      prompt:
        'You are walking down the street when you notice a forested trail.',
      happy_choice:
        'This looks Exciting, so you take your Termagotchi on a walk through the forest.',
      neglect_choice:
        'There is no time for new adventures! Continue walking your normal route.',
      happy_path_id: 4,
      neglect_path_id: 5,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
