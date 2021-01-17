const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute')
const postRoute = require("./routes/postRoute");

const app = express();

//app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
//app middlewares

//app routers
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/post', postRoute)
app.get('/', (req, res) => {
        res.send("welcome to my kingdom");
    })
    //app routers



const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://tusher:sazzadmahmud16301091@cluster0-jaavp.mongodb.net/fullstack?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`server is running on port ${PORT}`)
        })
    })
    .catch((e) => {
        console.log(e)
    })