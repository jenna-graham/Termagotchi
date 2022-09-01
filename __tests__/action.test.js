const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing action routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /actions/:id should return a prompt and two options by id', async () => {
    const res = await request(app).get('/actions/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      prompt: 'Your Termagotchi is home with you and looks bored',
      happy_choice:
        'Take your Termagotchi outside and watch the adventure unfold.',
      neglect_choice:
        'Walk to the living room and turn on the TV. You are tired and have no time to play.',
      happy_path_id: 2,
      neglect_path_id: 3,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
