const express = require('express');
const router = express.Router();

const sequelize = require('../../config/database/db')
const product = require('../../models/Product');

/**configuration for JWT */
const jwt =require('jsonwebtoken');

/**@route for product 
 * @desc Product CRUD
 */

//section tambah data
router.post('/tambahData', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            return res.status(403).json({err: err});    
        }else{
            var nameProd = req.body.productName
            sequelize.sync().then(()=>{
                product.create({
                    name: nameProd
                }).then((result)=>{
                    if(result){                    
                        res.status(200).json({msg: 'insert data success'})                    
                    }
                })   
            })         
        }
    })   
})
    
    //section edit data
    router.get('/editdata/:id', (req, res) => {
        jtw.verify(req.token, 'secretkey', (err,authData)=>{
            if (err){
                res.sendStatus(403);
        
            }else{
                var grabData= `SELECT * FROM tbl_product WHERE id_product = ${req.params.id}`;
                db.query(grabData, (err, result) => {
                    if(err){
                        throw err;
                    }else {
                        res.send(result);
                    }
                })
            }
        })
    })
        //  console.log(req.params.id);
    
    
    router.post('/updateProduct', (req,res)=>{
        jtw.verify(req.token, 'secretkey', (err,authData)=>{
            if (err){
                throw err;
            }else{
                var id = req.body.id;                
                var name =req.body.nameProd;
                var code =req.body.codeProd;
            
                var updateProduct =` UPDATE tbl_product SET  name="${name}", code="${code}" WHERE id_product="${id}"`;
                db.query(updateProduct, (err,result)=>{
                    if (err){
                        throw err;
                    }else{
                        res.send(`1`)
                    }
                })
            }
        })        
    })
    
    //delete section
    router.post('/hapusdata', (req,res) => {
        jtw.verify(req.token, 'secretkey', (err,authData)=>{
            if(err){
                throw err;
            }else {
                var id=req.body.id;    
                //  console.log(id)
                 var hapusData =`DELETE FROM product WHERE id_motor=?`;
                 db.query(hapusData,id, (err,hasil) =>{
                     if (err){
                         throw err;
                     }else{
                         res.send('data berhasil di hapus')
                     }
                 })
            }
        })
       
    })

    module.exports = router;