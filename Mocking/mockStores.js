import { generateMockUsers } from "./mockUser.js";

export const generateMockStore = (sellerId) => {
    const owner = generateMockUsers(1)[0];

    return {
        _id: `mock-store-${sellerId}`,
        name: `Store ${sellerId}`,
        description: `Tienda creada para ${sellerId}`,
        address: `Dirección ${sellerId}`,
        phone: "+52 555 000 0000",
        email: `${sellerId}@mail.com`,
        image: "",
        owner,
        seller: sellerId,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };
};

