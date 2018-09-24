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



//section View Data Join from tbl_product_category
    /** SELECT tbl_product_category.id_procat, tbl_codeproduct.code_product AS kode_product, tbl_product.name 
     * AS Nama_product, master_category.name AS category
    FROM tbl_product_category
    INNER JOIN tbl_codeproduct ON tbl_product_category.codeproduct_id = tbl_codeproduct.id_codeprod
    INNER JOIN master_category ON tbl_product_category.category_id = master_category.id_category
    LEFT OUTER JOIN tbl_product ON tbl_codeproduct.product_id = tbl_product.id_product */

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
                }).then((result)=>{                    
                    res.status(200).json(result); 
                }) 
            })         
        }
    })   
})

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

/** update data with params as condition (where) */
router.post('/editdata/procat/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if (err){
            throw err;        
        }else{                
            var updateProduct = req.body.productID
            var updateCategory = req.body.categoryID
            var id =req.params.id
            sequelize.sync().then(()=>{
                model1.viewproductModel.update({
                    product_id : updateProduct,
                    category_id:updateCategory                    
                },                
                {
                    where: {
                        id_procat: id
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
router.get('/hapusdata/procat/:id', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            return res.status(403).json({err: err});
        }else {                
            var id=req.params.id    
            sequelize.sync().then(()=>{
                model1.viewproductModel.destroy({                    
                    where: {id_procat : id}
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