var express = require('express');
var router = express.Router();

//dotenv import
const dotenv = require('dotenv');
dotenv.config();

//mongodb imports
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
let dbURL = process.env.dbURL;

//bcrypt for hashing and comparing password
let bcrypt = require('bcrypt');

//jwt import
const jwt = require('jsonwebtoken');


let authenticate = require('../middlewares/authentication')

// getChecklist route.
router.get('/:owner', [authenticate], async(req, res) => {
    let owner = req.params.owner;
    console.log(owner);
    if (owner === "" || owner === undefined) {
        res.status(400).json({
            error: 'Fields missing'
        });
    } else {

        let client = await mongodb.connect(dbURL, { useUnifiedTopology: true }).catch(err => { throw err; });
        let db = client.db('googlekeep');
        let checklists = await db.collection('checklist').find({ owner }).toArray().catch(err => { throw err; });
        res.status(200).json({
            checklists
        });
    }
});

module.exports = router;