const userM = require('../models/user.m');

module.exports = {
     createPBGet: async (req, res) => {
        if(req.isUnauthenticated()){
            return res.redirect('/login');
        }
        const userInfo = await userM.getCustomerByUsername(req.user.username)
        // console.log(userInfo)
        res.render('createPassbook', {
            active: {dashboard: true},
            layout: "working",
            title: "Mở sổ",
            style: "form.css",
            fullname: userInfo.customer_name,
            phonenumber: userInfo.phone_number,
            address: userInfo.customer_address,
            citizenID: userInfo.identity_number,
        })
     }
}