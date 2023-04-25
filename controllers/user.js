const User = require('../models/user');
const fs = require("fs");


exports.saveData = async (req, res, next) => {
    const data = JSON.parse(fs.readFileSync('./sample_data.json', 'utf-8'));

    User.create(data).then(result => {
        res.status(200).json({data: data});
    }).catch(err => console.log(err));
}

exports.getData = async (req, res, next) => {

    let limit = req.body.limit;
    let selectedPage = req.body.selectedPage;

    let filter  = [];

    if(req.body.filter){
        if (req.body.incomeLessThan !== '') {
            filter = [...filter, {
                income: {$lt: req.body.incomeLessThan}
            }]
        }

        if (req.body.carBrands.length !== 0) {
            filter = [...filter, {
                car: {$in: req.body.carBrands}
            }]
        }

        if (req.body.gender !== '') {
            filter = [...filter, {
                gender: req.body.gender,
            }]
        }

        if (req.body.phonePriceGreaterThan !== '') {
            filter = [...filter, {
                phone_price: {$gt: req.body.phonePriceGreaterThan}
            }]
        }

        if (req.body.lastNameStartWith !== '') {
            filter = [...filter, {
                last_name: {$regex: "^" + req.body.lastNameStartWith}
            }]
        }

        if (req.body.quoteLengthGreaterThan !== '') {
            filter = [...filter, {
                $expr: {$gt: [{$strLenCP: "$quote"}, Number(req.body.quoteLengthGreaterThan)]}
            }]
        }

        if (req.body.emailIncludeDigits !== 'False') {
            filter = [...filter, {
                email: {$regex: /^([^0-9]*)$/}
            }]
        }
    }

    if(filter.length!==0){
        filter = {
            $and: filter
        }
    }else {
        filter = {}
    }

    let pageCount = await User.find(
        req.body.filter ? filter : {}
    ).count();

    User
        .find(
            req.body.filter ? filter : {}
        )
        .skip((selectedPage - 1) * limit)
        .limit(limit).then(result => {

        res.status(200).json({result: result, pageCount: Math.ceil(pageCount / limit)});
    }).catch(err => console.log(err));
}

