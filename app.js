/** configuration with express */
const express =require('express');
const app = express();

/** configuration for api receive with cors */
const koneksi = require('cors');
app.use(koneksi());

/**configuration for body parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));// for post man test
app.use(bodyParser.json())

/**configuration for route */
const dashboard = require('./routes/api/dashboard');
// const detailproduct = require('./routes/api/detailproduct');
const login = require('./routes/api/login');
const product = require('./routes/api/product');

app.use('/api/dashboard/', dashboard)
// app.use('/api/', detailproduct)
app.use('/api/', login)
app.use('/api/', product)

/**database configuration */


// const passport = require('passport');
// app.use(passport.initialize()); //Passport middleware
// require('./config/passport')(passport)





/**configuration for port */
app.listen(8008, () => {
    console.log('Server Aktif di port 8008')
});
