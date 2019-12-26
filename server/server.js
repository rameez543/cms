const express = require('express');
const path = require('path');
const models = require('./models');
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const port = process.env.PORT || 2001 ;
app.listen(port, () => console.log(`server started in PORT ${port}`))
app.get('/brands',async(req,res)=>{
    try{
        const result = await models.Brands.findAll({attributes:['id','brandName']})
        console.log('resss',result)
        return res.json({data:result})
    }
   catch(ex){
       console.log(ex)
       return res.json({error:ex})
   }
})
app.get('/products',async(req,res)=>{
    try{
        const result = await models.Product.findAll({attributes:['id','productName','categoryID','brandID']})
        console.log('resss',result)
        return res.json({data:result})
    }
   catch(ex){
       console.log(ex)
       return res.json({error:ex})
   }
})
app.get('/categories',async(req,res)=>{
    try{
        const result = await models.Category.findAll({attributes:['id','categoryName','parentCategory']})
        console.log('resss',result)
        return res.json({data:result})
    }
   catch(ex){
       console.log(ex)
       return res.json({error:ex})
   }
})