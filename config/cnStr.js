module.exports = {
    host: 'localhost',
    port: 5432,
    database: 'PASSBOOK',
    user: 'postgres',
    password: '123',
    max: 30 // use up to 30 connections
};

// module.exports = {
//     user: 'sa',
//     password: 'RPSsql12345',
//     server: 'localhost',
//     database: 'PASSBOOK_MANAGEMENT',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     }
// }
