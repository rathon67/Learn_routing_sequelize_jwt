const express =require('express');
const app = express();
const koneksi = require('cors');
app.use(koneksi());

const bodyParser = require('body-parser');
var url = bodyParser.urlencoded({extended: false}); //for ejs
app.use(bodyParser.urlencoded({extended: false}));// for post man test
app.use(bodyParser.json())

const jtw =require('jsonwebtoken');

const mysql = require('mysql');
const db =mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'db_test_meteor',
    multipleStatements: true
});
db.connect();


app.post('/login', (req,res)=>{    

    const userlogin = [
    {
        id : 'userid01',
        username : 'rathon',
        password : 'asdf1234'
    },
    {
        id : 'userid02',
        username : 'udin',
        password : 'mantap1234'
    }
]
    
    
    var username =req.body.username;
    console.log(username)
    var userpassword=req.body.password;
    console.log(userpassword)
    for(var i = 0; i<userlogin.length; i++){
        if(username === userlogin[i].username && userpassword === userlogin[i].password){
           console.log('berhasil masuk')
        //    var userID= userlogin[i].id_admin;
        //           res.send(username);
                jtw.sign({userlogin}, 'secretkey', {expiredIn: '60s'}, (err, token)=>{
                   res.json({
                        token
                        })
                    });    
                  break;  
        } else if ( i === userlogin.length-1){
            console.log('gagal masuk')
        }
    }
})
//FORMAT OF TOKEN
//Autorization : Bearer <access_token>
function verifyToken(req,res, next){
    //get auth header value
    const bearerHeader=req.headers['authorization'];
    // check if bearear is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from  array
        const bearearToken = bearer[1];
        //set the token
        req.token = bearearToken;
        //next middleware
         next();
    }else{
        //forbiden 
        res.sendStatus(403);
    }
}

//menampikan list product
app.get('/listproduct', (req,res)=>{
    const getDataProduct = `SELECT tbl_product.id_product, tbl_product.name, tbl_product.code, master_category.name as category FROM tbl_product JOIN master_category ON tbl_product.id_kategori = master_category.id_category`;
    db.query(getDataProduct, (err,result)=>{
        if (err){
            throw err;
        }else {
            res.send(result)
        }
    })
})

//section tambah data
app.post('/tambahData', verifyToken, (req,res)=>{
jtw.verify(req.token, 'secretkey', (err,authData)=>{
    if (err){
        res.sendStatus(403);

    }else{
        res.json({
            authData
        })
        var nameProd =req.body.nameProd;
        var codeProd =req.body.codeProd;
        var cateProd =req.body.cateProd;

        let sql = `INSERT INTO tbl_product VALUES ("${''}","${cateProd}","${nameProd}","${codeProd}")`;
        db.query(sql, (err,result)=>{
            if (err){
                throw err;
            }else{
                // res.send('1')
            }
        })
        
    }
})
    
})

//section edit data
app.get('/editdata/:id', (req, res) => {
    
    //  console.log(req.params.id);
    var grabData= `SELECT * FROM tbl_product WHERE id_product = ${req.params.id}`;
    db.query(grabData, (err, result) => {
        if(err){
            throw err;
        }else {
            res.send(result);
        }
    })
 });

app.post('/updateProduct', (req,res)=>{
    var id = req.body.id;
    var category =req.body.cateProd
    var name =req.body.nameProd
    var code =req.body.codeProd

    var updateProduct =` UPDATE tbl_product SET id_kategori="${category}", name="${name}", code="${code}" WHERE id_product="${id}"`;
    db.query(updateProduct, (err,result)=>{
        if (err){
            throw err;
        }else{
            res.send(`1`)
        }
    })
})

//delete section
app.post('/hapusdata', (req,res) => {
    var id=req.body.id;

   //  console.log(id)
    var hapusData =`DELETE FROM product WHERE id_motor=?`;
    db.query(hapusData,id, (err,hasil) =>{
        if (err){
            throw err;
        }else{
            res.send('1')
        }
    })
})

app.listen(8008, () => {
    console.log('Server Aktif di port 8008')
});
