const express = require('express');
const router = express.Router();

const sequelize = require('../../config/database/db')
const model1 = require('../../models/relation/relation');


/**configuration for JWT */
const jwt =require('jsonwebtoken');
const verifyToken= require ('../../config/verifyToken')
/**@route for product 
 * @desc Product CRUD
 */

//section tambah data
router.post('/tambahdataView', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            return res.status(403).json({err: err});    
        }else{
            var productID =req.body.productID;
            var categoryID = req.body.categoryID;
            
            sequelize.sync().then(()=>{
                model1.viewproductModel.create({
                    product_id : productID,
                    category_id : categoryID
                }).then((result)=>{
                    if(result){                    
                        res.status(200).json({msg: 'insert data success'})                    
                    }
                })   
            })         
        }
    })   
})



router.get('/lihatdataView', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            return res.status(403).json({err: err});    
        }else{            
            sequelize.sync().then(()=>{                
                
                model1.productModel.findAll({
                    include:[
                        {
                            model:model1.categoryModel
                        },
                        {
                            model:model1.codeproductModel
                        }
                        
                    ]
                }).then(function(result) {                    
                    res.status(200).json(result); 
                }) 
            })         
        }
    })   
})
   
module.exports = router;