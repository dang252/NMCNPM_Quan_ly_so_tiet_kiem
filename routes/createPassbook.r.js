const express = require('express');
const router = express.Router();
const createPBC = require('../controllers/createPassbook.c.js')

router.get('/', createPBC.createPBGet)

// router.post('/', profileC.profilePost )

module.exports = router;