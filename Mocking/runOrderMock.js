import { generateMockProduct } from './mockProduct.js';
import { generateMockOrder } from './mockOrder.js';

const prod = generateMockProduct('seller123');
const productForOrder = {
    _id: 'prod_' + Math.random().toString(36).slice(2, 9),
    title: prod.title,
    images: prod.images,
    price: prod.price
};

const order = generateMockOrder('buyer123', 'store123', productForOrder);
console.log(JSON.stringify({ product: prod, order }, null, 2));
