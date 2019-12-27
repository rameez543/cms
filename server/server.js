const express = require('express');
const path = require('path');
const models = require('./models');
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const port = process.env.PORT || 2001;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

app.get('/brands', async (req, res) => {
    try {
        const result = await models.Brands.findAll({ attributes: ['id', 'brandName'] })
        return res.json({ data: result })
    }
    catch (ex) {
        console.log(ex)
        return res.json({ error: ex })
    }
})
app.get('/products', async (req, res) => {
    try {
        console.log('req.quer', req.query)
        const { categoryID, brandID } = req.query
        if ((categoryID && categoryID !== '-1') || brandID && brandID !== '-1') {
            if (brandID === '-1' && categoryID !== '-1') {
                const parentCategory = await models.Category.findAll({
                    attributes: ['id'],
                    where: { parentCategory: categoryID }
                })
                const parentCategoryID = parentCategory && parentCategory.map(item=>item.id)
                console.log('pare', parentCategoryID)
                const result = await models.Product.findAll({
                    attributes: ['id', 'productName', 'categoryID', 'brandID', 'specification'],
                    where: { categoryID: { [Op.or]: [categoryID, parentCategoryID] },  },


                })
                return res.json({ data: result })
            }
            if (brandID !== '-1' && categoryID === '-1') {
                const result = await models.Product.findAll({
                    attributes: ['id', 'productName', 'categoryID', 'brandID', 'specification'],
                    where: { brandID }
                })
                return res.json({ data: result })
            }

            const parentCategory = await models.Category.findAll({
                attributes: ['id'],
                where: { parentCategory: categoryID }
            })
            const parentCategoryID = parentCategory && parentCategory.map(item=>item.id)
            const result = await models.Product.findAll({
                attributes: ['id', 'productName', 'categoryID', 'brandID', 'specification'],
                where: { categoryID: { [Op.or]: [categoryID, parentCategoryID] },brandID },
            })
            return res.json({ data: result })
        }
        const result = await models.Product.findAll({ attributes: ['id', 'productName', 'categoryID', 'brandID', 'specification'] })
        return res.json({ data: result })
    }
    catch (ex) {
        console.log(ex)
        return res.json({ error: ex })
    }
})
app.get('/categories', async (req, res) => {
    try {
        const result = await models.Category.findAll({ attributes: ['id', 'categoryName', 'parentCategory'] })
        return res.json({ data: result })
    }
    catch (ex) {
        console.log(ex)
        return res.json({ error: ex })
    }
})

app.post('/add-categories', async (req, res) => {
    try {
        const name = req.body.categoryName
        const parentCategoryID = req.body.parentCategoryID
        const result = await models.Category.create({ categoryName: name, parentCategory: parentCategoryID })
        return res.json({ success: true, data: result })
    }
    catch (ex) {
        console.log(ex)
        if (ex.parent && ex.parent.code) {
            errors = {
                23502: "value cannot be null",
                23505: "value must be unique"
            }
            return res.json({ success: false, error: errors[ex.parent.code] })
        }
        return res.json({ success: false, err: ex })
    }
})

app.post('/add-brands', async (req, res) => {
    try {
        const name = req.body.brandName
        const result = await models.Brands.create({ brandName: name })
        return res.json({ success: true, data: result })
    }
    catch (ex) {
        console.log(ex)
        if (ex.parent && ex.parent.code) {
            errors = {
                23502: "value cannot be null",
                23505: "value must be unique"
            }
            return res.json({ success: false, error: errors[ex.parent.code] })
        }
        return res.json({ success: false, err: ex })
    }
})

app.post('/add-products', async (req, res) => {
    try {
        const name = req.body.productName
        const categoryID = req.body.categoryID
        const specification = req.body.specification
        const brandID = req.body.brandID
        const result = await models.Product.create({ productName: name, categoryID, specification, brandID })
        console.log('resss', result)
        return res.json({ success: true, data: result })
    }
    catch (ex) {
        console.log(ex)
        if (ex.parent && ex.parent.code) {
            errors = {
                23502: "value cannot be null",
                23505: "value must be unique"
            }
            return res.json({ success: false, error: errors[ex.parent.code] })
        }
        return res.json({ success: false, err: ex })
    }
})



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});
app.listen(port, () => console.log(`server started in PORT ${port}`))