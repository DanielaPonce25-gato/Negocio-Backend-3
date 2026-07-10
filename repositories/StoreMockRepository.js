
import { faker } from "@faker-js/faker";

export const generateMockStore = (ownerId, email) => {

    return {
        owner: ownerId,
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email,
        images: [],
        isActive: true
    };

};

export const generateMockStores = (users = []) => {
    return users.map(user =>
        generateMockStore(user._id, user.email)
    );
}

export default {
    generateMockStore,
    generateMockStores
};
