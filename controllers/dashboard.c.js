const userM = require('../models/user.m');

module.exports = {
    dashboardGet: async (req, res) => {
        if(req.isUnauthenticated()){
            return res.redirect('/login');
        }
        const userInfo = await userM.getCustomerByUsername(req.user.username)
        console.log(userInfo)
        res.render('dashboard', {
            title: "dashboard",
            style: "dashboard.css",
            script: "#",
            username: req.user.username,
            email: userInfo.email
        })
    }
}