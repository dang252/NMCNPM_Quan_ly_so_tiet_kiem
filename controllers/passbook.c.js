const userM = require('../models/user.m');
const passbookM = require('../models/passbook.m');

function getDate(date_obj) {
    let day = ("0" + date_obj.getDate()).slice(-2);
    let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
    let year = date_obj.getFullYear();
    let date = year + "-" + month + "-" + day;
    return date;
}
module.exports = {
    passbookGet: (req, res) => {
        res.send("ok")
    },
    passbookPost: (req,res) => {
        res.send("ok")
    },
    detailsGet: (req,res) => {
        res.redirect('/dashboard')
    },
    
    detailsPost: async (req, res) => {
        passbookID = req.body.passbookID
        const passbookInfo = await passbookM.getByID(passbookID);
        if(!passbookInfo) res.redirect('/dashboard')
        //nếu sổ đang được truy suất không phải của tài khoản hiện tại thì quay về dashboard
        if (!req.user || req.user.customer_id != passbookInfo.customer_id)
            res.redirect('/dashboard')
        let today_obj = new Date();
        let today = getDate(today_obj);
        if(passbookInfo.passbook_type == "NO") {
            passbookType = "Không kỳ hạn";
            depositable = true;
            withdrawable = true;
            expdate = false;
        }
        else {
            if (passbookInfo.passbook_type == "3M") {
                passbookType = "Kỳ hạn 3 tháng";
                expdate_obj = await passbookM.getExpdate3M(passbookID)
            }
            else {
                passbookType = "Kỳ hạn 6 tháng";
                expdate_obj = await passbookM.getExpdate6M(passbookID)
            }
            expdate = getDate(expdate_obj.expdate)
            depositable = false;
            if (expdate == today) {
                withdrawable = true;
            }
            else withdrawable = false;
        }     
        res.render('passbookDetails', {
            active: {passbook: true},
            layout: "working",
            title: "Thông tin sổ",
            style: "form.css",
            script: "createPB.js",
            bookname: passbookInfo.passbook_name,
            type: passbookType,
            deposit: passbookInfo.passbook_deposits,
            date: getDate(passbookInfo.passbook_date),
            expdate: expdate,
            depositable: depositable,
            withdrawable: withdrawable
        })
    },
    createGet: async (req, res) => {
        if(req.isUnauthenticated()){
            return res.redirect('/login');
        }
        const passbooks = await passbookM.getAll(req.user.customer_id)
        if(passbooks.length >= 10) {
            return res.redirect('/dashboard');
        }
        let today_obj = new Date();
        let today = getDate(today_obj);
        const userInfo = await userM.getCustomerByUsername(req.user.username)
        res.render('createPassbook', {
            active: {passbook: true},
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
    createPost: async (req, res) => {
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