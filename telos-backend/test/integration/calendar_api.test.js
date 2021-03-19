const routes = require('../../src/routes');
const server = 0;

beforeAll(async done => {
    app = express();
    app.use('/', routes);
    server = app.listen(3001, () => done());
});

afterAll(done => {
    server.close(async () => {
        done();
    });
});

it('will update', () => {
    expect("wow").toBe("wow")
})
