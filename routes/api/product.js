const express = require('express');
const router = express.Router();

const sequelize = require('../../config/database/db')
const product = require('../../models/Product');

/**configuration for JWT */
const jwt =require('jsonwebtoken');
const verifyToken= require ('../../config/verifyToken')
/**@route for product 
 * @desc Product CRUD
 */

//section tambah data
router.post('/tambahProd', verifyToken, (req,res)=>{
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
    
    /** update data with params as condition (where) */
    router.post('/editdata/:id', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err,authData)=>{
            if (err){
                return res.status(403).json({err: err});         
            }else{                
                var updateProduct = req.body.newProduct
                var id =req.params.id
                sequelize.sync().then(()=>{
                    product.update({
                        name : updateProduct
                    },
                    {
                        where: {
                            id_product: id
                        }
                    }).then((result)=>{
                        if(result){
                            res.status(200).json({ msg: `data has been updated which its id is ${id}`})
                        }
                    })
                })
            }
        })
    })
    
    
    
    /** delete section with params as condition (where) */
    router.get('/hapusdata/:id', verifyToken, (req,res) => {
        jwt.verify(req.token, 'secretkey', (err,authData)=>{
            if(err){
                return res.status(403).json({err: err});
            }else {                
                var id=req.params.id    
                sequelize.sync().then(()=>{
                    product.destroy({                    
                        where: {id_product : id}
                    }).then((result)=>{
                        if(result){
                            res.status(200).json({ msg: `data has been deleted which its id is ${id}` })
                        }
                    })
                })
            }
        })
       
    })

    module.exports = router;