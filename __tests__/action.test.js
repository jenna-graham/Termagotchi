const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('testing action routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
it('GET /actions/:id should return a prompt and two options by id', async () => {
    const res = await request(app).get('/actions/1')
    expect(res.body).toEqual({
        id: expect.any(String),
        prompt:'Congratulations on your new pet! You will want to take care of them so they will love you back (neglected pets never stay too long)',
        happy_choice: 'smile and say hello',
        neglect_choice: 'go about your busy life',
        happy_path_id: 2,
        neglect_path_id: 3,
        is_good: null,
    })
});


    afterAll(() => {
        pool.end();
      });
    });