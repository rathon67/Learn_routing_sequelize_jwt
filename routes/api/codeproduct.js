const express = require('express');
const router = express.Router();

const sequelize = require('../../config/database/db')
const codeproduct = require('../../models/Codeproduct');

/**configuration for JWT */
const jwt =require('jsonwebtoken');
const verifyToken= require ('../../config/verifyToken')

/**@route code product api
 * @desc code product 
 *
 */
/** section adding data product code */
router.post('/tambahcodeP', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            return res.status(403).json({err: err});    
        }else{
            var idProd = req.body.productID;
            var codeProd = req.body.codeProd;
            sequelize.sync().then(()=>{
                codeproduct.create({
                    product_id : idProd,
                    code_product : codeProd
                }).then((result)=>{
                    if(result){                     
                        res.status(200).json({msg: 'insert data success'})                    
                    }
                })   
            })         
        }
    })   
})

/**section update product code with params */
router.post('/updatedataCode/:id', verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            return res.status(403).json({err:err});
        }else{
            var updateProductID =req.body.productID
            var updateProductCode = req.body.codeProduct;
            var id = req.params.id;
            sequelize.sync().then(()=>{
                codeproduct.update({
                    product_id : updateProductID,
                    code_product : updateProductCode
                },            
                {
                    where :{
                        id_codeprod : id
                    }
                }).then((result)=>{
                    if(result){
                        res.status(200).json({msg: `data has been updated which its id is ${id}`})
                    }
                })
            })
        }
    })
})

/** delete section with params as condition (where)  */
router.get('/hapusdataCodeP/:id', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            return res.status(403).json({err: err});
        }else {                
            var id=req.params.id    
            sequelize.sync().then(()=>{
                codeproduct.destroy({                    
                    where: {id_codeprod : id}
                }).then((result)=>{
                    if(result){
                        res.status(200).json({ msg: `data code product has been deleted which its id is ${id}` })
                    }
                })
            })
        }
    })
   
})

module.exports = router;