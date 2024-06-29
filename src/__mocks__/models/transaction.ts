/* 
Model mock to avoid errors when testing
*/
const Transaction = {
    create: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
};

export default Transaction;
