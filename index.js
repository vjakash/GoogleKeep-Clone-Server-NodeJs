let express = require('express');
let cors = require('cors');
let bcrypt = require('bcrypt');
let bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
let dbURL = process.env.dbURL;


const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
let mailOptions = {
    from: process.env.EMAIL,
    to: '',
    subject: 'Sending Email using Node.js',
    html: `<h1>Hi from node</h1><p> Messsage</p>`
};

//appinitialize
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening in port-${port}`)
});

//middleware
app.use(cors());
app.use(bodyParser.json());
//routes imports
let login = require('./routes/login.js');
let register = require('./routes/register.js');
let forgotpassword = require('./routes/forgotpassword.js');
let resetpassword = require('./routes/resetpassword.js');
let addNotes = require('./routes/addNotes.js');
let addChecklist = require('./routes/addChecklist.js');
let getNotes = require('./routes/getNotes.js');
let getChecklist = require('./routes/getChecklist.js');
let updateNote = require('./routes/updateNote.js');
let updateChecklist = require('./routes/updateChecklist.js');
let deleteNote = require('./routes/deleteNote.js');
let deleteChecklist = require('./routes/deleteChecklist.js');

//routes
app.use('/login', login);
app.use('/register', register);
app.use('/forgotpassword', forgotpassword);
app.use('/resetpassword', resetpassword);
app.use('/addNotes', addNotes);
app.use('/addChecklist', addChecklist);
app.use('/getNotes', getNotes);
app.use('/getChecklist', getChecklist);
app.use('/updateNote', updateNote);
app.use('/updateChecklist', updateChecklist);
app.use('/deleteNote', deleteNote);
app.use('/deleteChecklist', deleteChecklist);