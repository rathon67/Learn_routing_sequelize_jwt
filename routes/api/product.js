const express = require('express');
const router = express.Router();
// const db = require('../../config/database');

/**configuration for JWT */
const jwt =require('jsonwebtoken');

/**@route for product 
 * @desc Product CRUD
 */

//section tambah data
router.post('/tambahData', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            res.sendStatus(403);
    
        }else{
            res.json({
                authData
            })
            // var nameProd =req.body.nameProd;
            // var codeProd =req.body.codeProd;                
            // let sql = `INSERT INTO tbl_product VALUES ("${''}","${nameProd}","${codeProd}")`;
            // db.query(sql, (err,result)=>{
            //     if (err){
            //         throw err;
            //     }else{
            //         res.send('data berhasil di input')
            //     }
            // })
            
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