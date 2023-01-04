const express = require('express');
const router = express.Router();
const passbookC = require('../controllers/passbook.c.js')

router.get('/', passbookC.passbookGet)

router.post('/', passbookC.passbookPost)

router.get('/details', passbookC.detailsGet)

router.post('/details', passbookC.detailsPost)

router.get('/create', passbookC.createGet)

router.post('/create', passbookC.createPost)

module.exports = router;