const db = require('../config/connectDB')

module.exports = {
    addPB: async passbook => {
        maxPassbookID = await db.query('select max(passbook_id) from passbook')
        if (maxPassbookID[0].max===null) maxPassbookID[0].max=0;
        await db.one('insert into passbook(passbook_id, passbook_type, passbook_name, passbook_deposits, passbook_date, customer_id) values ($1, $2, $3, $4, $5, $6) returning *',
        [maxPassbookID[0].max+1, passbook.type, passbook.bookname.replace(/^\s+|\s+$/gm,''), passbook.deposit.replace(/^\s+|\s+$/gm,''), passbook.date, passbook.customerID])
    },
    getAll: async customerID => {
        const rs = await db.any('select * from passbook where customer_id = $1', [customerID])
        return rs;
    }
}