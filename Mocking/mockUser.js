
import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../constants/USER_ROLES.js";

const roles = Object.values(USER_ROLES);

export const generateMockUsers = (quantity = 1) => {
    return Array.from({ length: quantity }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(roles)
    }));
};

