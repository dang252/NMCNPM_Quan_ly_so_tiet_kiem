// const sql = require('mssql');
const pg = require('pg-promise')();

const cnStr = require('../config/cnStr');

const db = pg(cnStr)

module.exports = {
    add: async user =>{
        console.log(user)
        maxCustomerId = await db.query('select max(customer_id) from customer')
        if (maxCustomerId[0].max == null) maxCustomerId[0].max=0;
        // console.log(maxCustomerId[0].max)
        maxAccountId = await db.query('select max(account_id) from account')
        if (maxAccountId[0].max===null) maxAccountId[0].max=0;
        // console.log(maxAccountId[0].max)
        await db.one('insert into customer (customer_id, customer_name, phone_number, email) values ($1, $2, $3, $4) returning *',
        [maxCustomerId[0].max + 1, user.fullname, user.phonenumber, user.email])
        await db.one('insert into account (account_id, account_type, username, encrypt_password, customer_id) values ($1, $2, $3, $4, $5) returning *',
        [maxAccountId[0].max + 1, "CUST", user.username, user.password, maxCustomerId[0].max + 1])
    },
    getAccountByUsername: async username=>{
        var rs = await db.oneOrNone('select * from account where username=$1', [username])
        return rs;
    },
    getCustomerByUsername: async username=>{
        var rs = await db.oneOrNone('select * from customer where customer.customer_id = (select customer_id from account where account.username = $1)', 
        [username])
        return rs;
    },
    getCustomerByEmail: async email=>{
        var rs = await db.oneOrNone('select * from customer where email=$1', [email])
        // console.log(rs)
        return rs;
    },
    getCustomerByPhonenumber: async phonenumber=>{
        var rs = await db.oneOrNone('select * from customer where phone_number=$1', [phonenumber])
        // console.log(rs)
        return rs;
    }
}