const userM = require('../models/user.m');
const passbookM = require('../models/passbook.m')

function countSumary(passbooks) {
    let rs = 0;
    for(let i = 0; i < passbooks.length; i++) {
        rs += passbooks[i].passbook_deposits;
    }
    return rs;
} 

module.exports = {
    dashboardGet: async (req, res) => {
        if(req.isUnauthenticated()){
            return res.redirect('/login');
        }
        const userInfo = await userM.getCustomerByUsername(req.user.username)
        const passbooks = await passbookM.getAll(req.user.customer_id)
        if(passbooks.length < 10) createable = true
        else createable = false
        res.render('dashboard', {
            active: {dashboard: true},
            layout: "working",
            title: "Dashboard",
            style: "dashboard.css",
            script: "dashboard.js",
            summary: countSumary(passbooks),
            createable: createable,
            passbooks: passbooks,
            username: req.user.username,
            email: userInfo.email
        })
    }
}