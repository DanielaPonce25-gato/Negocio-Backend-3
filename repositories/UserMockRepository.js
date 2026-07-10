
import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../constants/USER_ROLES.js";

const roles = Object.values(USER_ROLES);

/**
 * Repository - Generador de datos mock para usuarios
 * Esta capa maneja la generación de datos ficticios
 */
export const generateMockUser = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        addresses: [
            {
                label: faker.helpers.arrayElement(["home", "work"]),
                address: faker.location.streetAddress(),
                reference: faker.location.secondaryAddress()
            }
        ],
        role: faker.helpers.arrayElement(roles)
    };
};

export const generateMockUsers = (quantity = 1) => {
    return Array.from({ length: quantity }, () => generateMockUser());
};

export default {
    generateMockUser,
    generateMockUsers
};
