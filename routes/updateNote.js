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



// updateNote route.
router.put('/', [authenticate], async(req, res) => {
    let { _id, title, owner, note, lastUpdatedOn } = req.body;
    _id = ObjectId(_id);
    if (_id === undefined) {
        res.status(400).json({
            error: 'Fields missing'
        });
    } else {
        lastUpdatedOn = new Date();
        let client = await mongodb.connect(dbURL, { useUnifiedTopology: true }).catch(err => { throw err; });
        let db = client.db('googlekeep');
        await db.collection('notes').updateOne({ _id }, { $set: { title, note, owner, lastUpdatedOn } }).catch(err => { throw err; });
        let data = await db.collection('notes').find({ owner: req.body.owner }).toArray().catch(err => { throw err; });
        res.status(200).json({
            message: 'Note updated',
            notes: data
        });
    }
});

module.exports = router;