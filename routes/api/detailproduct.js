const express = require('express');
const router = express.Router();
const db = require('../../config/database');

/**configuration for JWT */
const jwt =require('jsonwebtoken');

/**@route for detailproduct 
 * @desc Get detail product from join data
 *
 */

router.get('/listproduct', (req,res)=>{
    jtw.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            res.sendStatus(403);
    
        }else   {
                const getDataJoin = `SELECT tbl_product.id_product, tbl_product.name, tbl_product.code, 
                master_category.name as category FROM tbl_product JOIN master_category ON tbl_product.id_kategori 
                = master_category.id_category`;
                db.query(getDataJoin, (err,result)=>{
                    if (err){
                        throw err;
                    }else {
                        res.send(result)
                    }
                })
            }
        })
    })

module.exports = router;