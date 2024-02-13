import createTestServer, {IServerTest} from "../../../../../../../test/utils/createTestServer";


describe('Given common routes', () => {
    let serverTest: IServerTest;
    beforeEach(async () => {
        serverTest = await createTestServer();
    });

    describe('GET /api/example', () => {
        test('should return example', async () => {
            const req = await serverTest.request
                .get('/api/v1/example')
                .expect(200)
                .expect('Content-Type', /json/);

            const roles = req.body;
            expect(roles).toMatchSnapshot();
        });
    });
});
