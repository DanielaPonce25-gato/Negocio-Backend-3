import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../constants/USER_ROLES.js";
import { DOCUMENT_TYPES } from"../constants/DOCUMENT_TYPES.js";

const roles = Object.values(USER_ROLES);

const documento = Object.values(DOCUMENT_TYPES)

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
        role: faker.helpers.arrayElement(roles),

        images: [
            `http://localhost:8000/uploads/${faker.system.fileName()}`
        ],

        documents: [
            {
                originalName: faker.system.fileName(),
                fileName: faker.system.fileName(),
                path: `uploads/${faker.system.fileName()}`,
                mimeType: "application/pdf",
                size: String(faker.number.int({ min: 1000, max: 1000000 })),
                type: faker.helpers.arrayElement(documento)
            }
        ]
    };
};

export const generateMockUsers = (quantity = 1) => {
    return Array.from({ length: quantity }, () => generateMockUser());
};

export default {
    generateMockUser,
    generateMockUsers
};