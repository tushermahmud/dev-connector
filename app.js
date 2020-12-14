const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 8080;
mongoose
    .connect("mongodb+srv://tusher:sazzadmahmud16301091@cluster0.jaavp.mongodb.net/contactlist?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        app.listen(PORT, (req,res)=>{
            console.log(`the server is running on ${PORT}`);
        })
    })
    .catch((e)=>{
        console.log(e);
    })
