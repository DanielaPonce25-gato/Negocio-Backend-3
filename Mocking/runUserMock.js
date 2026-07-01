import { generateMockUsers } from './mockUser.js';

const users = generateMockUsers(5);
console.log(JSON.stringify(users, null, 2));
