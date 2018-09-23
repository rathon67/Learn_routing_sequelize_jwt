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
            var codeproductID =req.body.codeproductID;
            var categoryID = req.body.categoryID;
            
            sequelize.sync().then(()=>{
                model1.viewproductModel.create({
                    codeproduct_id : codeproductID,
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
                
                model1.codeproductModel.findAll({
                    include:[
                        {
                            model:model1.categoryModel
                        }
                        
                    ]
                }).then(function(result) {                    
                    res.status(200).json(result); 
                }) 
            })         
        }
    })   
})

// select username,message,fromUserId,toUserID 
// from messages 
// inner join messageToUsers on messages.id = messageToUsers.messageID 
// left outer join users on messages.fromUserID = users.id


    // Message.hasMany(MessageToUser,{foreignKey:'messageID',as: 'model1'});
    // Message.belongsTo(Users,{foreignKey:'fromUserId'});
    // Message.findAll({
    //     include :[
    //         {attributes: ["toUserId"],model:MessageToUser,as: 'model1'} ,
    //         {attributes: ["username"],model:Users}
    //     ]

    // }).then(function(messages) {
    //     console.log(JSON.stringify(messages));
    //     res.status(200).json(messages);
    // });
    
    
    

module.exports = router;