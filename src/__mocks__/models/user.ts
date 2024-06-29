/* 
Model mock to avoid errors when testing
*/
const User = {
    create: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
    hasMany: jest.fn(),
};

export default User;
