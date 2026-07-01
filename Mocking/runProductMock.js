import { generateMockProduct } from './mockProduct.js';

const mock = generateMockProduct('seller123');
console.log(JSON.stringify(mock, null, 2));
