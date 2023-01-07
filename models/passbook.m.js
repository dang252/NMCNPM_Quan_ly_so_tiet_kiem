const db = require('../config/connectDB')

module.exports = {
    addPB: async passbook => {
        maxPassbookID = await db.query('select max(passbook_id) from passbook')
        if (maxPassbookID[0].max===null) maxPassbookID[0].max=0;
        await db.one('insert into passbook(passbook_id, passbook_type, passbook_name, passbook_deposits, passbook_date, customer_id) values ($1, $2, $3, $4, $5, $6) returning *',
        [maxPassbookID[0].max+1, passbook.type, passbook.bookname.replace(/^\s+|\s+$/gm,''), passbook.deposit.replace(/^\s+|\s+$/gm,''), passbook.date, passbook.customerID])
    },
    getAll: async customerID => {
        const rs = await db.any('select * from passbook where customer_id = $1 order by passbook_id asc', [customerID])
        return rs;
    },
    getByID: async passbookID => {
        const rs = await db.oneOrNone('select *from passbook where passbook_id = $1', [passbookID])
        return rs;
    },
    getExpdate3M: async passbookID => {
        const rs = await db.oneOrNone('select passbook_name + 30*3 from passbook where passbook_id = $1', [passbookID])
        return rs;
    },
    getExpdate6M: async passbookID => {
        const rs = await db.oneOrNone('select passbook_date + 30*6 as expdate from passbook where passbook_id = $1', [passbookID])
        return rs;
    },
    depositMoney: async data => {
        await db.one('update passbook set passbook_deposits = passbook_deposits + $1 where passbook_id = $2 returning *',
        [data.depositAmount, data.passbookID])
        maxDepositID = await db.query('select max(depslip_id) from deposit_slip')
        if (maxDepositID[0].max===null) maxDepositID[0].max=0;
        await db.one('insert into deposit_slip (depslip_id, customer_id, passbook_id, depositdate, depslip_amount) values ($1, $2, $3, current_date, $4) returning *', 
        [maxDepositID[0].max+1, data.customerID, data.passbookID, data.depositAmount])
    },
    getDepositThisMonth: async customerID => {
        const rs = await db.any('select depslip_amount, passbook_name from deposit_slip d, passbook pb where d.customer_id = $1 and extract(year from d.depositdate) = extract (year from current_date) and extract(month from d.depositdate) = extract (month from current_date) and pb.passbook_id = d.passbook_id order by depslip_id desc',
        [customerID])
        return rs;
    }

}