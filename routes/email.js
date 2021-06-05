const express = require('express');
const router = express.Router();
const emailController  = require('../controller/emailController');

router.post('/',emailController.sendEmail)
router.get('/verify/:email',emailController.addUser);

module.exports = router;