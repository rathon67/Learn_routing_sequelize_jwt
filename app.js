/**@task
 * //FORMAT OF TOKEN 
    buat routing
    buat config
    buat models
    pelajari sequelize.
 */

/** configuration with express (server)*/
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
const codeproduct = require('./routes/api/codeproduct');
const login = require('./routes/api/login');
const product = require('./routes/api/product');
const viewproduct = require('./routes/api/viewproduct');


app.use('/api/dashboard/', dashboard)
app.use('/api/', codeproduct)
app.use('/api/', login)
app.use('/api/', product)
app.use('/api/', viewproduct)


/**configuration for port */
app.listen(8008, () => {
    console.log('Server Aktif di port 8008')
});
