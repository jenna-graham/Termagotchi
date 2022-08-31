const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  username: 'Cupcake',
  password: '123456',
};

describe('testing user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
 
  it('POST /users should create new user', async () => {
    const res = await request(app).post('/users').send(mockUser);
    const { username } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      username,
    });
  });

  it('POST /users/sessions should login an existing user', async () => {
    const agent = request.agent(app);
    const res = await agent.post('/users/sessions').send({
      username: 'Cupcake',
      password: '123456',
    });
    console.log(res.body);
    expect(res.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
