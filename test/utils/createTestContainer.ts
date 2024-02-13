import { asValue, AwilixContainer } from 'awilix';
import bootstrap from '../../src/app/bootstrap';

// const mockAxios: MockAdapter = new MockAdapter(axios);
//
// beforeEach(() => {
//     mockAxios.reset();
// });

export default function configureTestContainer(): AwilixContainer {
    const container = bootstrap();

    container.register({
        // setup current user for test env
        currentUser: asValue<Partial<any>>({
            userId: '45645646',
        }),
    });

    return container;
}
