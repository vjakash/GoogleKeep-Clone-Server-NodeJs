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



// deleteNote route.
router.delete('/:id/:owner', [authenticate], async(req, res) => {
    let _id = req.params.id;
    let owner = req.params.owner;
    _id = ObjectId(_id);
    if (_id === undefined) {
        res.status(400).json({
            error: 'Fields missing'
        });
    } else {
        req.body.lastUpdatedOn = new Date();
        let client = await mongodb.connect(dbURL, { useUnifiedTopology: true }).catch(err => { throw err; });
        let db = client.db('googlekeep');
        await db.collection('notes').deleteOne({ _id }).catch(err => { throw err; });
        let data = await db.collection('notes').find({ owner }).toArray().catch(err => { throw err; });
        res.status(200).json({
            message: 'Note Deleted',
            notes: data
        });
    }
});

module.exports = router;