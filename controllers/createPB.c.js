const userM = require('../models/user.m');
const passbookM = require('../models/passbook.m')
module.exports = {
     createPBGet: async (req, res) => {
        if(req.isUnauthenticated()){
            return res.redirect('/login');
        }
        const passbooks = await passbookM.getAll(req.user.customer_id)
        if(passbooks.length >= 10) {
            return res.redirect('/dashboard');
        }
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let today = year + "-" + month + "-" + date;
        const userInfo = await userM.getCustomerByUsername(req.user.username)
        res.render('createPassbook', {
            active: {dashboard: true},
            layout: "working",
            title: "Mở sổ",
            style: "form.css",
            script: "createPB.js",
            form: true,
            fullname: userInfo.customer_name,
            phonenumber: userInfo.phone_number,
            address: userInfo.customer_address,
            citizenID: userInfo.identity_number,
            date: today
        })
     },
     createPBPost: async (req, res) => {
        const userInfo = await userM.getCustomerByUsername(req.user.username)
        passbook = {
            type: req.body.type,
            bookname: req.body.bookname,
            deposit: req.body.deposit,
            date: req.body.date,
            customerID: userInfo.customer_id
        }
        await passbookM.addPB(passbook);
        res.send({msg: "succeed"})
     }
}