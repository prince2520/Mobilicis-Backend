const express = require('express');
const app = express()
const index = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const userRoute = require('./router/user');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/user', userRoute);

app.use('/', (req, res, next) => {
    res.status(200).json({message: 'Server is Working...'});
    next();
})

const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_ID}:${process.env.MONGOOSE_PASSWORD}@cluster0.uswecfa.mongodb.net/mobilicisIndia?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB')
    console.log('Connected to index!')
    index.listen(PORT);
})