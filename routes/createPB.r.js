const express = require('express');
const router = express.Router();
const createPBC = require('../controllers/createPB.c.js')

router.get('/', createPBC.createPBGet)

router.post('/', createPBC.createPBPost )

module.exports = router;