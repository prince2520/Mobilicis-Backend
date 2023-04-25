const express = require('express');


const {saveData, getData} = require("../controllers/user");

const router = express.Router();

router.get('/save-data', saveData);

router.post('/get-data', getData);

module.exports = router;